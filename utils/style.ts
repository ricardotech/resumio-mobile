import { Theme } from "./types";

export const primaryTextColor = (theme: Theme): string => {
  return theme === "light" ? "#000" : "#FFF";
};

export const secondaryTextColor = (theme: Theme): string => {
  return theme === "light" ? "#FFF" : "#000";
};

export const primaryBackgroundColor = (theme: Theme): string => {
  return theme === "light" ? "#F6F6F6" : "#000";
};

export const secondaryBackgroundColor = (theme: Theme): string => {
  return theme === "light" ? "#000" : "#F6F6F6";
};