const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || "daily-quotes",
  process.env.MYSQLUSER || "root",
  process.env.MYSQL_ROOT_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQLHOST || "localhost",
    port: process.env.MYSQLPORT || 3306,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5, // Maximum number of connections in pool
      min: 0, // Minimum number of connections in pool
      acquire: 30000, // Maximum time (ms) to wait for a connection
      idle: 10000, // Maximum time (ms) before an unused connection is released
    },
  }
);

module.exports = sequelize;
