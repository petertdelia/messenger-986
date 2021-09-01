import React from "react";
import { Box } from "@material-ui/core";
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
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, user, markMessagesAsRead } = props;
  const { otherUser } = conversation;

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
