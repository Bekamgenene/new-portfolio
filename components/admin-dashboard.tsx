"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Award,
  Briefcase,
  Mail,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Save,
  Eye,
  EyeOff,
  LogOut,
  Lock,
  User,
  BarChart3,
  TrendingUp,
  Clock,
  Search,
  Bell,
  Moon,
  Sun,
  X,
  Check,
  Upload,
  ExternalLink,
  GripVertical,
  Code2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// Simulated admin password - In production, use proper auth
const ADMIN_PASSWORD = "makeb@2141996";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "published" | "draft";
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
  technologies?: string[];
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  status: "active" | "expired";
  image?: string;
  credentialId?: string;
  verifyUrl?: string;
  skills?: string[];
}

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
}

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  status: "active" | "ended";
  type?: "work" | "education" | "internship";
  location?: string;
  description?: string;
  achievements?: string[];
  technologies?: string[];
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image?: string;
  tags: string[];
  articleUrl?: string;
  sourceUrl?: string;
  status: "published" | "draft";
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: "Python", level: 92, category: "Programming Language" },
    { id: 2, name: "TensorFlow", level: 85, category: "AI & Machine Learning" },
    { id: 3, name: "React", level: 90, category: "Frontend" },
    { id: 4, name: "TypeScript", level: 85, category: "Programming Language" },
    { id: 5, name: "Node.js", level: 85, category: "Backend" },
    { id: 6, name: "PostgreSQL", level: 80, category: "Backend" },
    { id: 7, name: "Git/GitHub", level: 90, category: "Tools & Others" },
    { id: 8, name: "Docker", level: 75, category: "Tools & Others" },
  ]);
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "Programming Language",
    level: 55,
  });
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [projectEditorOpen, setProjectEditorOpen] = useState(false);
  const [projectEditorMode, setProjectEditorMode] = useState<"add" | "edit">(
    "add",
  );
  const [projectEditorId, setProjectEditorId] = useState<number | null>(null);
  const [projectEditor, setProjectEditor] = useState({
    title: "",
    description: "",
    category: "Web App",
    status: "draft" as Project["status"],
    image: "",
    githubUrl: "",
    demoUrl: "",
    technologies: "",
  });
  const [certificateEditorOpen, setCertificateEditorOpen] = useState(false);
  const [certificateEditorMode, setCertificateEditorMode] = useState<
    "add" | "edit"
  >("add");
  const [certificateEditorId, setCertificateEditorId] = useState<number | null>(
    null,
  );
  const [certificateEditor, setCertificateEditor] = useState({
    title: "",
    issuer: "",
    date: new Date().getFullYear().toString(),
    status: "active" as Certificate["status"],
    image: "",
    credentialId: "",
    verifyUrl: "",
    skills: "",
  });
  const [experienceEditorOpen, setExperienceEditorOpen] = useState(false);
  const [experienceEditorMode, setExperienceEditorMode] = useState<
    "add" | "edit"
  >("add");
  const [experienceEditorId, setExperienceEditorId] = useState<number | null>(
    null,
  );
  const [experienceEditor, setExperienceEditor] = useState({
    role: "",
    company: "",
    period: "2024 - Present",
    status: "active" as ExperienceItem["status"],
    type: "work" as "work" | "education" | "internship",
    location: "",
    description: "",
    achievements: "",
    technologies: "",
  });
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleEditorOpen, setArticleEditorOpen] = useState(false);
  const [articleEditorMode, setArticleEditorMode] = useState<"add" | "edit">(
    "add",
  );
  const [articleEditorId, setArticleEditorId] = useState<number | null>(null);
  const [articleEditor, setArticleEditor] = useState({
    title: "",
    excerpt: "",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readTime: "5 min read",
    image: "",
    tags: "",
    articleUrl: "",
    sourceUrl: "",
    status: "published" as Article["status"],
  });
  const [profileSettings, setProfileSettings] = useState({
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
      {
        title: "Clean Code",
        description: "Writing maintainable, scalable code",
      },
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
    articles: [] as Article[],
  });

  const [contactSettings, setContactSettings] = useState({
    email: "bekamgenene@gmail.com",
    phone: "+251 XXX XXX XXX",
    location: "Adama, Ethiopia",
  });

  const [socialSettings, setSocialSettings] = useState({
    facebook: "https://facebook.com/bekam.genene",
    instagram: "https://instagram.com/bekam_genene",
    linkedin: "https://linkedin.com/in/bekam-genene",
    telegram: "https://t.me/bekamgenene",
    github: "https://github.com/Bekamgenene",
  });

  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [saveStatus, setSaveStatus] = useState<{
    type: string;
    message: string;
  } | null>(null);

  const [isHydrated, setIsHydrated] = useState(false);

  const savePortfolioState = async (payload: {
    profile?: typeof profileSettings;
    contact?: typeof contactSettings;
    social?: typeof socialSettings;
    projects?: Project[];
    certificates?: Certificate[];
    experiences?: ExperienceItem[];
    messages?: Message[];
    articles?: Article[];
  }) => {
    const response = await fetch("/api/portfolio-state", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
    };

    if (!response.ok) {
      throw new Error(data.error || "Failed to save portfolio state.");
    }

    window.dispatchEvent(new Event("portfolioStateUpdated"));
  };

  const persistProfileSettings = async (
    nextProfile: typeof profileSettings,
    message: string,
  ) => {
    try {
      await savePortfolioState({ profile: nextProfile });
      setProfileSettings(nextProfile);
      setSaveStatus({ type: "profile", message });
    } catch (error) {
      setSaveStatus({
        type: "profile",
        message:
          error instanceof Error ? error.message : "Failed to save profile.",
      });
    } finally {
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const uploadAssetToCloud = async (
    file: File,
    folder: string,
    kind: "image" | "pdf",
  ) => {
    if (kind === "image" && !file.type.startsWith("image/")) {
      throw new Error("Please upload an image file.");
    }
    if (kind === "pdf" && file.type !== "application/pdf") {
      throw new Error("Please upload a PDF file.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("assetType", kind);

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });

    const data = (await response.json().catch(() => ({}))) as {
      url?: string;
      error?: string;
    };

    if (!response.ok || !data.url) {
      throw new Error(data.error || "Upload failed.");
    }

    return data.url;
  };

  // Load settings from the cloud portfolio state on mount
  useEffect(() => {
    const loadPortfolioState = async () => {
      try {
        const response = await fetch("/api/portfolio-state", {
          cache: "no-store",
        });

        if (response.ok) {
          const data = (await response.json()) as {
            profile?: Partial<typeof profileSettings>;
            contact?: Partial<typeof contactSettings>;
            social?: Partial<typeof socialSettings>;
            projects?: Project[];
            certificates?: Certificate[];
            experiences?: ExperienceItem[];
            messages?: Message[];
          };

          const hasCloudData =
            Boolean(data.profile && Object.keys(data.profile).length) ||
            Boolean(data.contact && Object.keys(data.contact).length) ||
            Boolean(data.social && Object.keys(data.social).length) ||
            Boolean(data.projects?.length) ||
            Boolean(data.certificates?.length) ||
            Boolean(data.experiences?.length) ||
            Boolean(data.messages?.length);

          if (hasCloudData) {
            if (data.profile) {
              setProfileSettings((prev) => ({ ...prev, ...data.profile }));
              const maybeSkills = (data.profile as { skillsList?: Skill[] })
                .skillsList;
              const maybeArticles = (data.profile as { articles?: Article[] })
                .articles;
              if (Array.isArray(maybeSkills) && maybeSkills.length > 0) {
                setSkills(maybeSkills);
              }
              if (Array.isArray(maybeArticles)) {
                setArticles(maybeArticles);
              }
            }
            if (data.contact)
              setContactSettings((prev) => ({ ...prev, ...data.contact }));
            if (data.social)
              setSocialSettings((prev) => ({ ...prev, ...data.social }));
            if (data.projects) setProjects(data.projects);
            if (data.certificates) setCertificates(data.certificates);
            if (data.experiences) setExperiences(data.experiences);
            if (data.messages) setMessages(data.messages);
            setIsHydrated(true);
            return;
          }
        }
      } catch {
        // Keep defaults until the cloud state becomes available.
      }
      setIsHydrated(true);
    };

    void loadPortfolioState();

    const handleWindowFocus = () => {
      void loadPortfolioState();
    };

    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    setProfileSettings((prev) => ({ ...prev, articles }));
  }, [articles, isHydrated]);

  // Save functions
  const saveProfileSettings = () => {
    void persistProfileSettings(profileSettings, "Profile saved successfully!");
  };

  const saveContactSettings = () => {
    if (!/^\S+@\S+\.\S+$/.test(contactSettings.email)) {
      setSaveStatus({
        type: "contact",
        message: "Please enter a valid email.",
      });
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    void savePortfolioState({ contact: contactSettings })
      .then(() => {
        setSaveStatus({
          type: "contact",
          message: "Contact info saved successfully!",
        });
      })
      .catch((error) => {
        setSaveStatus({
          type: "contact",
          message:
            error instanceof Error
              ? error.message
              : "Failed to save contact info.",
        });
      })
      .finally(() => setTimeout(() => setSaveStatus(null), 3000));
  };

  const saveSocialSettings = () => {
    const links = Object.values(socialSettings).filter(Boolean);
    const hasInvalid = links.some((url) => !/^https?:\/\//.test(url));
    if (hasInvalid) {
      setSaveStatus({
        type: "social",
        message: "All social links must start with http:// or https://",
      });
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    void savePortfolioState({ social: socialSettings })
      .then(() => {
        setSaveStatus({
          type: "social",
          message: "Social links saved successfully!",
        });
      })
      .catch((error) => {
        setSaveStatus({
          type: "social",
          message:
            error instanceof Error
              ? error.message
              : "Failed to save social links.",
        });
      })
      .finally(() => setTimeout(() => setSaveStatus(null), 3000));
  };

  const savePublicContent = () => {
    void savePortfolioState({ profile: profileSettings })
      .then(() => {
        setSaveStatus({
          type: "public-content",
          message: "Public content saved successfully!",
        });
      })
      .catch((error) => {
        setSaveStatus({
          type: "public-content",
          message:
            error instanceof Error
              ? error.message
              : "Failed to save public content.",
        });
      })
      .finally(() => setTimeout(() => setSaveStatus(null), 3000));
  };

  const saveSkills = async (nextSkills: Skill[], successMessage: string) => {
    try {
      setSkills(nextSkills);
      setProfileSettings((prev) => ({
        ...prev,
        skillsList: nextSkills,
      }));
      await savePortfolioState({
        profile: {
          ...profileSettings,
          skillsList: nextSkills,
        },
      });
      setSaveStatus({ type: "skills", message: successMessage });
    } catch (error) {
      setSaveStatus({
        type: "skills",
        message:
          error instanceof Error ? error.message : "Failed to save skills.",
      });
    } finally {
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  const parseLines = (value: string) =>
    value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

  const parseKeyValueLines = (value: string) =>
    value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [left, ...right] = line.split("|");
        return {
          value: (left || "").trim(),
          label: right.join("|").trim(),
        };
      })
      .filter((item) => item.value && item.label);

  const skillLevelOptions = [
    { label: "Foundation", value: 30 },
    { label: "Intermediate", value: 55 },
    { label: "Advanced", value: 75 },
    { label: "Expert", value: 92 },
  ];

  const getSkillLevelLabel = (level: number) => {
    if (level >= 85) return "Expert";
    if (level >= 70) return "Advanced";
    if (level >= 45) return "Intermediate";
    return "Foundation";
  };

  const updatePassword = () => {
    if (passwordSettings.currentPassword !== ADMIN_PASSWORD) {
      setSaveStatus({
        type: "password",
        message: "Current password is incorrect!",
      });
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }
    if (passwordSettings.newPassword.length < 6) {
      setSaveStatus({
        type: "password",
        message: "New password must be at least 6 characters!",
      });
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }
    // In production, you would save this to a database
    setSaveStatus({
      type: "password",
      message: "Password updated! (Note: Changes won't persist in this demo)",
    });
    setPasswordSettings({ currentPassword: "", newPassword: "" });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const uploadProfileImage = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setSaveStatus({
        type: "profile",
        message: "Please upload an image file.",
      });
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    try {
      const previousProfileImage = profileSettings.profileImage;
      const imageUrl = await uploadAssetToCloud(file, "profile", "image");
      const nextProfile = { ...profileSettings, profileImage: imageUrl };

      // Show the new image immediately in admin UI, then persist to cloud.
      setProfileSettings(nextProfile);

      try {
        await savePortfolioState({ profile: nextProfile });
        setSaveStatus({
          type: "profile",
          message: "Profile picture uploaded.",
        });
      } catch (saveError) {
        setProfileSettings((prev) => ({
          ...prev,
          profileImage: previousProfileImage,
        }));
        throw saveError;
      }
    } catch (error) {
      setSaveStatus({
        type: "profile",
        message:
          error instanceof Error
            ? error.message
            : "Profile picture upload failed.",
      });
    } finally {
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const uploadCvFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      setSaveStatus({ type: "profile", message: "Please upload a PDF file." });
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    try {
      const cvUrl = await uploadAssetToCloud(file, "cv", "pdf");
      const nextProfile = {
        ...profileSettings,
        cvUrl,
        cvFileName: file.name,
      };
      await persistProfileSettings(nextProfile, "CV uploaded successfully.");
    } catch (error) {
      setSaveStatus({
        type: "profile",
        message: error instanceof Error ? error.message : "CV upload failed.",
      });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const stats = [
    {
      label: "Total Views",
      value: "12,847",
      change: "+12%",
      icon: Eye,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Projects",
      value: projects.length.toString(),
      change: "+2",
      icon: FolderKanban,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Messages",
      value: messages.length.toString(),
      change: "+5",
      icon: Mail,
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Certificates",
      value: certificates.length.toString(),
      change: "+1",
      icon: Award,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      // Store session
      sessionStorage.setItem("admin_auth", "true");
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    sessionStorage.removeItem("admin_auth");
  };

  // Check session on mount
  // Password is always required on page load - no session persistence
  // If you want session persistence, uncomment the useEffect below:
  // useEffect(() => {
  //   const auth = sessionStorage.getItem("admin_auth")
  //   if (auth === "true") {
  //     setIsAuthenticated(true)
  //   }
  // }, [])

  const deleteProject = (id: number) => {
    const nextProjects = projects.filter((p) => p.id !== id);
    setProjects(nextProjects);
    void savePortfolioState({ projects: nextProjects })
      .then(() => {
        setSaveStatus({ type: "projects", message: "Project deleted." });
      })
      .catch((error) => {
        setSaveStatus({
          type: "projects",
          message:
            error instanceof Error
              ? error.message
              : "Failed to delete project.",
        });
      })
      .finally(() => setTimeout(() => setSaveStatus(null), 2500));
  };

  const addProject = () => {
    setProjectEditorMode("add");
    setProjectEditorId(null);
    setProjectEditor({
      title: "",
      description: "",
      category: "Web App",
      status: "published",
      image: "",
      githubUrl: "",
      demoUrl: "",
      technologies: "",
    });
    setProjectEditorOpen(true);
  };

  const editProject = (project: Project) => {
    setProjectEditorMode("edit");
    setProjectEditorId(project.id);
    setProjectEditor({
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      image: project.image || "",
      githubUrl: project.githubUrl || "",
      demoUrl: project.demoUrl || "",
      technologies: (project.technologies || []).join(", "),
    });
    setProjectEditorOpen(true);
  };

  const saveProjectEditor = async () => {
    if (!projectEditor.title.trim()) {
      setSaveStatus({
        type: "projects",
        message: "Project title is required.",
      });
      setTimeout(() => setSaveStatus(null), 2500);
      return;
    }

    const normalizedTechnologies = projectEditor.technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const nextProjects =
      projectEditorMode === "add"
        ? [
            ...projects,
            {
              id: projects.length
                ? Math.max(...projects.map((p) => p.id)) + 1
                : 1,
              title: projectEditor.title.trim(),
              description: projectEditor.description.trim(),
              category: projectEditor.category.trim() || "Web App",
              status: projectEditor.status,
              image: projectEditor.image || "",
              githubUrl: projectEditor.githubUrl.trim(),
              demoUrl: projectEditor.demoUrl.trim(),
              technologies: normalizedTechnologies,
            },
          ]
        : projects.map((project) =>
            project.id === projectEditorId
              ? {
                  ...project,
                  title: projectEditor.title.trim(),
                  description: projectEditor.description.trim(),
                  category: projectEditor.category.trim() || "Web App",
                  status: projectEditor.status,
                  image: projectEditor.image || "",
                  githubUrl: projectEditor.githubUrl.trim(),
                  demoUrl: projectEditor.demoUrl.trim(),
                  technologies: normalizedTechnologies,
                }
              : project,
          );

    setProjects(nextProjects);
    setProjectEditorOpen(false);
    setProjectEditorId(null);

    try {
      await savePortfolioState({ projects: nextProjects });
      setSaveStatus({
        type: "projects",
        message:
          projectEditorMode === "add"
            ? "Project added successfully."
            : "Project updated successfully.",
      });
    } catch (error) {
      setSaveStatus({
        type: "projects",
        message:
          error instanceof Error ? error.message : "Failed to save project.",
      });
    } finally {
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  const uploadProjectImage = async (projectId: number, file: File) => {
    try {
      const imageUrl = await uploadAssetToCloud(file, "projects", "image");
      const nextProjects = projects.map((p) =>
        p.id === projectId ? { ...p, image: imageUrl } : p,
      );
      setProjects(nextProjects);
      await savePortfolioState({ projects: nextProjects });
      setSaveStatus({ type: "projects", message: "Project image uploaded." });
      setTimeout(() => setSaveStatus(null), 2500);
    } catch (error) {
      setSaveStatus({
        type: "projects",
        message:
          error instanceof Error
            ? error.message
            : "Project image upload failed.",
      });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const uploadProjectEditorImage = async (file: File) => {
    try {
      const imageUrl = await uploadAssetToCloud(file, "projects", "image");
      setProjectEditor((prev) => ({ ...prev, image: imageUrl }));
      setSaveStatus({
        type: "projects",
        message: "Project image uploaded. Save to keep it.",
      });
      setTimeout(() => setSaveStatus(null), 2500);
    } catch (error) {
      setSaveStatus({
        type: "projects",
        message:
          error instanceof Error
            ? error.message
            : "Project image upload failed.",
      });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const deleteCertificate = (id: number) => {
    const nextCertificates = certificates.filter((c) => c.id !== id);
    setCertificates(nextCertificates);
    void savePortfolioState({ certificates: nextCertificates })
      .then(() => {
        setSaveStatus({
          type: "certificates",
          message: "Certificate deleted.",
        });
      })
      .catch((error) => {
        setSaveStatus({
          type: "certificates",
          message:
            error instanceof Error
              ? error.message
              : "Failed to delete certificate.",
        });
      })
      .finally(() => setTimeout(() => setSaveStatus(null), 2500));
  };

  const addCertificate = () => {
    setCertificateEditorMode("add");
    setCertificateEditorId(null);
    setCertificateEditor({
      title: "",
      issuer: "",
      date: new Date().getFullYear().toString(),
      status: "active",
      image: "",
      credentialId: "",
      verifyUrl: "",
      skills: "",
    });
    setCertificateEditorOpen(true);
  };

  const editCertificate = (cert: Certificate) => {
    setCertificateEditorMode("edit");
    setCertificateEditorId(cert.id);
    setCertificateEditor({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      status: cert.status,
      image: cert.image || "",
      credentialId: cert.credentialId || "",
      verifyUrl: cert.verifyUrl || "",
      skills: (cert.skills || []).join(", "),
    });
    setCertificateEditorOpen(true);
  };

  const saveCertificateEditor = async () => {
    if (!certificateEditor.title.trim()) {
      setSaveStatus({
        type: "certificates",
        message: "Certificate title is required.",
      });
      setTimeout(() => setSaveStatus(null), 2500);
      return;
    }

    const nextCertificates =
      certificateEditorMode === "add"
        ? [
            ...certificates,
            {
              id: certificates.length
                ? Math.max(...certificates.map((c) => c.id)) + 1
                : 1,
              title: certificateEditor.title.trim(),
              issuer: certificateEditor.issuer.trim() || "Unknown",
              date:
                certificateEditor.date.trim() ||
                new Date().getFullYear().toString(),
              status: certificateEditor.status,
              image: certificateEditor.image || "",
              credentialId: certificateEditor.credentialId.trim(),
              verifyUrl: certificateEditor.verifyUrl.trim(),
              skills: parseLines(certificateEditor.skills),
            },
          ]
        : certificates.map((certificate) =>
            certificate.id === certificateEditorId
              ? {
                  ...certificate,
                  title: certificateEditor.title.trim(),
                  issuer: certificateEditor.issuer.trim() || "Unknown",
                  date: certificateEditor.date.trim() || certificate.date,
                  status: certificateEditor.status,
                  image: certificateEditor.image || "",
                  credentialId: certificateEditor.credentialId.trim(),
                  verifyUrl: certificateEditor.verifyUrl.trim(),
                  skills: parseLines(certificateEditor.skills),
                }
              : certificate,
          );

    setCertificates(nextCertificates);
    setCertificateEditorOpen(false);
    setCertificateEditorId(null);

    try {
      await savePortfolioState({ certificates: nextCertificates });
      setSaveStatus({
        type: "certificates",
        message:
          certificateEditorMode === "add"
            ? "Certificate added successfully."
            : "Certificate updated successfully.",
      });
    } catch (error) {
      setSaveStatus({
        type: "certificates",
        message:
          error instanceof Error
            ? error.message
            : "Failed to save certificate.",
      });
    } finally {
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  const uploadCertificateImage = async (certificateId: number, file: File) => {
    try {
      const imageUrl = await uploadAssetToCloud(file, "certificates", "image");
      const nextCertificates = certificates.map((c) =>
        c.id === certificateId ? { ...c, image: imageUrl } : c,
      );
      setCertificates(nextCertificates);
      await savePortfolioState({ certificates: nextCertificates });
      setSaveStatus({
        type: "certificates",
        message: "Certificate image uploaded.",
      });
      setTimeout(() => setSaveStatus(null), 2500);
    } catch (error) {
      setSaveStatus({
        type: "certificates",
        message:
          error instanceof Error
            ? error.message
            : "Certificate image upload failed.",
      });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const uploadCertificateEditorImage = async (file: File) => {
    try {
      const imageUrl = await uploadAssetToCloud(file, "certificates", "image");
      setCertificateEditor((prev) => ({ ...prev, image: imageUrl }));
      setSaveStatus({
        type: "certificates",
        message: "Certificate image uploaded. Save to keep it.",
      });
      setTimeout(() => setSaveStatus(null), 2500);
    } catch (error) {
      setSaveStatus({
        type: "certificates",
        message:
          error instanceof Error
            ? error.message
            : "Certificate image upload failed.",
      });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const addArticle = () => {
    setArticleEditorMode("add");
    setArticleEditorId(null);
    setArticleEditor({
      title: "New Article Title",
      excerpt: "Write a short summary of the article here.",
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      readTime: "5 min read",
      image: "",
      tags: "Article, Updates",
      articleUrl: "",
      sourceUrl: "",
      status: "draft",
    });
    setArticleEditorOpen(true);
  };

  const editArticle = (article: Article) => {
    setArticleEditorMode("edit");
    setArticleEditorId(article.id);
    setArticleEditor({
      title: article.title,
      excerpt: article.excerpt,
      date: article.date,
      readTime: article.readTime,
      image: article.image || "",
      tags: (article.tags || []).join(", "),
      articleUrl: article.articleUrl || "",
      sourceUrl: article.sourceUrl || "",
      status: article.status,
    });
    setArticleEditorOpen(true);
  };

  const saveArticleEditor = async () => {
    if (!articleEditor.title.trim()) {
      setSaveStatus({
        type: "articles",
        message: "Article title is required.",
      });
      setTimeout(() => setSaveStatus(null), 2500);
      return;
    }

    const nextTags = articleEditor.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const nextArticles =
      articleEditorMode === "add"
        ? [
            ...articles,
            {
              id: articles.length
                ? Math.max(...articles.map((a) => a.id)) + 1
                : 1,
              title: articleEditor.title.trim(),
              excerpt: articleEditor.excerpt.trim(),
              date: articleEditor.date.trim() || "",
              readTime: articleEditor.readTime.trim() || "5 min read",
              image: articleEditor.image || "",
              tags: nextTags,
              articleUrl: articleEditor.articleUrl.trim(),
              sourceUrl: articleEditor.sourceUrl.trim(),
              status: articleEditor.status,
            },
          ]
        : articles.map((item) =>
            item.id === articleEditorId
              ? {
                  ...item,
                  title: articleEditor.title.trim(),
                  excerpt: articleEditor.excerpt.trim(),
                  date: articleEditor.date.trim() || item.date,
                  readTime: articleEditor.readTime.trim() || item.readTime,
                  image: articleEditor.image || "",
                  tags: nextTags,
                  articleUrl: articleEditor.articleUrl.trim(),
                  sourceUrl: articleEditor.sourceUrl.trim(),
                  status: articleEditor.status,
                }
              : item,
          );

    setArticles(nextArticles);
    setArticleEditorOpen(false);
    setArticleEditorId(null);

    const nextProfile = { ...profileSettings, articles: nextArticles };

    try {
      await savePortfolioState({ profile: nextProfile });
      setProfileSettings(nextProfile);
      setSaveStatus({
        type: "articles",
        message:
          articleEditorMode === "add"
            ? "Article added successfully."
            : "Article updated successfully.",
      });
    } catch (error) {
      setSaveStatus({
        type: "articles",
        message:
          error instanceof Error ? error.message : "Failed to save article.",
      });
    } finally {
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  const deleteArticle = (id: number) => {
    const nextArticles = articles.filter((a) => a.id !== id);
    setArticles(nextArticles);
    const nextProfile = { ...profileSettings, articles: nextArticles };
    void savePortfolioState({ profile: nextProfile })
      .then(() => {
        setProfileSettings(nextProfile);
        setSaveStatus({ type: "articles", message: "Article deleted." });
      })
      .catch((error) => {
        setSaveStatus({
          type: "articles",
          message:
            error instanceof Error
              ? error.message
              : "Failed to delete article.",
        });
      })
      .finally(() => setTimeout(() => setSaveStatus(null), 2500));
  };

  const uploadArticleImage = async (articleId: number, file: File) => {
    try {
      const imageUrl = await uploadAssetToCloud(file, "articles", "image");
      const nextArticles = articles.map((a) =>
        a.id === articleId ? { ...a, image: imageUrl } : a,
      );
      setArticles(nextArticles);
      const nextProfile = { ...profileSettings, articles: nextArticles };
      await savePortfolioState({ profile: nextProfile });
      setProfileSettings(nextProfile);
      setSaveStatus({ type: "articles", message: "Article image uploaded." });
      setTimeout(() => setSaveStatus(null), 2500);
    } catch (error) {
      setSaveStatus({
        type: "articles",
        message:
          error instanceof Error
            ? error.message
            : "Article image upload failed.",
      });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const uploadArticleEditorImage = async (file: File) => {
    try {
      const imageUrl = await uploadAssetToCloud(file, "articles", "image");
      setArticleEditor((prev) => ({ ...prev, image: imageUrl }));
      setSaveStatus({
        type: "articles",
        message: "Article image uploaded. Save to keep it.",
      });
      setTimeout(() => setSaveStatus(null), 2500);
    } catch (error) {
      setSaveStatus({
        type: "articles",
        message:
          error instanceof Error
            ? error.message
            : "Article image upload failed.",
      });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const markMessageRead = (id: number) => {
    const nextMessages = messages.map((m) =>
      m.id === id ? { ...m, read: true } : m,
    );
    setMessages(nextMessages);
    void savePortfolioState({ messages: nextMessages }).catch((error) => {
      setSaveStatus({
        type: "messages",
        message:
          error instanceof Error ? error.message : "Failed to update message.",
      });
      setTimeout(() => setSaveStatus(null), 2500);
    });
  };

  const deleteMessage = (id: number) => {
    const nextMessages = messages.filter((m) => m.id !== id);
    setMessages(nextMessages);
    void savePortfolioState({ messages: nextMessages }).catch((error) => {
      setSaveStatus({
        type: "messages",
        message:
          error instanceof Error ? error.message : "Failed to delete message.",
      });
      setTimeout(() => setSaveStatus(null), 2500);
    });
  };

  const markAllMessagesRead = () => {
    const nextMessages = messages.map((m) => ({ ...m, read: true }));
    setMessages(nextMessages);
    void savePortfolioState({ messages: nextMessages }).catch((error) => {
      setSaveStatus({
        type: "messages",
        message:
          error instanceof Error ? error.message : "Failed to update messages.",
      });
      setTimeout(() => setSaveStatus(null), 2500);
    });
  };

  const replyToMessage = (msg: Message) => {
    const subject = encodeURIComponent(`Re: Message from ${msg.name}`);
    const body = encodeURIComponent(
      `Hi ${msg.name},\n\nThanks for your message.\n\n`,
    );
    window.open(`mailto:${msg.email}?subject=${subject}&body=${body}`, "_self");
  };

  const addExperience = () => {
    setExperienceEditorMode("add");
    setExperienceEditorId(null);
    setExperienceEditor({
      role: "",
      company: "",
      period: "2024 - Present",
      status: "active",
      type: "work",
      location: "",
      description: "",
      achievements: "",
      technologies: "",
    });
    setExperienceEditorOpen(true);
  };

  const editExperienceItem = (item: ExperienceItem) => {
    setExperienceEditorMode("edit");
    setExperienceEditorId(item.id);
    setExperienceEditor({
      role: item.role,
      company: item.company,
      period: item.period,
      status: item.status,
      type: item.type || "work",
      location: item.location || "",
      description: item.description || "",
      achievements: (item.achievements || []).join("\n"),
      technologies: (item.technologies || []).join(", "),
    });
    setExperienceEditorOpen(true);
  };

  const deleteExperience = (id: number) => {
    const nextExperiences = experiences.filter((e) => e.id !== id);
    setExperiences(nextExperiences);
    void savePortfolioState({ experiences: nextExperiences }).catch((error) => {
      setSaveStatus({
        type: "experience",
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete experience.",
      });
      setTimeout(() => setSaveStatus(null), 3000);
    });
  };

  const saveExperienceEditor = async () => {
    if (!experienceEditor.role.trim()) {
      setSaveStatus({ type: "experience", message: "Role is required." });
      setTimeout(() => setSaveStatus(null), 2500);
      return;
    }

    const nextAchievements = parseLines(experienceEditor.achievements);
    const nextTechnologies = experienceEditor.technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const nextExperiences =
      experienceEditorMode === "add"
        ? [
            ...experiences,
            {
              id: experiences.length
                ? Math.max(...experiences.map((e) => e.id)) + 1
                : 1,
              role: experienceEditor.role.trim(),
              company: experienceEditor.company.trim() || "Unknown",
              period: experienceEditor.period.trim() || "2024 - Present",
              status: experienceEditor.status,
              type: experienceEditor.type,
              location: experienceEditor.location.trim(),
              description: experienceEditor.description.trim(),
              achievements: nextAchievements,
              technologies: nextTechnologies,
            },
          ]
        : experiences.map((experience) =>
            experience.id === experienceEditorId
              ? {
                  ...experience,
                  role: experienceEditor.role.trim(),
                  company: experienceEditor.company.trim() || "Unknown",
                  period: experienceEditor.period.trim() || experience.period,
                  status: experienceEditor.status,
                  type: experienceEditor.type,
                  location: experienceEditor.location.trim(),
                  description: experienceEditor.description.trim(),
                  achievements: nextAchievements,
                  technologies: nextTechnologies,
                }
              : experience,
          );

    setExperiences(nextExperiences);
    setExperienceEditorOpen(false);
    setExperienceEditorId(null);

    try {
      await savePortfolioState({ experiences: nextExperiences });
      setSaveStatus({
        type: "experience",
        message:
          experienceEditorMode === "add"
            ? "Experience added successfully."
            : "Experience updated successfully.",
      });
    } catch (error) {
      setSaveStatus({
        type: "experience",
        message:
          error instanceof Error ? error.message : "Failed to save experience.",
      });
    } finally {
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "articles", label: "Articles", icon: FileText },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "experience", label: "Experience", icon: Briefcase },
    {
      id: "messages",
      label: "Messages",
      icon: Mail,
      badge: messages.filter((m) => !m.read).length,
    },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md"
        >
          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Admin Access
              </h1>
              <p className="text-muted-foreground mt-2">
                Enter password to continue
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-4 pr-12 bg-background/50 border-border/50 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90 rounded-xl font-medium"
              >
                Access Dashboard
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`fixed lg:relative w-64 h-screen bg-card/95 lg:bg-card/50 backdrop-blur-xl border-r border-border p-6 flex flex-col z-50 transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-cyan-500 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Admin Panel</h2>
              <p className="text-xs text-muted-foreground">Portfolio Manager</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-border space-y-2">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted/50 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            <span>View Site</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground capitalize">
                {activeTab}
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-48 lg:w-64 bg-muted/50 border-0 rounded-xl"
                />
              </div>
              <button
                onClick={() => setActiveTab("messages")}
                className="relative p-2 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                        >
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="flex items-center gap-1 text-sm text-green-500 font-medium">
                          <TrendingUp className="w-4 h-4" />
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-foreground mb-1">
                        {stat.value}
                      </h3>
                      <p className="text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Recent Messages
                    </h3>
                    <div className="space-y-4">
                      {messages.slice(0, 3).map((msg) => (
                        <div
                          key={msg.id}
                          className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">
                              {msg.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-foreground">
                                {msg.name}
                              </h4>
                              {!msg.read && (
                                <span className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {msg.message}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {msg.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          label: "Add Project",
                          icon: Plus,
                          action: () => setActiveTab("projects"),
                        },
                        {
                          label: "Add Certificate",
                          icon: Award,
                          action: () => setActiveTab("certificates"),
                        },
                        {
                          label: "View Messages",
                          icon: Mail,
                          action: () => setActiveTab("messages"),
                        },
                        {
                          label: "Settings",
                          icon: Settings,
                          action: () => setActiveTab("settings"),
                        },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={item.action}
                          className="flex items-center gap-3 p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-colors"
                        >
                          <item.icon className="w-5 h-5 text-primary" />
                          <span className="font-medium text-foreground">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Manage your portfolio projects
                  </p>
                  <Button
                    onClick={addProject}
                    className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                  >
                    <Plus className="w-4 h-4" />
                    Add Project
                  </Button>
                </div>
                {saveStatus?.type === "projects" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-500 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {saveStatus.message}
                  </motion.div>
                )}

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px]">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                            Project
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                            Category
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                            Status
                          </th>
                          <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {projects.map((project) => (
                          <tr
                            key={project.id}
                            className="hover:bg-muted/20 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                                {project.image ? (
                                  <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={56}
                                    height={40}
                                    className="w-14 h-10 object-cover rounded-md border border-border"
                                  />
                                ) : (
                                  <div className="w-14 h-10 rounded-md border border-dashed border-border flex items-center justify-center text-[10px] text-muted-foreground">
                                    No Img
                                  </div>
                                )}
                                <div>
                                  <h4 className="font-medium text-foreground">
                                    {project.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {project.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                                {project.category}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 text-sm rounded-full ${
                                  project.status === "published"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-yellow-500/10 text-yellow-500"
                                }`}
                              >
                                {project.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <input
                                  id={`project-image-${project.id}`}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file)
                                      uploadProjectImage(project.id, file);
                                    e.currentTarget.value = "";
                                  }}
                                />
                                <button
                                  onClick={() =>
                                    document
                                      .getElementById(
                                        `project-image-${project.id}`,
                                      )
                                      ?.click()
                                  }
                                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                                  title="Upload image"
                                >
                                  <Upload className="w-4 h-4 text-primary" />
                                </button>
                                <button
                                  onClick={() => editProject(project)}
                                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                  <Edit2 className="w-4 h-4 text-muted-foreground" />
                                </button>
                                <button
                                  onClick={() => deleteProject(project.id)}
                                  className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Articles Tab */}
            {activeTab === "articles" && (
              <motion.div
                key="articles"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Manage your article cards shown on the home page
                  </p>
                  <Button
                    onClick={addArticle}
                    className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                  >
                    <Plus className="w-4 h-4" />
                    Add Article
                  </Button>
                </div>

                {saveStatus?.type === "articles" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-500 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {saveStatus.message}
                  </motion.div>
                )}

                {articles.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border bg-card/40 p-8 text-center">
                    <h3 className="text-lg font-semibold text-foreground">
                      No articles yet
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                      Your public Articles section stays hidden until you
                      publish one. Use the button above to create a draft
                      anytime.
                    </p>
                    <Button
                      onClick={addArticle}
                      className="mt-5 gap-2 bg-gradient-to-r from-primary to-cyan-500"
                    >
                      <Plus className="w-4 h-4" />
                      Create Draft Article
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                      <div
                        key={article.id}
                        className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4"
                      >
                        {article.image ? (
                          <div className="relative w-full h-32 rounded-xl border border-border mb-4 overflow-hidden">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-32 rounded-xl border border-dashed border-border mb-4 flex items-center justify-center text-sm text-muted-foreground">
                            No article image
                          </div>
                        )}

                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-bold text-foreground line-clamp-2">
                            {article.title}
                          </h3>
                          <span
                            className={`px-2.5 py-1 text-xs rounded-full ${
                              article.status === "published"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {article.status}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center gap-2">
                          <input
                            id={`article-image-${article.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadArticleImage(article.id, file);
                              e.currentTarget.value = "";
                            }}
                          />
                          <button
                            onClick={() =>
                              document
                                .getElementById(`article-image-${article.id}`)
                                ?.click()
                            }
                            className="px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                            title="Upload image"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => editArticle(article)}
                            className="flex-1 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteArticle(article.id)}
                            className="p-2 text-red-500 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {saveStatus?.type === "skills" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-500 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {saveStatus.message}
                  </motion.div>
                )}
                {/* Add New Skill */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Add New Skill
                  </h3>
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Skill Name
                      </label>
                      <Input
                        value={newSkill.name}
                        onChange={(e) =>
                          setNewSkill({ ...newSkill, name: e.target.value })
                        }
                        placeholder="e.g. React"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Category
                      </label>
                      <select
                        value={newSkill.category}
                        onChange={(e) =>
                          setNewSkill({ ...newSkill, category: e.target.value })
                        }
                        className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                      >
                        <option value="AI & Machine Learning">
                          AI & Machine Learning
                        </option>
                        <option value="Programming Language">
                          Programming Language
                        </option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Tools & Others">Tools & Others</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Proficiency
                      </label>
                      <select
                        value={newSkill.level}
                        onChange={(e) =>
                          setNewSkill({
                            ...newSkill,
                            level: parseInt(e.target.value),
                          })
                        }
                        className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                      >
                        {skillLevelOptions.map((option) => (
                          <option key={option.label} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={async () => {
                          if (newSkill.name.trim()) {
                            const safeCategory =
                              newSkill.category.trim() || "Other";
                            const nextSkills = [
                              ...skills,
                              {
                                ...newSkill,
                                category: safeCategory,
                                id: Date.now(),
                              },
                            ];
                            await saveSkills(
                              nextSkills,
                              "Skill added successfully.",
                            );
                            setNewSkill({
                              name: "",
                              level: 55,
                              category: "Programming Language",
                            });
                          }
                        }}
                        className="w-full bg-gradient-to-r from-primary to-cyan-500"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Skills by Category */}
                {[
                  "AI & Machine Learning",
                  "Programming Language",
                  "Frontend",
                  "Backend",
                  "Database",
                  "DevOps",
                  "Mobile",
                  "Tools & Others",
                  "Other",
                ].map((category) => {
                  const categorySkills = skills.filter(
                    (s) => s.category === category,
                  );
                  if (categorySkills.length === 0) return null;

                  return (
                    <div
                      key={category}
                      className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6"
                    >
                      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-primary" />
                        {category}
                        <span className="text-sm font-normal text-muted-foreground">
                          ({categorySkills.length})
                        </span>
                      </h3>
                      <div className="space-y-4">
                        {categorySkills.map((skill) => (
                          <div
                            key={skill.id}
                            className="flex flex-wrap items-center gap-3 sm:gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            {editingSkill?.id === skill.id ? (
                              <>
                                <Input
                                  value={editingSkill.name}
                                  onChange={(e) =>
                                    setEditingSkill({
                                      ...editingSkill,
                                      name: e.target.value,
                                    })
                                  }
                                  className="w-full sm:flex-1 h-8 sm:min-w-[180px]"
                                />
                                <select
                                  value={editingSkill.category}
                                  onChange={(e) =>
                                    setEditingSkill({
                                      ...editingSkill,
                                      category: e.target.value,
                                    })
                                  }
                                  className="w-full sm:w-auto h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground"
                                >
                                  <option value="AI & Machine Learning">
                                    AI & Machine Learning
                                  </option>
                                  <option value="Programming Language">
                                    Programming Language
                                  </option>
                                  <option value="Frontend">Frontend</option>
                                  <option value="Backend">Backend</option>
                                  <option value="Database">Database</option>
                                  <option value="DevOps">DevOps</option>
                                  <option value="Mobile">Mobile</option>
                                  <option value="Tools & Others">
                                    Tools & Others
                                  </option>
                                  <option value="Other">Other</option>
                                </select>
                                <select
                                  value={editingSkill.level}
                                  onChange={(e) =>
                                    setEditingSkill({
                                      ...editingSkill,
                                      level: parseInt(e.target.value),
                                    })
                                  }
                                  className="w-full sm:w-auto h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground"
                                >
                                  {skillLevelOptions.map((option) => (
                                    <option
                                      key={option.label}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                                <Button
                                  size="sm"
                                  onClick={async () => {
                                    const nextSkills = skills.map((s) =>
                                      s.id === editingSkill.id
                                        ? editingSkill
                                        : s,
                                    );
                                    await saveSkills(
                                      nextSkills,
                                      "Skill updated successfully.",
                                    );
                                    setEditingSkill(null);
                                  }}
                                  className="bg-green-500 hover:bg-green-600"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingSkill(null)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <span className="font-medium text-foreground flex-1">
                                  {skill.name}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                  {getSkillLevelLabel(skill.level)}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setEditingSkill(skill)}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={async () => {
                                    const nextSkills = skills.filter(
                                      (s) => s.id !== skill.id,
                                    );
                                    await saveSkills(
                                      nextSkills,
                                      "Skill removed successfully.",
                                    );
                                  }}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Manage your certifications
                  </p>
                  <Button
                    onClick={addCertificate}
                    className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                  >
                    <Plus className="w-4 h-4" />
                    Add Certificate
                  </Button>
                </div>
                {saveStatus?.type === "certificates" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-500 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {saveStatus.message}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6"
                    >
                      {cert.image ? (
                        <div className="relative w-full h-40 rounded-xl border border-border mb-4 overflow-hidden">
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-40 rounded-xl border border-dashed border-border mb-4 flex items-center justify-center text-sm text-muted-foreground">
                          No certificate image
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-xl">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            cert.status === "active"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {cert.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {cert.issuer} - {cert.date}
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          id={`certificate-image-${cert.id}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) uploadCertificateImage(cert.id, file);
                            e.currentTarget.value = "";
                          }}
                        />
                        <button
                          onClick={() =>
                            document
                              .getElementById(`certificate-image-${cert.id}`)
                              ?.click()
                          }
                          className="px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                          title="Upload image"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => editCertificate(cert)}
                          className="flex-1 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCertificate(cert.id)}
                          className="p-2 text-red-500 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    {messages.filter((m) => !m.read).length} unread messages
                  </p>
                  <Button
                    onClick={markAllMessagesRead}
                    variant="outline"
                    className="gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Mark All Read
                  </Button>
                </div>

                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`bg-card/50 backdrop-blur-sm border rounded-2xl p-6 transition-colors ${
                        msg.read ? "border-border" : "border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-primary">
                              {msg.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-foreground">
                                {msg.name}
                              </h4>
                              {!msg.read && (
                                <span className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {msg.email}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {msg.date}
                        </span>
                      </div>
                      <p className="text-foreground mb-4">{msg.message}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => replyToMessage(msg)}
                        >
                          <Mail className="w-4 h-4" />
                          Reply
                        </Button>
                        {!msg.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markMessageRead(msg.id)}
                          >
                            Mark as Read
                          </Button>
                        )}
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="ml-auto p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl space-y-6"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Profile Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Profile Picture
                      </label>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border bg-muted/40">
                          {profileSettings.profileImage ? (
                            <Image
                              src={profileSettings.profileImage}
                              alt="Profile"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                              No Img
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <input
                            id="profile-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadProfileImage(file);
                              e.currentTarget.value = "";
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document
                                .getElementById("profile-image-upload")
                                ?.click()
                            }
                            className="gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            Upload Photo
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Name
                      </label>
                      <Input
                        value={profileSettings.name}
                        onChange={(e) =>
                          setProfileSettings({
                            ...profileSettings,
                            name: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Title / Role
                      </label>
                      <Input
                        value={profileSettings.title}
                        onChange={(e) =>
                          setProfileSettings({
                            ...profileSettings,
                            title: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Bio
                      </label>
                      <textarea
                        className="w-full mt-1 p-3 bg-background border border-border rounded-xl resize-none"
                        rows={4}
                        value={profileSettings.bio}
                        onChange={(e) =>
                          setProfileSettings({
                            ...profileSettings,
                            bio: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={saveProfileSettings}
                        className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </Button>
                      {saveStatus?.type === "profile" && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-green-500 flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          {saveStatus.message}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Email
                      </label>
                      <Input
                        value={contactSettings.email}
                        onChange={(e) =>
                          setContactSettings({
                            ...contactSettings,
                            email: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Phone Number
                      </label>
                      <Input
                        value={contactSettings.phone}
                        onChange={(e) =>
                          setContactSettings({
                            ...contactSettings,
                            phone: e.target.value,
                          })
                        }
                        className="mt-1"
                        placeholder="+251 912 345 678"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Location
                      </label>
                      <Input
                        value={contactSettings.location}
                        onChange={(e) =>
                          setContactSettings({
                            ...contactSettings,
                            location: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={saveContactSettings}
                        className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                      >
                        <Save className="w-4 h-4" />
                        Save Contact Info
                      </Button>
                      {saveStatus?.type === "contact" && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-green-500 flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          {saveStatus.message}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Public Page Content
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    These values control text shown on About, Skills,
                    Experience, Contact, and Footer sections.
                  </p>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          About Badge
                        </label>
                        <Input
                          value={profileSettings.aboutHeading || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              aboutHeading: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          About Title
                        </label>
                        <Input
                          value={profileSettings.aboutTitle || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              aboutTitle: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        About Paragraphs (one per line)
                      </label>
                      <textarea
                        className="w-full mt-1 p-3 bg-background border border-border rounded-xl resize-none"
                        rows={4}
                        value={(profileSettings.aboutParagraphs || []).join(
                          "\n",
                        )}
                        onChange={(e) =>
                          setProfileSettings({
                            ...profileSettings,
                            aboutParagraphs: parseLines(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        About Stats (format: value|label, one per line)
                      </label>
                      <textarea
                        className="w-full mt-1 p-3 bg-background border border-border rounded-xl resize-none"
                        rows={4}
                        value={(profileSettings.aboutStats || [])
                          .map((item) => `${item.value}|${item.label}`)
                          .join("\n")}
                        onChange={(e) =>
                          setProfileSettings({
                            ...profileSettings,
                            aboutStats: parseKeyValueLines(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        About Highlights (format: title|description, one per
                        line)
                      </label>
                      <textarea
                        className="w-full mt-1 p-3 bg-background border border-border rounded-xl resize-none"
                        rows={4}
                        value={(profileSettings.aboutHighlights || [])
                          .map((item) => `${item.title}|${item.description}`)
                          .join("\n")}
                        onChange={(e) =>
                          setProfileSettings({
                            ...profileSettings,
                            aboutHighlights: parseKeyValueLines(
                              e.target.value,
                            ).map((item) => ({
                              title: item.value,
                              description: item.label,
                            })),
                          })
                        }
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Skills Badge
                        </label>
                        <Input
                          value={profileSettings.skillsHeading || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              skillsHeading: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Skills Title
                        </label>
                        <Input
                          value={profileSettings.skillsTitle || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              skillsTitle: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Experience Badge
                        </label>
                        <Input
                          value={profileSettings.experienceHeading || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              experienceHeading: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Experience Title
                        </label>
                        <Input
                          value={profileSettings.experienceTitle || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              experienceTitle: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Contact Badge
                        </label>
                        <Input
                          value={profileSettings.contactHeading || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              contactHeading: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Contact Title
                        </label>
                        <Input
                          value={profileSettings.contactTitle || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              contactTitle: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Contact Description
                      </label>
                      <textarea
                        className="w-full mt-1 p-3 bg-background border border-border rounded-xl resize-none"
                        rows={3}
                        value={profileSettings.contactDescription || ""}
                        onChange={(e) =>
                          setProfileSettings({
                            ...profileSettings,
                            contactDescription: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Map Embed URL
                        </label>
                        <Input
                          value={profileSettings.contactMapEmbedUrl || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              contactMapEmbedUrl: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Open Map URL
                        </label>
                        <Input
                          value={profileSettings.contactMapOpenUrl || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              contactMapOpenUrl: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Footer CTA Title
                        </label>
                        <Input
                          value={profileSettings.footerConnectTitle || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              footerConnectTitle: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Footer CTA Text
                        </label>
                        <Input
                          value={profileSettings.footerConnectDescription || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              footerConnectDescription: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Footer CTA Button
                        </label>
                        <Input
                          value={profileSettings.footerConnectButtonLabel || ""}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              footerConnectButtonLabel: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        onClick={savePublicContent}
                        className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                      >
                        <Save className="w-4 h-4" />
                        Save Public Content
                      </Button>
                      {saveStatus?.type === "public-content" && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-green-500 flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          {saveStatus.message}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Social Links
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Facebook
                      </label>
                      <Input
                        value={socialSettings.facebook}
                        onChange={(e) =>
                          setSocialSettings({
                            ...socialSettings,
                            facebook: e.target.value,
                          })
                        }
                        className="mt-1"
                        placeholder="https://facebook.com/yourusername"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Instagram
                      </label>
                      <Input
                        value={socialSettings.instagram}
                        onChange={(e) =>
                          setSocialSettings({
                            ...socialSettings,
                            instagram: e.target.value,
                          })
                        }
                        className="mt-1"
                        placeholder="https://instagram.com/yourusername"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        LinkedIn
                      </label>
                      <Input
                        value={socialSettings.linkedin}
                        onChange={(e) =>
                          setSocialSettings({
                            ...socialSettings,
                            linkedin: e.target.value,
                          })
                        }
                        className="mt-1"
                        placeholder="https://linkedin.com/in/yourusername"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Telegram
                      </label>
                      <Input
                        value={socialSettings.telegram}
                        onChange={(e) =>
                          setSocialSettings({
                            ...socialSettings,
                            telegram: e.target.value,
                          })
                        }
                        className="mt-1"
                        placeholder="https://t.me/yourusername"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        GitHub
                      </label>
                      <Input
                        value={socialSettings.github}
                        onChange={(e) =>
                          setSocialSettings({
                            ...socialSettings,
                            github: e.target.value,
                          })
                        }
                        className="mt-1"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={saveSocialSettings}
                        className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                      >
                        <Save className="w-4 h-4" />
                        Save Social Links
                      </Button>
                      {saveStatus?.type === "social" && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-green-500 flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          {saveStatus.message}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    CV / Resume
                  </h3>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Upload your CV as a PDF. The homepage download button uses
                      the uploaded cloud file automatically.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        id="cv-upload"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadCvFile(file);
                          e.currentTarget.value = "";
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("cv-upload")?.click()
                        }
                        className="gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Upload CV (PDF)
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {profileSettings.cvFileName || "No file selected"}
                      </span>
                    </div>
                    {profileSettings.cvUrl && (
                      <a
                        href={`/api/download?url=${encodeURIComponent(profileSettings.cvUrl)}&filename=${encodeURIComponent(profileSettings.cvFileName || `${profileSettings.name.replace(/\s/g, "_")}_CV.pdf`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex text-sm text-cyan-400 hover:text-cyan-300"
                      >
                        Preview uploaded CV
                      </a>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Profile uploads save to the cloud automatically.
                    </p>
                  </div>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Current Password
                      </label>
                      <Input
                        type="password"
                        value={passwordSettings.currentPassword}
                        onChange={(e) =>
                          setPasswordSettings({
                            ...passwordSettings,
                            currentPassword: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        New Password
                      </label>
                      <Input
                        type="password"
                        value={passwordSettings.newPassword}
                        onChange={(e) =>
                          setPasswordSettings({
                            ...passwordSettings,
                            newPassword: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" onClick={updatePassword}>
                        Update Password
                      </Button>
                      {saveStatus?.type === "password" && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`text-sm flex items-center gap-1 ${saveStatus.message.includes("incorrect") || saveStatus.message.includes("must be") ? "text-red-500" : "text-green-500"}`}
                        >
                          {saveStatus.message.includes("incorrect") ||
                          saveStatus.message.includes("must be") ? (
                            <X className="w-4 h-4" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          {saveStatus.message}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Manage work experience and education
                  </p>
                  <Button
                    onClick={addExperience}
                    className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                  >
                    <Plus className="w-4 h-4" />
                    Add Experience
                  </Button>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                  <div className="space-y-4">
                    {experiences.length === 0 && (
                      <p className="text-muted-foreground text-center py-8">
                        No experience items yet.
                      </p>
                    )}
                    {experiences.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-muted/30 border border-border/50"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {item.role}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {item.company} • {item.period}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 text-xs rounded-full w-fit ${item.status === "active" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => editExperienceItem(item)}
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteExperience(item.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {projectEditorOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 p-3 sm:p-4"
                  onClick={() => setProjectEditorOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.96, y: 16 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.96, y: 16 }}
                    onClick={(event) => event.stopPropagation()}
                    className="my-4 sm:my-6 w-full max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {projectEditorMode === "add"
                            ? "Add Project"
                            : "Edit Project"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Save updates directly to your deployed portfolio.
                        </p>
                      </div>
                      <button
                        onClick={() => setProjectEditorOpen(false)}
                        className="p-2 rounded-lg hover:bg-muted/50"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Title
                        </label>
                        <Input
                          value={projectEditor.title}
                          onChange={(event) =>
                            setProjectEditor((prev) => ({
                              ...prev,
                              title: event.target.value,
                            }))
                          }
                          className="mt-1"
                          placeholder="Project title"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Description
                        </label>
                        <textarea
                          value={projectEditor.description}
                          onChange={(event) =>
                            setProjectEditor((prev) => ({
                              ...prev,
                              description: event.target.value,
                            }))
                          }
                          rows={4}
                          className="mt-1 w-full rounded-xl border border-border bg-background p-3 text-foreground"
                          placeholder="Short description"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Category
                          </label>
                          <Input
                            value={projectEditor.category}
                            onChange={(event) =>
                              setProjectEditor((prev) => ({
                                ...prev,
                                category: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="Web App"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Status
                          </label>
                          <select
                            value={projectEditor.status}
                            onChange={(event) =>
                              setProjectEditor((prev) => ({
                                ...prev,
                                status: event.target.value as Project["status"],
                              }))
                            }
                            className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-foreground"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            GitHub URL
                          </label>
                          <Input
                            value={projectEditor.githubUrl}
                            onChange={(event) =>
                              setProjectEditor((prev) => ({
                                ...prev,
                                githubUrl: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="https://github.com/username/repo"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Demo URL
                          </label>
                          <Input
                            value={projectEditor.demoUrl}
                            onChange={(event) =>
                              setProjectEditor((prev) => ({
                                ...prev,
                                demoUrl: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="https://your-demo-site.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Technologies (comma-separated)
                        </label>
                        <Input
                          value={projectEditor.technologies}
                          onChange={(event) =>
                            setProjectEditor((prev) => ({
                              ...prev,
                              technologies: event.target.value,
                            }))
                          }
                          className="mt-1"
                          placeholder="Python, TypeScript, Next.js"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Image
                        </label>
                        <div className="mt-2 flex items-center gap-3">
                          <input
                            id="project-editor-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (file) {
                                void uploadProjectEditorImage(file);
                              }
                              event.currentTarget.value = "";
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document
                                .getElementById("project-editor-image-upload")
                                ?.click()
                            }
                            className="gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            Upload Image
                          </Button>
                          {projectEditor.image && (
                            <span className="text-xs text-green-500">
                              Uploaded
                            </span>
                          )}
                        </div>
                        {projectEditor.image && (
                          <div className="mt-3 relative w-full h-40 rounded-xl border border-border overflow-hidden">
                            <Image
                              src={projectEditor.image}
                              alt="Project preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setProjectEditorOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={saveProjectEditor}
                        className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                      >
                        <Save className="w-4 h-4" />
                        {projectEditorMode === "add"
                          ? "Add Project"
                          : "Save Project"}
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {certificateEditorOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 p-3 sm:p-4"
                  onClick={() => setCertificateEditorOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.96, y: 16 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.96, y: 16 }}
                    onClick={(event) => event.stopPropagation()}
                    className="my-4 sm:my-6 w-full max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {certificateEditorMode === "add"
                            ? "Add Certificate"
                            : "Edit Certificate"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Changes are saved to the cloud portfolio state.
                        </p>
                      </div>
                      <button
                        onClick={() => setCertificateEditorOpen(false)}
                        className="p-2 rounded-lg hover:bg-muted/50"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Title
                        </label>
                        <Input
                          value={certificateEditor.title}
                          onChange={(event) =>
                            setCertificateEditor((prev) => ({
                              ...prev,
                              title: event.target.value,
                            }))
                          }
                          className="mt-1"
                          placeholder="Certificate title"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Issuer
                          </label>
                          <Input
                            value={certificateEditor.issuer}
                            onChange={(event) =>
                              setCertificateEditor((prev) => ({
                                ...prev,
                                issuer: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="Issuer"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Date
                          </label>
                          <Input
                            value={certificateEditor.date}
                            onChange={(event) =>
                              setCertificateEditor((prev) => ({
                                ...prev,
                                date: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="2024"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Credential ID
                          </label>
                          <Input
                            value={certificateEditor.credentialId}
                            onChange={(event) =>
                              setCertificateEditor((prev) => ({
                                ...prev,
                                credentialId: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="AWS-SAA-C03-XXXXX"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Verify URL
                          </label>
                          <Input
                            value={certificateEditor.verifyUrl}
                            onChange={(event) =>
                              setCertificateEditor((prev) => ({
                                ...prev,
                                verifyUrl: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="https://example.com/verify"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Skills / Tags
                        </label>
                        <textarea
                          className="w-full mt-1 p-3 bg-background border border-border rounded-xl resize-none"
                          rows={3}
                          value={certificateEditor.skills}
                          onChange={(event) =>
                            setCertificateEditor((prev) => ({
                              ...prev,
                              skills: event.target.value,
                            }))
                          }
                          placeholder="Cloud Architecture, EC2, S3"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          Separate items with commas or new lines.
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Status
                        </label>
                        <select
                          value={certificateEditor.status}
                          onChange={(event) =>
                            setCertificateEditor((prev) => ({
                              ...prev,
                              status: event.target
                                .value as Certificate["status"],
                            }))
                          }
                          className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-foreground"
                        >
                          <option value="active">Active</option>
                          <option value="expired">Expired</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Image
                        </label>
                        <div className="mt-2 flex items-center gap-3">
                          <input
                            id="certificate-editor-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (file) {
                                void uploadCertificateEditorImage(file);
                              }
                              event.currentTarget.value = "";
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document
                                .getElementById(
                                  "certificate-editor-image-upload",
                                )
                                ?.click()
                            }
                            className="gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            Upload Image
                          </Button>
                          {certificateEditor.image && (
                            <span className="text-xs text-green-500">
                              Uploaded
                            </span>
                          )}
                        </div>
                        {certificateEditor.image && (
                          <div className="mt-3 relative w-full h-40 rounded-xl border border-border overflow-hidden">
                            <Image
                              src={certificateEditor.image}
                              alt="Certificate preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setCertificateEditorOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={saveCertificateEditor}
                        className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                      >
                        <Save className="w-4 h-4" />
                        {certificateEditorMode === "add"
                          ? "Add Certificate"
                          : "Save Certificate"}
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {articleEditorOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 p-3 sm:p-4"
                  onClick={() => setArticleEditorOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.96, y: 16 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.96, y: 16 }}
                    onClick={(event) => event.stopPropagation()}
                    className="my-4 sm:my-6 w-full max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {articleEditorMode === "add"
                            ? "Add Article"
                            : "Edit Article"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          This controls the home page articles section.
                        </p>
                      </div>
                      <button
                        onClick={() => setArticleEditorOpen(false)}
                        className="p-2 rounded-lg hover:bg-muted/50"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Title
                        </label>
                        <Input
                          value={articleEditor.title}
                          onChange={(event) =>
                            setArticleEditor((prev) => ({
                              ...prev,
                              title: event.target.value,
                            }))
                          }
                          className="mt-1"
                          placeholder="Article title"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Excerpt
                        </label>
                        <textarea
                          value={articleEditor.excerpt}
                          onChange={(event) =>
                            setArticleEditor((prev) => ({
                              ...prev,
                              excerpt: event.target.value,
                            }))
                          }
                          rows={3}
                          className="mt-1 w-full rounded-xl border border-border bg-background p-3 text-foreground"
                          placeholder="Short description"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Date
                          </label>
                          <Input
                            value={articleEditor.date}
                            onChange={(event) =>
                              setArticleEditor((prev) => ({
                                ...prev,
                                date: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="July 10, 2025"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Read Time
                          </label>
                          <Input
                            value={articleEditor.readTime}
                            onChange={(event) =>
                              setArticleEditor((prev) => ({
                                ...prev,
                                readTime: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="5 min read"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Article URL
                          </label>
                          <Input
                            value={articleEditor.articleUrl}
                            onChange={(event) =>
                              setArticleEditor((prev) => ({
                                ...prev,
                                articleUrl: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="https://your-article-url.com"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Source URL
                          </label>
                          <Input
                            value={articleEditor.sourceUrl}
                            onChange={(event) =>
                              setArticleEditor((prev) => ({
                                ...prev,
                                sourceUrl: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="https://github.com/..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Tags (comma-separated)
                        </label>
                        <Input
                          value={articleEditor.tags}
                          onChange={(event) =>
                            setArticleEditor((prev) => ({
                              ...prev,
                              tags: event.target.value,
                            }))
                          }
                          className="mt-1"
                          placeholder="AI, RAG, FinTech"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Status
                        </label>
                        <select
                          value={articleEditor.status}
                          onChange={(event) =>
                            setArticleEditor((prev) => ({
                              ...prev,
                              status: event.target.value as Article["status"],
                            }))
                          }
                          className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-foreground"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Image
                        </label>
                        <div className="mt-2 flex items-center gap-3">
                          <input
                            id="article-editor-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (file) {
                                void uploadArticleEditorImage(file);
                              }
                              event.currentTarget.value = "";
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document
                                .getElementById("article-editor-image-upload")
                                ?.click()
                            }
                            className="gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            Upload Image
                          </Button>
                          {articleEditor.image && (
                            <span className="text-xs text-green-500">
                              Uploaded
                            </span>
                          )}
                        </div>

                        {articleEditor.image && (
                          <div className="mt-3 relative w-full h-36 rounded-xl border border-border overflow-hidden">
                            <Image
                              src={articleEditor.image}
                              alt="Article preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setArticleEditorOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={saveArticleEditor}
                        className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                      >
                        <Save className="w-4 h-4" />
                        {articleEditorMode === "add"
                          ? "Add Article"
                          : "Save Article"}
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {experienceEditorOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 p-3 sm:p-4"
                  onClick={() => setExperienceEditorOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.96, y: 16 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.96, y: 16 }}
                    onClick={(event) => event.stopPropagation()}
                    className="my-4 sm:my-6 w-full max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {experienceEditorMode === "add"
                            ? "Add Experience"
                            : "Edit Experience"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Keep the public experience timeline in sync.
                        </p>
                      </div>
                      <button
                        onClick={() => setExperienceEditorOpen(false)}
                        className="p-2 rounded-lg hover:bg-muted/50"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Role / Position
                        </label>
                        <Input
                          value={experienceEditor.role}
                          onChange={(event) =>
                            setExperienceEditor((prev) => ({
                              ...prev,
                              role: event.target.value,
                            }))
                          }
                          className="mt-1"
                          placeholder="AI Engineer"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Company
                          </label>
                          <Input
                            value={experienceEditor.company}
                            onChange={(event) =>
                              setExperienceEditor((prev) => ({
                                ...prev,
                                company: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="Company / Organization"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Period
                          </label>
                          <Input
                            value={experienceEditor.period}
                            onChange={(event) =>
                              setExperienceEditor((prev) => ({
                                ...prev,
                                period: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="2024 - Present"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Type
                          </label>
                          <select
                            value={experienceEditor.type}
                            onChange={(event) =>
                              setExperienceEditor((prev) => ({
                                ...prev,
                                type: event.target.value as
                                  | "work"
                                  | "education"
                                  | "internship",
                              }))
                            }
                            className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-foreground"
                          >
                            <option value="work">Work</option>
                            <option value="internship">Internship</option>
                            <option value="education">Education</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Location
                          </label>
                          <Input
                            value={experienceEditor.location}
                            onChange={(event) =>
                              setExperienceEditor((prev) => ({
                                ...prev,
                                location: event.target.value,
                              }))
                            }
                            className="mt-1"
                            placeholder="Remote / Addis Ababa"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Description
                        </label>
                        <textarea
                          value={experienceEditor.description}
                          onChange={(event) =>
                            setExperienceEditor((prev) => ({
                              ...prev,
                              description: event.target.value,
                            }))
                          }
                          rows={3}
                          className="mt-1 w-full rounded-xl border border-border bg-background p-3 text-foreground"
                          placeholder="Short summary for this experience"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Achievements (one per line)
                        </label>
                        <textarea
                          value={experienceEditor.achievements}
                          onChange={(event) =>
                            setExperienceEditor((prev) => ({
                              ...prev,
                              achievements: event.target.value,
                            }))
                          }
                          rows={4}
                          className="mt-1 w-full rounded-xl border border-border bg-background p-3 text-foreground"
                          placeholder={"Built X feature\nImproved Y metric"}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Technologies (comma-separated)
                        </label>
                        <Input
                          value={experienceEditor.technologies}
                          onChange={(event) =>
                            setExperienceEditor((prev) => ({
                              ...prev,
                              technologies: event.target.value,
                            }))
                          }
                          className="mt-1"
                          placeholder="Python, FastAPI, React"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Status
                        </label>
                        <select
                          value={experienceEditor.status}
                          onChange={(event) =>
                            setExperienceEditor((prev) => ({
                              ...prev,
                              status: event.target
                                .value as ExperienceItem["status"],
                            }))
                          }
                          className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-foreground"
                        >
                          <option value="active">Active</option>
                          <option value="ended">Ended</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setExperienceEditorOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={saveExperienceEditor}
                        className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                      >
                        <Save className="w-4 h-4" />
                        {experienceEditorMode === "add"
                          ? "Add Experience"
                          : "Save Experience"}
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
