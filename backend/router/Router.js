const express = require("express");
const Router = express.Router();

const Datas = require("../Schema");
Router.get("/", async (req, res) => {
  try {
    const data = await Datas.find();
    res.json(data);
    console.log("good");
  } catch (error) {
    res.status(500).send(JSON.stringify(error));
  }
});
Router.get("/:id", async (req, res) => {
  try {
    const data = await Datas.findById(req.params.id);
    res.status(201).json(data);
    console.log("good");
  } catch (error) {
    res.status(500).send(JSON.stringify(error));
  }
});

Router.post("/", async (req, res) => {
  const data = new Datas({
    name: req.body.name,
    email: req.body.email,
  });
  try {
    const a1 = await data.save();
    res.status(200).json(a1);
  } catch (error) {
    res.status(500).send(JSON.stringify(error));
  }
});

Router.delete("/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const data = await Datas.findByIdAndDelete(req.params.id);
    res.status(201).json(data);
    console.log("goods");
  } catch (error) {
    res.status(500).send(JSON.stringify(error));
  }
});

Router.patch("/:id", async (req, res) => {
  try {
    const data = await Datas.findById(req.params.id);
    data.name = req.body.name;
    data.email = req.body.email;
    const a1 = await data.save();

    res.status(201).json(a1);
    console.log("good");
  } catch (error) {
    res.status(500).send(JSON.stringify(error));
  }
});

module.exports = Router;
