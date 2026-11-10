const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

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

let allchats = [
  {
    from: "Jaky",
    to: "Sussy",
    msg: "tern ariund look what you see",
    created_at: new Date(),
  },
  {
    from: "Luky",
    to: "el",
    msg: "controle minde",
    created_at: new Date(),
  },
  {
    from: "nansy",
    to: "one",
    msg: " around look what you see",
    created_at: new Date(),
  },
  {
    from: "balis",
    to: "bob",
    msg: " look what you see",
    created_at: new Date(),
  },
  {
    from: "police",
    to: "army",
    msg: "India is my contry ",
    created_at: new Date(),
  },
];

Chat.insertMany(allchats)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
