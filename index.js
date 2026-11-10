const { setEngine } = require("crypto");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then((res) => {
    console.log("connect to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  res.render("index.ejs", { chats });
});

//searchind chats
app.get("/chats/search", async (req, res) => {
  let { q } = req.query;
  let chats = await Chat.find({
    $or: [
      { from: { $regex: q, $options: "i" } },
      { to: { $regex: q, $options: "i" } },
      { msg: { $regex: q, $options: "i" } },
    ],
  });

  res.render("index.ejs", { chats, q });
});

//New chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//create Route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

//EDIT route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);

  res.render("edit.ejs", { chat });
});

//Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updateChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, returnDocument: "after" },
  );
  console.log(updateChat);
  res.redirect("/chats");
});

//Delete Route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deleteChat = await Chat.findByIdAndDelete(id);
  console.log(deleteChat);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("work");
});

app.listen(8080, () => {
  console.log("http://localhost:8080/chats");
});
