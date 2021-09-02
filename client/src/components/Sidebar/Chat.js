import React from "react";
import { Box, Chip } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { sendActiveChat, markMessagesAsRead } from '../../store/utils/thunkCreators';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  },
  chip: {
    background: "#3A8DFF",
    marginRight: 17,
    color: "white",
    fontWeight: "bold", 
    fontSize: "14"
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, user, markMessagesAsRead } = props;
  const { otherUser, messages } = conversation;
  const numberOfUnreadMessages = messages.filter(message => {
    return !message.read && message.senderId === otherUser.id;
  }).length;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    const messagesToMarkRead = conversation.messages
      .filter(message => !message.read && message.senderId === conversation.otherUser.id)
      .map(message => message.id);
    if (messagesToMarkRead.length > 0) {
      await markMessagesAsRead({
        messagesToMarkRead,
        convoId: conversation.id
      });
    }
    
    sendActiveChat({
      id: user.id,
      activeChat: conversation.otherUser.username
    });
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {numberOfUnreadMessages > 0 && <Chip label={numberOfUnreadMessages} className={classes.chip}/>}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    markMessagesAsRead: (messageInfo) => {
      dispatch(markMessagesAsRead(messageInfo));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
