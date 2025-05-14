const { where, Op } = require("sequelize");
const Quote = require("../models/quote");
const User = require("../models/user");
const Followers = require("../models/followers");

async function getQuotes(req, res) {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized! Please log in." });
    }
    const user = await User.findOne({ where: { id: req.user.userId } });

    const quotes = await Quote.findAll({ order: [["createdAt", "DESC"]] });
    const users = await User.findAll();
    const suggestedUsers = users.filter(
      (suggestedUser) => suggestedUser.id !== user.id
    );
    const followings = await Followers.findAll({
      where: { followerId: req.user.userId },
    });

    const followers = await Followers.findAll({
      where: { followingId: req.user.userId },
    });

    return res.render("src/pages/quotes", {
      pageTitle: "📜Quotes",
      activePage: "home",
      quotes: quotes,
      user: user,
      users,
      suggestedUsers,
      followers,
      followings,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ |Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

function getAddQuote(req, res) {
  res.render("src/pages/addQuote", { pageTitle: "📜 Add New Quote" });
}

async function postNewQuote(req, res) {
  try {
    const userId = req.user.userId;
    const { quote, author, imageUrl, category } = req.body;

    const newQuote = await Quote.create({
      quote,
      author,
      imageUrl,
      category,
      userId,
    })
      .then((result) =>
        console.log("New quote has been added!\n quote:", result["dataValues"])
      )
      .catch((error) => console.log(error));

    return res.redirect("/home");
  } catch (error) {
    console.log("Error:", error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ |Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

async function deleteQuote(req, res) {
  try {
    const userId = req.user.userId;
    const quoteId = req.params.id;

    const quote = await Quote.findOne({ where: { id: quoteId } });

    if (!quote) {
      return res.status(404).json({ message: "Quote not found!" });
    }

    if (quote.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized! You cannot delete this quote." });
    }

    await quote.destroy();

    res.status(200).json({ message: "Quote deleted successfully!" });
  } catch (error) {
    console.log("Error:", error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ |Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

async function editQuote(req, res) {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized! Please log in." });
    }
    const userId = req.user.userId;
    const quoteId = req.params.id;
    const quote = await Quote.findOne({ where: { id: quoteId } });

    if (!quote) {
      return res.status(404).send({ message: "Quote not found!" });
    }

    if (quote.userId !== userId) {
      return res
        .status(403)
        .send({ message: "Unauthorized! You cannot edit this quote." });
    }

    await quote.update(req.body);

    return res.status(200).json({ message: "Quote updated successfully!" });
  } catch (error) {
    console.error("Error updating quote:", error);
    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

async function getQuote(req, res) {
  try {
    const userId = req.user.userId;
    const quoteId = req.params.id;
    const quote = await Quote.findOne({ where: { id: quoteId } });

    if (!quote) {
      return res.status(404).send({ message: "Quote not found!" });
    }

    if (quote.userId !== userId) {
      return res
        .status(403)
        .send({ message: "Unauthorized! You cannot edit this quote." });
    }

    return res.status(200).json(quote);
  } catch (error) {
    console.log("Error:", error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ |Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

module.exports = {
  getQuotes,
  getAddQuote,
  postNewQuote,
  deleteQuote,
  editQuote,
  getQuote,
};
