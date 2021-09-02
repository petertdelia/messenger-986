import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const allReadMessages = messages.filter(message => message.senderId === userId && message.read);
  let lastReadId = allReadMessages.length > 0 ? allReadMessages[allReadMessages.length - 1].id : null;

  if (allReadMessages.length > 0) {
    lastReadId = allReadMessages[allReadMessages.length - 1].id;
  }

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} messageId={message.id} text={message.text} time={time} lastReadId={lastReadId} otherUser={otherUser}/>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} read={message.read} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
