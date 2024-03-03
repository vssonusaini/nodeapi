import mongoose from "mongoose";

const deviesSchema = new mongoose.Schema({
  deviceID: {
    type: String,
  },
  deviceName: {
    type: String,
    unique: true,
  },
  relays: [],
});

const DeviesSchema = new mongoose.model("Devies", deviesSchema);

export default DeviesSchema;
