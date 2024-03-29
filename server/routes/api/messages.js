const router = require("express").Router();
const { Op } = require("sequelize");
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, read } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId, read });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      read,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/read", async (req, res, next) => {
  try {
    if (!req.user || req.user.dataValues.id !== req.body.userId) {
      return res.sendStatus(401);
    }
    const { messagesToMarkRead, convoId } = req.body;

    const messages = await Message.update({ read: true }, {
      where: {
        id: {
          [Op.in]: messagesToMarkRead
        },
        conversationId: {
          [Op.eq]: Number(convoId)
        }
      }
    });
    res.json(messages)
  } catch (error) {
    next(error);
  }
})

module.exports = router;
