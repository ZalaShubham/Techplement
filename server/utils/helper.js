const User = require("../models/user");

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) console.log("User not found! User:" + user);

    return user;
  } catch (error) {
    console.log("Error:" + error);
  }
};

module.exports = { getUserByEmail };
