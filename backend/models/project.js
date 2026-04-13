import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
    
    },

    description: {
      type: String,
    
    },

    video: {
      type: String,
      
    },

    //  CASE STUDY
    problem: {
      type: String,
    },

    learnings: {
      type: String,
    },

    features: {
      type: [String], // array of features
      default: [],
    },

    //  IMPACT 
    impact: {
      type: String,
    },

    metrics: {
      type: [String], // measurable results
      default: [],
    },

    //  TECH + ROLE
    tech: {
      type: [String],
      default: [],
    },

    role: {
      type: String,
      default: "Full Stack Developer",
    },

    //  LINKS
    demo: {
      type: String,
    },

    github: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default mongoose.model("Project", projectSchema);