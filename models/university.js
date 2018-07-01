import mongoose from "mongoose";
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
  },
  programs : [
    {
      programName : {
        type : String,
        required : true
      },
      departmentName : {
        type : String,
        required : true
      },
      degree : {
        type : String,
        required : true
      },
      duration : {
        type : String,
        required : true
      },
      entryRequirement : {
        type : String
      },
      totalFee : {
        type : String,
      },
      programType : {
        type : String,
        required : true
      },
      creditHours : {
        type : String,
        required : true
      },
      entryTestDate : {
        type : Date
      },
      applicationDate : {
        type : Date
      },
      documentSubmissionDate : {
        type : Date
      },
      admissionDecisionDate : {
        type : Date
      },
      financialAid : {
        type : Boolean
      }
    }
  ]
});

const University = mongoose.model('University' , universitySchema);
export default University;