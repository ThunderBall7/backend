import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoScehma = new Schema({

  videoFile: {
    type: String, //cloudinary file link
    required: true,
  },
  thunbnail: {
    type: String, //cloudinary file link
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, //cloudinary duration
    required: true,
  },
  Views:{
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }


},{timestamps: true});



videoScehma.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video', videoScehma)