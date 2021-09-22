const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  read: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
  // for the Database Redesign PR: update the read status
  /*
  readBy: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  }
  */
});

module.exports = Message;
