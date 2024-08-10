// import { getChatMessagesBySessionId } from './chat/chat_message';

// function format_chat_md(chat) {
//   return `<sup><kbd><var>${chat.dateTime}</var></kbd></sup>:\n ${chat.text}`;
// }

// export const fetchMarkdown = async id => {
//   try {
//     const chatData = await getChatMessagesBySessionId(id);
//     /*
//           uuid: string,
//           dateTime: string
//           text: string
//           inversion?: boolean
//           error?: boolean
//           loading?: boolean
//           isPrompt?: boolean
//           */
//     const markdown = chatData
//       .map(chat => {
//         if (chat.isPrompt) return `**system** ${format_chat_md(chat)}}`;
//         else if (chat.inversion) return `**user** ${format_chat_md(chat)}`;
//         else return `**assistant** ${format_chat_md(chat)}`;
//       })
//       .join('\n\n----\n\n');
//     return markdown;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
// export const fetchConversationSnapshot = async uuid => {
//   try {
//     const chatData = await getChatMessagesBySessionId(uuid);
//           uuid: string,
//           dateTime: string
//           text: string
//           inversion?: boolean
//           error?: boolean
//           loading?: boolean
//           isPrompt?: boolean
//     return chatData;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
