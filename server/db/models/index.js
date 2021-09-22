const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.hasMany(Conversation);
// for the Database Redesign PR: add the following two lines
// Conversation.belongsToMany(User, { through: 'UsersConversations' })
// User.belongsToMany(Conversation, { through: 'UsersConversations' })
// for the Database Redesign PR: remove the following two lines
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
