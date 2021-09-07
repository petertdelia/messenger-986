import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setOtherUserActiveChat,
  updateConversation,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("set-other-user-active-chat", (otherUser) => {
    store.dispatch(setOtherUserActiveChat(otherUser))
  });

  socket.on("update-read-messages", (messageInfo) => {
    console.log("messageInfo", messageInfo)
    store.dispatch(updateConversation({
      convoId: messageInfo.convoId,
      messagesToMarkRead: messageInfo.messagesToMarkRead,
      userId: store.getState().user.id,
    }));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage({
      message: data.message,
      sender: data.sender, 
      userId: store.getState().user.id
    }));
  });
});

export default socket;
