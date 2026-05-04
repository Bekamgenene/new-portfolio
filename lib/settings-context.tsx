"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  defaultContactData,
  defaultProfileData,
  defaultSocialData,
} from "./default-portfolio-state";

interface ProfileSettings {
  name: string;
  title: string;
  bio: string;
  profileImage?: string;
  cvUrl?: string;
  cvFileName?: string;
  aboutHeading?: string;
  aboutTitle?: string;
  aboutParagraphs?: string[];
  aboutStats?: Array<{ value: string; label: string }>;
  aboutHighlights?: Array<{ title: string; description: string }>;
  skillsHeading?: string;
  skillsTitle?: string;
  skillsList?: Array<{
    id: number;
    name: string;
    level: number;
    category: string;
  }>;
  experienceHeading?: string;
  experienceTitle?: string;
  contactHeading?: string;
  contactTitle?: string;
  contactDescription?: string;
  contactMapEmbedUrl?: string;
  contactMapOpenUrl?: string;
  footerConnectTitle?: string;
  footerConnectDescription?: string;
  footerConnectButtonLabel?: string;
  articles?: Array<{
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    image?: string;
    tags: string[];
    articleUrl?: string;
    sourceUrl?: string;
    status?: "published" | "draft";
  }>;
}

interface ContactSettings {
  email: string;
  phone: string;
  location: string;
}

interface SocialSettings {
  facebook: string;
  instagram: string;
  linkedin: string;
  telegram: string;
  github: string;
}

interface SettingsContextType {
  profile: ProfileSettings;
  contact: ContactSettings;
  social: SocialSettings;
  refreshSettings: () => void;
}

const defaultProfile: ProfileSettings = defaultProfileData;

const defaultContact: ContactSettings = defaultContactData;

const defaultSocial: SocialSettings = defaultSocialData;

const SettingsContext = createContext<SettingsContextType>({
  profile: defaultProfile,
  contact: defaultContact,
  social: defaultSocial,
  refreshSettings: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileSettings>(defaultProfile);
  const [contact, setContact] = useState<ContactSettings>(defaultContact);
  const [social, setSocial] = useState<SocialSettings>(defaultSocial);

  const loadSettings = async () => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const response = await fetch("/api/portfolio-state", {
        cache: "no-store",
      });

      if (response.ok) {
        const data = (await response.json()) as {
          profile?: Partial<ProfileSettings>;
          contact?: Partial<ContactSettings>;
          social?: Partial<SocialSettings>;
        };

        const hasCloudProfile =
          !!data.profile && Object.keys(data.profile).length > 0;
        const hasCloudContact =
          !!data.contact && Object.keys(data.contact).length > 0;
        const hasCloudSocial =
          !!data.social && Object.keys(data.social).length > 0;

        if (hasCloudProfile || hasCloudContact || hasCloudSocial) {
          if (hasCloudProfile)
            setProfile({ ...defaultProfile, ...data.profile });
          if (hasCloudContact)
            setContact({ ...defaultContact, ...data.contact });
          if (hasCloudSocial) setSocial({ ...defaultSocial, ...data.social });
          return;
        }

        setProfile(defaultProfile);
        setContact(defaultContact);
        setSocial(defaultSocial);
        return;
      }
    } catch {
      setProfile(defaultProfile);
      setContact(defaultContact);
      setSocial(defaultSocial);
      return;
    }

    const savedProfile = localStorage.getItem("portfolio_profile");
    const savedContact = localStorage.getItem("portfolio_contact");
    const savedSocial = localStorage.getItem("portfolio_social");

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile({ ...defaultProfile, ...parsed });
    }
    if (savedContact) setContact(JSON.parse(savedContact));
    if (savedSocial) setSocial(JSON.parse(savedSocial));
  };

  useEffect(() => {
    void loadSettings();

    // Listen for storage changes (when settings are updated in admin)
    const handleStorageChange = () => {
      void loadSettings();
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for same-tab updates
    window.addEventListener("settingsUpdated", handleStorageChange);
    window.addEventListener("portfolioStateUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("settingsUpdated", handleStorageChange);
      window.removeEventListener("portfolioStateUpdated", handleStorageChange);
    };
  }, []);

  const refreshSettings = () => {
    void loadSettings();
  };

  return (
    <SettingsContext.Provider
      value={{ profile, contact, social, refreshSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
