export const defaultProfileData = {
  name: "Bekam Genene",
  title: "AI Engineer & Full Stack Developer",
  bio: "AI Engineer and Full Stack Developer specializing in machine learning and web development.",
  profileImage: "",
  cvUrl: "/cv/resume.pdf",
  cvFileName: "resume.pdf",
  aboutHeading: "About Me",
  aboutTitle: "Passionate Developer Creating Digital Excellence",
  aboutParagraphs: [
    "Hello! I am Bekam Genene, an AI Engineer and Full Stack Developer currently pursuing Computer Science and Engineering at Adama Science and Technology University, Ethiopia.",
    "I specialize in machine learning, AI development, and building modern web applications.",
    "When I am not coding, you will find me exploring new AI frameworks, contributing to open-source projects, or learning about the latest advancements in AI.",
  ],
  aboutStats: [
    { value: "2+", label: "Years Experience" },
    { value: "15+", label: "Projects Done" },
    { value: "1+", label: "Satisfied Clients" },
    { value: "18+", label: "Technologies" },
  ],
  aboutHighlights: [
    { title: "Clean Code", description: "Writing maintainable, scalable code" },
    {
      title: "UI/UX Focus",
      description: "Creating beautiful user experiences",
    },
    { title: "Problem Solver", description: "Turning ideas into solutions" },
    { title: "Fast Delivery", description: "Efficient project completion" },
  ],
  skillsHeading: "My Skills",
  skillsTitle: "Technologies I Work With",
  skillsList: [
    { id: 1, name: "Python", level: 92, category: "Programming Language" },
    {
      id: 2,
      name: "TensorFlow",
      level: 85,
      category: "AI & Machine Learning",
    },
    { id: 3, name: "React", level: 90, category: "Frontend" },
    {
      id: 4,
      name: "TypeScript",
      level: 85,
      category: "Programming Language",
    },
    { id: 5, name: "Node.js", level: 85, category: "Backend" },
    { id: 6, name: "PostgreSQL", level: 80, category: "Backend" },
    { id: 7, name: "Git/GitHub", level: 90, category: "Tools & Others" },
    { id: 8, name: "Docker", level: 75, category: "Tools & Others" },
  ],
  experienceHeading: "My Journey",
  experienceTitle: "Experience & Education",
  contactHeading: "Get in Touch",
  contactTitle: "Let's Work Together",
  contactDescription:
    "Have a project in mind or just want to chat? Feel free to reach out.",
  contactMapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63068.32899373372!2d39.22437065!3d8.5403079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1f4c4f4c9a0d%3A0x9bcf0dfc7d8a61d7!2sAdama%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus",
  contactMapOpenUrl: "https://maps.google.com/maps?q=Adama,+Ethiopia",
  footerConnectTitle: "Let's Connect",
  footerConnectDescription:
    "Ready to start a project or just want to say hi? Feel free to reach out!",
  footerConnectButtonLabel: "Get In Touch",
  articles: [],
};

export const defaultContactData = {
  email: "bekamgenene@gmail.com",
  phone: "+251 XXX XXX XXX",
  location: "Adama, Ethiopia",
};

export const defaultSocialData = {
  facebook: "https://facebook.com/bekam.genene",
  instagram: "https://instagram.com/bekam_genene",
  linkedin: "https://linkedin.com/in/bekam-genene",
  telegram: "https://t.me/bekamgenene",
  github: "https://github.com/Bekamgenene",
};

export const defaultPortfolioState = {
  profile: defaultProfileData,
  contact: defaultContactData,
  social: defaultSocialData,
  projects: [],
  certificates: [],
  experiences: [],
  messages: [],
};