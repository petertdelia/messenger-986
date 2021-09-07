function setLastReadId(messages, userId) {
  const allReadMessages = messages.filter(message => message.senderId === userId && message.read);

  return allReadMessages.length > 0 ? allReadMessages[allReadMessages.length - 1].id : null;
}

function setNumberOfUnreadMessages(messages, otherUserId) {
  return messages.filter(message => !message.read && message.senderId === otherUserId).length;
}

export const addConversationsToStore = (conversations) => {
  return conversations.map(convo => {
    const convoCopy = { ...convo };
    const { otherUser } = convoCopy;
    convoCopy.numberOfUnreadMessages = setNumberOfUnreadMessages(convoCopy.messages, otherUser.id)
    return convoCopy;
  })
}

export const addMessageToStore = (state, payload) => {
  const { message, sender, userId } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.numberOfUnreadMessages = setNumberOfUnreadMessages(newConvo.messages, newConvo.otherUser.id)
    newConvo.lastReadId = setLastReadId(newConvo.messages, userId)
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.numberOfUnreadMessages = setNumberOfUnreadMessages(convoCopy.messages, convoCopy.otherUser.id)
      convoCopy.lastReadId = setLastReadId(convoCopy.messages, userId);
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      convoCopy.otherUser.activeChat = "";
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOtherUserActiveChatToStore = (state, otherUser) => {
  return state.map(convo => {
    if (otherUser.id === convo.otherUser.id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.activeChat = otherUser.activeChat;
      return convoCopy;
    } else {
      return convo;
    }
  })
}

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = {...convo};
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      newConvo.lastReadId = setLastReadId(newConvo.messages, newConvo.otherUser.id);
      newConvo.numberOfUnreadMessages = setNumberOfUnreadMessages(newConvo.messages, newConvo.otherUser.id)
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const updateConversationInStore = (state, messageInfo) => {
  return state.map(convo => {
    if (convo.id === messageInfo.convoId) {
      const convoCopy = { ...convo };
      convoCopy.messages = convoCopy.messages.map(message => {
        if (messageInfo.messagesToMarkRead.includes(message.id)) {
          message.read = true;
          return message;
        } else {
          return message;
        }
      });
      convoCopy.lastReadId = setLastReadId(convoCopy.messages, messageInfo.userId);
      convoCopy.numberOfUnreadMessages = setNumberOfUnreadMessages(convoCopy.messages, convoCopy.otherUser.id)
      
      return convoCopy;
    } else {
      return convo;
    }
  });
}

export const setLastReadIdInStore = (state, payload) => {
  return state.map(convo => {
    if (convo.id === payload.convoId) {
      const convoCopy = { ...convo };

      convoCopy.lastReadId = setLastReadId(convoCopy.messages, payload.userId);
      return convoCopy;
    } else {
      return convo;
    }
  })
}