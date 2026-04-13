const normalize = (text) => text.toLowerCase().trim();
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const intents = {
  greeting: ["hello", "hi", "hey"],
  about: [
    "about yourself",
    "introduce yourself",
    "who are you",
    "about you",
    "your background",
    "your story",
    "Experience"
  ],
  profile: ["profile", "your profile", "quick intro", "summary"],
  skills: ["skills", "tech", "stack"],
  projects: ["project", "portfolio", "work"],
  contact: ["contact", "email", "reach you", "hire me"],
  services: ["service", "offer", "hire", "freelance", "work with you"],
  availability: ["available", "open to work", "job", "hire now"],
  experience: ["experience", "background", "worked"],
  resume: ["resume", "cv", "download resume"],
  learning: ["learning", "upgrading", "currently learning"]
};

const matchIntent = (msg, keywords) =>
  keywords.some((word) => msg.includes(word));

export const generateResponse = (input) => {
  const message = normalize(input);

  // Greeting
  if (matchIntent(message, intents.greeting)) {
    return {
      text: random([
        "Hey!  How can I help you today?",
        "Hello  You can ask about my work, skills, or hire me!",
      ]),
      action: null
    };
  }

  //  ABOUT → go to About page
  if (matchIntent(message, intents.about)) {
    return {
      text: "You can explore my full journey, experience, and goals on the About page ",
      action: "about"
    };
  }

 //Profile
  if (matchIntent(message, intents.profile)) {
    return {
      text: `I'm Vanashree, a frontend and fullstack developer specializing in Angular, JavaScript, and Node.js.
  
  I enjoy building clean, scalable, and user-friendly web applications `,
      action: null //  no navigation
    };
  }
  // 🧠 SKILLS
  if (matchIntent(message, intents.skills)) {
    return {
      text: `My core skills include:

• HTML, CSS, JavaScript  
• Angular, Node.js, Express  
• MongoDB (MEAN stack)  
• Responsive UI & component-based design`,
      action: "skills"
    };
  }

  //  WORK (Projects)
  if (matchIntent(message, intents.projects)) {
    return {
      text: "I’ve built real-world applications like a CRM system, admin dashboard, and responsive platforms. You can explore them in my Work section ",
      action: "projects"
    };
  }

  //  EXPERIENCE → About page
  if (matchIntent(message, intents.experience)) {
    return {
      text: "You can find details about my experience on my About page ",
      action: "about"
    };
  }

  //  SERVICES → open contact
  if (matchIntent(message, intents.services)) {
    return {
      text: "I'd love to work with you! Click 'Hire Me' or send me a message directly.",
      action: "contact"
    };
  }

  // AVAILABILITY
  if (matchIntent(message, intents.availability)) {
    return {
      text: `I’m currently open to:

• Full-time  
• Part-time  
• Freelance  
• Contract roles  

Available for remote work and can start immediately`,
      action: "contact"
    };
  }

  // LEARNING
  if (matchIntent(message, intents.learning)) {
    return {
      text: `I’m currently upgrading my skills in:

• React  
• Figma  
• WordPress  

Continuously learning to improve`,
      action: null
    };
  }

  // RESUME
  if (matchIntent(message, intents.resume)) {
    return {
      text: "You can download my resume here",
      action: "resume"
    };
  }

  // CONTACT (2 emails + modal)
  if (matchIntent(message, intents.contact)) {
    return {
      text: `You can reach me in two ways:

vanashree.ravishankar@gmail.com  
vanashree.shankar06@gmail.com  

Or through contact form, displayed on your left side`,
      action: "contact"
    };
  }

  // DEFAULT
  return {
    text: random([
      "I didn’t get that 🤔 Try asking about work, skills, or hire me!",
      "You can ask me about projects, experience, or availability",
    ]),
    action: null
  };
};