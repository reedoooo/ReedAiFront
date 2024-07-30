import { deleteChatMessage, updateChatMessage } from './chat/chat_message';
import { deleteChatPrompt, updateChatPrompt } from './chat/chat_prompt';

export const deleteChatData = async chat => {
  if (chat?.isPrompt) await deleteChatPrompt(chat.uuid);
  else await deleteChatMessage(chat.uuid);
};
export const updateChatData = async chat => {
  if (chat?.isPrompt) await updateChatPrompt(chat);
  else await updateChatMessage(chat);
};
