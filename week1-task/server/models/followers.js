const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Followers = sequelize.define("followers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  followerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  followingId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

User.belongsToMany(User, {
  as: "Followers",
  through: Followers,
  foreignKey: "followingId",
  otherKey: "followerId",
});

User.belongsToMany(User, {
  as: "Following",
  through: Followers,
  foreignKey: "followerId",
  otherKey: "followingId",
});

module.exports = Followers;
