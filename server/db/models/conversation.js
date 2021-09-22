const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// for the Database Redesign PR: modify the 'findConversation' function
  /*
  this function should be defined on the UsersConversations join table - it takes a list of userIds, and runs a SQL query like the following: 
    SELECT conversationId 
      FROM UsersConversations 
      WHERE userId IN (userIdList) 
      GROUP BY conversationId 
        HAVING count(conversationId) = userIdList.length


  Here's a stab at the Sequelize function:

  UsersConversations.findConversation = async function (userIdArr) {
    const conversation = await UsersConversations.findOne({
      attributes: 'conversationId',
      where: {
        userId: {
          [Op.in]: userIdArr
        }
      },
      group: ['conversationId'],
      having: sequelize.where(sequelize.fn('COUNT', sequelize.col('conversationId')), {
        $eq: userIdArr.length
      })
    })
  }
  */

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
