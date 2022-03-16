import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trailSchema = new Schema({
  trailname: String,
  terraindescription: String,
  startpoint: String,
  longitude: Number,
  latitude: Number,
  distancekm: Number,
  traillistid: {
    type: Schema.Types.ObjectId,
    ref: "Traillist",
  },
});

export const Trail = Mongoose.model("Trail", trailSchema);