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
    store.dispatch(updateConversation(messageInfo));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
});

export default socket;
