const { Router } = require("express");
const config = require("config");
const shortId = require("shortid");
const Link = require("../models/Link");
const authMiddleware = require("../middleware/auth.middleware");

const linkRouter = Router();

// /api/link - root
linkRouter.post("/generate", authMiddleware, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortId.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });
    
    await link.save()

    res.status(201).json({link})

  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});
linkRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});
linkRouter.get("/:id", authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = linkRouter;
