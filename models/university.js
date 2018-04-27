import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const universitySchema = new Schema({
  universityName : {
    type: String,
    required: true
  },
  address : {
    type : String,
    required : true
  },
  city : {
    type : String,
    required : true
  },
  country : {
    type : String,
    required : true
  },
  contact : {
    type : String,
    required :true
  }
});

const University = mongoose.model('University' , universitySchema);
export default University;