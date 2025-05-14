const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Quote = sequelize.define("quotes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      // ✅ Fixed "reference" typo
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  quote: Sequelize.TEXT,
  author: Sequelize.STRING,
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Quote;
