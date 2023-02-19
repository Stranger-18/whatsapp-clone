//importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import dbMessages from "./dbMessages.js";
import cors from "cors";

//app config
const app = express();
const port = process.env.PORT || 4000;

const pusher = new Pusher({
  appId: "1556663",
  key: "0eb5804495cf169f5b5f",
  secret: "5d9db74d4b7a8307a724",
  cluster: "eu",
  useTLS: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

//middleware
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

//DB config
mongoose.set(`strictQuery`, true);
const connection_url =
  "mongodb+srv://admin:1234567890@cluster0.wdd1fgz.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url);

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
  dbMessages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  dbMessages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//listener
app.listen(port, () => console.log("listening on localhost: " + port));
