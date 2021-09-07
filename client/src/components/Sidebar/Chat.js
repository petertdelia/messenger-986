import React from "react";
import { Box, Chip } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { sendActiveChat, markMessagesAsRead } from '../../store/utils/thunkCreators';
import { setLastReadId } from "../../store/conversations";

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
      background: theme.palette.primary.main,
      color: theme.palette.color,
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      marginRight: theme.spacing(17)
    }
  }));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, user, markMessagesAsRead } = props;
  const { otherUser, numberOfUnreadMessages } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    const messagesToMarkRead = conversation.messages
      .filter(message => !message.read && message.senderId === conversation.otherUser.id)
      .map(message => message.id);
    if (messagesToMarkRead.length > 0) {
      await markMessagesAsRead({
        messagesToMarkRead,
        convoId: conversation.id,
        userId: user.id,
      });
    } else {
      props.setLastReadId({
        convoId: conversation.id, 
        userId: user.id
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
      {numberOfUnreadMessages > 0 && <Chip size="small" label={numberOfUnreadMessages} className={classes.chip}/>}
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
    },
    setLastReadId: (params) => {
      dispatch(setLastReadId(params));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
