const Quote = require("../models/quote");
const User = require("../models/user");
const Followers = require("../models/followers");
const { getUserByEmail } = require("../utils/helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
require("dotenv").config();

async function signUpNewUser(req, res) {
  try {
    // Ensure that getUserByEmail is asynchronous and awaits the result
    const existUser = await getUserByEmail(req.body.email);

    // If the user already exists, send the response immediately
    if (existUser) {
      return res.render("src/pages/error", {
        pageTitle: "⁉ | Error - Something Went Wrong",
        message: "This user already signed up!",
      });
    }

    // If the user doesn't exist, proceed to create a new user

    //Hashing password using bcrypt.js
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    req.body.userName = req.body.email.split("@")[0];
    // Create the new user
    const newUser = await User.create(req.body);

    // Redirect after successfully signing up
    return res.redirect("/sign-in");
  } catch (error) {
    console.log(error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ |Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

async function signInUser(req, res) {
  try {
    // Ensure that getUserByEmail is asynchronous and awaits the result
    const existUser = await getUserByEmail(req.body.email);

    // If the user already exists, send the response immediately
    if (!existUser) {
      return res.render("src/pages/error", {
        pageTitle: "⁉ | Error - Something Went Wrong",
        message: "This user does not signed up!",
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      existUser.password
    );

    if (!passwordMatch) {
      return res.render("src/pages/error", {
        pageTitle: "⁉ | Error - Something Went Wrong",
        message: "Password Incorrect!",
      });
    }

    const token = jwt.sign({ userId: existUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Set true in production (HTTPS)
      maxAge: 3600000, //1 hour
    });

    // const quotes = await Quote.findAll({ where: { userId: existUser.id } });
    // return res.render("src/pages/quotes", {
    //   pageTitle: "📜Quotes",
    //   activePage: "home",
    //   message: "User logged in successfully!",
    //   quotes: quotes,
    //   token: token,
    // });
    return res.redirect("/home");
  } catch (error) {
    console.log(error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ |Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/sign-in");
}

async function getUserProfile(req, res) {
  try {
    if (!req.user || !req.params.userName) return res.redirect("/sign-in");

    const user = await User.findOne({
      where: { userName: req.params.userName },
    });

    if (!user) {
      return res.render("src/pages/error", {
        pageTitle: "⁉ |Error - Something Went Wrong",
        message: "User not found!",
      });
    }

    const quotes = await Quote.findAll({
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
    });
    const users = await User.findAll();
    const suggestedUsers = users.filter(
      (suggestedUser) => suggestedUser.id !== req.user.userId
    );

    const followings = await Followers.findAll({
      where: { followerId: user.id },
    });

    const followers = await Followers.findAll({
      where: { followingId: user.id },
    });

    const currentUser = await User.findOne({ where: { id: req.user.userId } });

    return res.render(`src/pages/userProfile`, {
      pageTitle: "🙍‍♂️ | Profile",
      activePage: "profile",
      quotes: quotes,
      currentUser,
      user: user,
      suggestedUsers,
      followings,
      followers,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ |Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

async function postNewFollower(req, res) {
  try {
    if (!req.user.userId || !req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Missing followerId or followingId",
        data: null,
      });
    }
    const existingFollow = await Followers.findOne({
      where: { followerId: req.user.userId, followingId: req.params.id },
    });

    if (existingFollow) {
      await existingFollow.destroy();
      return res
        .status(200)
        .json({ success: true, message: "User successfully unfollowed!" });
    }

    await Followers.create({
      followerId: req.user.userId,
      followingId: req.params.id,
    });

    return res
      .status(201)
      .json({ success: true, message: "Followed successfully!" });
  } catch (error) {
    console.error("Follow error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getEditProfile(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized! Please log in." });
    }

    const currentUser = await User.findOne({ where: { id: req.user.userId } });

    if (!currentUser) {
      console.log("Error:", error);
      return res.render("src/pages/error", {
        pageTitle: "⁉ |Error - Something Went Wrong",
        message: "User not found!",
      });
    }
    const users = await User.findAll();
    const suggestedUsers = users.filter(
      (suggestedUser) => suggestedUser.id !== currentUser.id
    );

    const followings = await Followers.findAll({
      where: { followerId: currentUser.id },
    });

    const followers = await Followers.findAll({
      where: { followingId: currentUser.id },
    });

    return res.render(`src/pages/editProfile`, {
      pageTitle: "🙍‍♂️ | Edit Profile",
      activePage: "profile/edit/",
      currentUser,
      user: currentUser,
      suggestedUsers,
      followings,
      followers,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ |Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

async function postEditProfile(req, res) {
  try {
    if (!req.user.userId || !req.params.userName) {
      return res.status(401).json({ message: "Unauthorized! Please log in." });
    }

    const currentUser = await User.findOne({ where: { id: req.user.userId } });
    console.log(req.body);
    if (req.body.password === "") {
      await currentUser.update({
        imageUrl: req.body.imageUrl,
        link: req.body.link,
        userName: req.body.userName,
        fullName: req.body.fullName,
        bio: req.body.bio,
        email: req.body.email,
        password: currentUser.password,
      });
      return res.status(200).redirect(`/${currentUser.userName}`);
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      currentUser.password
    );
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password is incorrect!" });
    }

    const newHashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    await currentUser.update({
      imageUrl: req.body.imageUrl,
      link: req.body.link,
      userName: req.body.userName,
      fullName: req.body.fullName,
      bio: req.body.bio,
      email: req.body.email,
      password: newHashedPassword,
    });
    return res.status(200).redirect(`/${currentUser.userName}`);
  } catch (error) {
    console.log("Error:", error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ |Error - Something Went Wrong",
      message:
        "An unexpected error occurred. Please try again later. Error" + error,
    });
  }
}

module.exports = {
  signUpNewUser,
  signInUser,
  logout,
  getUserProfile,
  postNewFollower,
  getEditProfile,
  postEditProfile,
};
