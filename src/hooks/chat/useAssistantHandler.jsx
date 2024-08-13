/* eslint-disable no-constant-condition */
import { AssistantStream } from 'openai/lib/AssistantStream';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { chatAssistants as assistantsApi } from 'api/chat';
import { useChatStore, useUserStore } from 'contexts';
import { useChatScroll } from 'hooks';
import 'styles/ChatStyles.css';

export const useAssistantHandler = (functionCallHandler = () => '') => {
  const params = useParams(); // Extract the dynamic 'id' parameter from the URL
  const {
    state: { userInput, chatMessages },
    actions: { setUserInput },
  } = useChatStore();
  const {
    actions: { setIsRedirectToSignin },
    state: { userId },
  } = useUserStore();
  const {
    handleScroll,
    scrollToBottom,
    setIsAtBottom,
    isAtTop,
    isAtBottom,
    isOverflowing,
    scrollToTop,
  } = useChatScroll();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState('thread_o8UQeG5NjmiS6kWEcnU2LdkO');

  const [messages, setMessages] = useState(() => {
    const savedMessages = chatMessages ? chatMessages : [];
    return savedMessages;
  });
  const handleSendAssistantMessage = async () => {
    if (!userId) {
      setError('Please login to continue');
      setIsRedirectToSignin(true);
      return;
    }
    if (!userInput.trim()) {
      setError('Please enter your message.');
      return;
    }
    setError('');
    setLoading(true);
    const prompt = `You: ${userInput}\nAssistant: `;
    // 'Create a sidebar navigation panel that can be toggled on and off. The sidebar should include icons for different sections of the app, such as Home, Chat History, Settings, and Help. Each icon should have a label below it and highlight when active. Use Material-UI components for the icons and layout';
    const threadId = 'thread_o8UQeG5NjmiS6kWEcnU2LdkO';
    const response = await assistantsApi.getByThread(threadId, prompt);
    setMessages(prevMessages => [
      ...prevMessages,
      { role: 'user', text: userInput },
    ]);
    setUserInput('');
    setInputDisabled(true);
    scrollToBottom();
    const stream = AssistantStream.fromReadableStream(response.body);
    handleReadableStream(stream);
  };
  const submitActionResult = async (runId, toolCallOutputs) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/actions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          runId: runId,
          toolCallOutputs: toolCallOutputs,
        }),
      }
    );
    const stream = AssistantStream.fromReadableStream(response.body);
    handleReadableStream(stream);
  };
  /* Stream Event Handlers */
  // textCreated - create new assistant message
  const handleTextCreated = () => {
    appendMessage('assistant', '');
  };
  // textDelta - append text to last assistant message
  const handleTextDelta = delta => {
    if (delta.value != null) {
      appendToLastMessage(delta.value);
    }
    if (delta.annotations != null) {
      annotateLastMessage(delta.annotations);
    }
  };
  // imageFileDone - show image in chat
  const handleImageFileDone = image => {
    appendToLastMessage(`\n![${image.file_id}](/api/files/${image.file_id})\n`);
  };
  // toolCallCreated - log new tool call
  const toolCallCreated = toolCall => {
    if (toolCall.type != 'code_interpreter') return;
    appendMessage('code', '');
  };
  // toolCallDelta - log delta and snapshot for the tool call
  const toolCallDelta = (delta, snapshot) => {
    if (delta.type != 'code_interpreter') return;
    if (!delta.code_interpreter.input) return;
    appendToLastMessage(delta.code_interpreter.input);
  };
  // handleRequiresAction - handle function call
  const handleRequiresAction = async event => {
    const runId = event.data.id;
    const toolCalls = event.data.required_action.submit_tool_outputs.tool_calls;
    // loop over tool calls and call function handler
    const toolCallOutputs = await Promise.all(
      toolCalls.map(async toolCall => {
        const result = await functionCallHandler(toolCall);
        return { output: result, tool_call_id: toolCall.id };
      })
    );
    setInputDisabled(true);
    submitActionResult(runId, toolCallOutputs);
  };
  // handleRunCompleted - re-enable the input form
  const handleRunCompleted = () => {
    setInputDisabled(false);
  };
  const handleReadableStream = stream => {
    // messages
    stream.on('textCreated', handleTextCreated);
    stream.on('textDelta', handleTextDelta);

    // image
    stream.on('imageFileDone', handleImageFileDone);

    // code interpreter
    stream.on('toolCallCreated', toolCallCreated);
    stream.on('toolCallDelta', toolCallDelta);

    // events without helpers yet (e.g. requires_action and run.done)
    stream.on('event', event => {
      if (event.event === 'thread.run.requires_action')
        handleRequiresAction(event);
      if (event.event === 'thread.run.completed') handleRunCompleted();
    });
  };
  /*
    =======================
    === Utility Helpers ===
    =======================
  */
  const appendToLastMessage = text => {
    setMessages(prevMessages => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + text,
      };
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };
  const appendMessage = (role, text) => {
    setMessages(prevMessages => [...prevMessages, { role, text }]);
  };

  const annotateLastMessage = annotations => {
    setMessages(prevMessages => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
      };
      annotations.forEach(annotation => {
        if (annotation.type === 'file_path') {
          updatedLastMessage.text = updatedLastMessage.text.replaceAll(
            annotation.text,
            `/api/files/${annotation.file_path.file_id}`
          );
        }
      });
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };
  return {
    handleSendAssistantMessage,
    handleTextCreated,
    handleTextDelta,
    handleImageFileDone,
    handleRequiresAction,
    handleRunCompleted,
  };
};
