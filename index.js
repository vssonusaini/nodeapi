import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connetcDB from "./src/db/conn.js";
import DeviesSchema from "./src/models/deviesSchema.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

// add devies
app.post("/api/devies", async (req, res) => {
  try {
    const addDevies = new DeviesSchema(req.body);
    console.log(req.body);
    const savedata = await addDevies.save();
    res.status(201).send(savedata);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get devies list
app.get("/api/devies", async (req, res) => {
  try {
    const getDevies = await DeviesSchema.find({});
    res.send(getDevies);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get single devies
app.get("/api/devies/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getSingleDevies = await DeviesSchema.findById({ _id: _id });
    res.send(getSingleDevies);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get single delets
app.delete("/api/devies/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getSingleDevies = await DeviesSchema.findByIdAndDelete({ _id: _id });
    res.send(getSingleDevies);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update DeviesSchema single
app.patch("/api/devies/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getSingleDevies = await DeviesSchema.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    res.send(getSingleDevies);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/api/devies/:id/relay/:index", async (req, res) => {
  try {
    const _id = req.params.id;
    const index = req.params.index;

    const getSingleDevies = await DeviesSchema.findById(_id);
    const newArray = getSingleDevies.relays;

    const toggle = (a) => (a ? false : true);
    newArray[index - 1] = toggle(newArray[index - 1]);

    const newUpdate = await DeviesSchema.findByIdAndUpdate(
      _id,
      { relays: newArray },
      {
        new: true,
      }
    );
    res.send(newUpdate);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  connetcDB(process.env.MONGODB_URL);
});
