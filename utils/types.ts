import { MaterialCommunityIcons } from "@expo/vector-icons";

export type Book = {
  id: number;
  title: string;
  description: string;
  imageBg: any;
};

export type Theme = "light" | "dark";

export type Journey = {
  id: string;
  collectionId: string;
  title: string;
  description: string;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconColor?: string;
  progress?: number;
  startedAt?: Date;
  completedAt?: Date;
};

export type JourneyCollection = {
  id: string;
  name: string;
  description: string;
  journeys: Journey[];
};

export type Statistic = {
  key: string;
  value: number;
  label: string;
  emoji: string;
};