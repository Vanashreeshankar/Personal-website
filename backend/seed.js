import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Project from "./models/project.js";
import mongoose from "mongoose";

dotenv.config();

const data = [
  {
    "title": "CRM Web Application",
    "description": "Engineered a scalable full-stack CRM platform with role-based access control, enabling efficient management of clients, tickets, and real-time communication workflows.",
  
    "video": "https://files.catbox.moe/4uq6jv.mp4",
  
    "problem": "Designing a secure and scalable system to handle authentication, role-based permissions, and real-time updates across clients and tickets without performance bottlenecks.",
  
    "features": [
      "Implemented role-based authentication for users and administrators",
      "Designed secure password recovery using email and PIN verification",
      "Built dynamic dashboards for tracking tickets, clients, and statuses",
      "Developed end-to-end ticket lifecycle system (creation, messaging, closure)",
      "Created admin panel for managing clients, tickets, and responses",
      "Delivered fully responsive UI with complete CRUD functionality"
    ],
  
    "impact": "Optimized customer support workflows by centralizing ticket operations and improving communication efficiency between users and administrators.",
  
    "metrics": [
      "Enabled secure multi-role access management",
      "Streamlined ticket lifecycle from creation to resolution",
      "Maintained consistent and responsive UI across devices"
    ],
  
    "learnings": "Deepened expertise in authentication systems, role-based architecture, and full-stack data flow management.",
  
    "tech": ["Angular", "Node.js", "Express", "MongoDB"],
    "role": "Full Stack Developer",
  
    "github": "https://github.com/Vanashreeshankar/MEAN-CRM-Website",
    "demo": "https://crm-frontend-website.vercel.app/"
  },

  {
  "title": "Flip-Book Design",
  "description": "Designed and developed an interactive digital service catalog that combines editorial-style visual design, realistic page interactions, motion, and sound to create an immersive browsing experience.",
  
  "video": "https://files.catbox.moe/v5o1nu.mp4",
  
  "problem": "Creating a digital service interface that feels tactile and exploratory rather than static, while giving each creative discipline a distinct interaction that communicates its capabilities through direct user engagement.",

  "features": [
    "Built a realistic flip-book interface with interactive forward and reverse page dragging",
    "Added synchronized page-turn audio to reinforce the physical feel of flipping through pages",
    "Designed unique micro-interactions for each service instead of relying on a uniform page layout",
    "Web page uses interactive hover states to reveal and respond to interface elements",
    "Full Stack page uses an interactive layered architecture where hovering over each layer reveals the tools and frameworks used",
    "UI Design page uses a doodle interaction that progressively reveals the underlying content",
    "3D & Motion page begins with a cube that dynamically explodes into six faces, creating an interactive 3D composition",
    "Enabled users to rotate and explore the 3D object interactively",
    "Created distinct visual personalities for Web, Full Stack, UI Design, and 3D & Motion",
    "Combined typography, motion, depth, sound, 3D elements, and interaction into a cohesive service presentation"
  ],

  "impact": "Transformed a conventional service presentation into an exploratory interface where users discover capabilities through interaction rather than simply reading static information.",

  "metrics": [
    "Created four service experiences with distinct interaction patterns",
    "Implemented bidirectional page transitions with synchronized audio feedback",
    "Combined 2D interaction, motion, sound, and interactive 3D elements within a single experience"
  ],

  "learnings": "Deepened expertise in interaction design, micro-interactions, motion systems, page-transition behavior, interactive 3D, and designing digital experiences where user actions directly reveal information.",
  
  "tech": ["React", "TypeScript", "CSS", "Framer Motion", "React PageFlip", "Spline"],
  
  "role": "Frontend Developer & UI Designer",
  
  "github": "https://github.com/Vanashreeshankar/Flip-Book-Design",
  "demo": "https://vanashree-capabilities.vercel.app/"
},
  
  {
    "title": "Portfolio Website",
    "description": "Developed a full-stack portfolio platform with a robust contact system that captures, stores, and delivers user queries in real time via backend-driven email integration.",
  
    "video": "https://files.catbox.moe/t2ukom.mp4",
  
    "problem": "Building a reliable communication pipeline that securely stores user queries in a database while triggering real-time email notifications without data loss.",
  
    "features": [
      "Built a fully responsive portfolio showcasing projects and skills",
      "Integrated contact form with Node.js and Express backend",
      "Implemented secure storage of user queries in MongoDB",
      "Developed automated email notification system for incoming messages",
      "Added form validation and error handling for improved UX",
      "Designed clean and smooth UI using Angular"
    ],
  
    "impact": "Established a seamless communication system ensuring all user queries are reliably captured, stored, and instantly delivered.",
  
    "metrics": [
      "Achieved full frontend-backend-database integration",
      "Ensured reliable storage and retrieval of contact messages",
      "Enabled real-time email alerts for every submission"
    ],
  
    "learnings": "Strengthened full-stack integration skills, backend API design, database handling, and email service implementation using Node.js.",
  
    "tech": ["Angular", "Node.js", "Express", "MongoDB"],
    "role": "Full Stack Developer",
  
    "github": "https://github.com/Vanashreeshankar/Portfolio",
    "demo": "https://vanashree-portfolio-website.vercel.app/"
  },
  {
    "title": "Visual Node Pipeline Builder",
    "description": "Built an interactive node-based workflow builder using React and ReactFlow, enabling users to design, connect, and validate complex pipelines with real-time visual feedback.",
  
    "video": "https://files.catbox.moe/ptcndo.mp4",
  
    "problem": "Designing a scalable and reusable node-based architecture capable of handling dynamic inputs, visual connections, and real-time DAG validation without backend support.",
  
    "features": [
      "Developed drag-and-drop interface for creating workflow pipelines",
      "Designed reusable BaseNode abstraction for scalable architecture",
      "Implemented multiple node types (Input, Output, Text, LLM, Math, Boolean)",
      "Enabled dynamic input generation based on variables in Text Nodes",
      "Built real-time pipeline validation using DAG logic",
      "Created interactive UI with animated edges and color-coded nodes",
      "Managed global state efficiently using Zustand"
    ],
  
    "impact": "Enabled intuitive visual creation and validation of complex workflows, demonstrating advanced frontend architecture and graph-based logic implementation.",
  
    "metrics": [
      "Achieved scalable architecture using reusable node abstraction",
      "Supported multiple dynamic node types with flexible behavior",
      "Validated workflow structure using real-time DAG logic"
    ],
  
    "learnings": "Gained strong experience in component abstraction, state management, graph algorithms (DAG validation), and building interactive UI systems.",
  
    "tech": ["React", "ReactFlow", "Zustand", "JavaScript", "CSS"],
    "role": "Frontend Developer",
  
    "github": "https://github.com/Vanashreeshankar/visual-node-pipeline-builder"
  },
  {
    "title": "Static Portfolio",
    "description": "Designed and developed an initial personal portfolio website to present skills, education, and projects in a structured and accessible digital format.",
  
    "video": "https://files.catbox.moe/yda5cf.mp4",
  
    "problem": "Creating an online presence from scratch to showcase personal work in a more interactive and engaging format than traditional resumes.",
  
    "features": [
      "Structured layout for clear presentation of resume content",
      "Dedicated sections for skills, education, and projects",
      "Responsive design for cross-device compatibility",
      "Simple and intuitive navigation for better usability",
      "Deployed and hosted using Netlify"
    ],
  
    "impact": "Established an online professional identity and served as a foundation for advanced portfolio development.",
  
    "metrics": [
      "Successfully deployed first live web application",
      "Transformed static resume into interactive web experience",
      "Improved accessibility and presentation of personal profile"
    ],
  
    "learnings": "Built foundational skills in HTML, CSS, JavaScript, and deployment while learning effective content structuring.",
  
    "tech": ["HTML", "CSS", "JavaScript"],
    "role": "Frontend Developer",
  
    "demo": "https://vanashree-personal-resume.netlify.app/"
  }
  
  
];

const seedData = async () => {
  try {
    console.log("Connecting DB...");
    await connectDB();

    // Check which DB you're connected to


console.log("DB Name:", mongoose.connection.name);

    console.log("Clearing old data...");
    await Project.deleteMany();

    console.log("Inserting data...");
    const inserted = await Project.insertMany(data);

    console.log(`Inserted ${inserted.length} records `);

    //  Check if data actually exists
    const count = await Project.countDocuments();
    console.log("Total documents in DB:", count);

    //  List collections
    const collections = await Project.db.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed ", error);
    process.exit(1);
  }
};

seedData();

