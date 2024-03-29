import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  addOtherUserActiveChatToStore,
  updateConversationInStore,
  setLastReadIdInStore,
  addConversationsToStore,
} from "./utils/reducerFunctions";

// ACTIONS

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_CONVERSATION = "ADD_CONVERSATION";
const SET_OTHER_USER_ACTIVE_CHAT = "SET_OTHER_USER_ACTIVE_CHAT";
const UPDATE_CONVERSATION = "UPDATE_CONVERSATION";
const SET_LAST_READ_ID = "SET_LAST_READ_ID";


// ACTION CREATORS

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

export const setNewMessage = (params) => {
  const { message, sender, userId } = params;
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null, userId },
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

// set other user's active chat status
export const setOtherUserActiveChat = (otherUser) => {
  return {
    type: SET_OTHER_USER_ACTIVE_CHAT,
    otherUser,
  };
};

export const updateConversation = (messageInfo) => {
  return {
    type: UPDATE_CONVERSATION,
    messageInfo,
  };
};

export const setLastReadId = (payload) => {
  return {
    type: SET_LAST_READ_ID,
    payload
  }
}

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return addConversationsToStore(action.conversations);
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_OTHER_USER_ACTIVE_CHAT: {
      return addOtherUserActiveChatToStore(state, action.otherUser);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
      case UPDATE_CONVERSATION:
        return updateConversationInStore(
          state,
          action.messageInfo,
        );
      case SET_LAST_READ_ID:
        return setLastReadIdInStore(
          state,
          action.payload,
        );
    default:
      return state;
  }
};

export default reducer;
