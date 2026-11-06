import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

export interface SpotifyLink {
  id: string;
  title: string;
  description: string;
  url: string;
  embedUrl: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  filename: string;
  uploadedAt: string;
}

export interface TeamInfo {
  coordinator: {
    name: string;
    title: string;
    bio: string;
    photo: string;
  };
}

export interface ContentData {
  spotify: SpotifyLink[];
  resources: Resource[];
  team: TeamInfo;
}

export function readContent(): ContentData {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {
      spotify: [],
      resources: [],
      team: {
        coordinator: {
          name: "Jeremiah E. Chukwuike",
          title: "Coordinator",
          bio: "Kingdom builder and youth advocate.",
          photo: "/logo/founder.jpeg",
        },
      },
    };
  }
}

export function writeContent(data: ContentData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
