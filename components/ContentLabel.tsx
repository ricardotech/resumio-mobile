import React from "react";

import { Text, View } from "react-native";

export function ContentLabel({
  theme,
  size = "lg",
  bold = true,
  title,
  description,
}: {
  theme: "light" | "dark";
  bold?: boolean;
  size?: "sm" | "lg";
  title?: string;
  description?: string;
}) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      {title && (
        <Text
          style={{
            color: theme === "dark" ? "#FFF" : "#000",
            fontSize: size === "sm" ? 30 / 1.2 : 30,
            fontWeight: bold ? "900" : "normal",
            textAlign: "left",
          }}
        >
          {title}
        </Text>
      )}
      {description && (
        <Text
          style={{
            marginTop: 5,
            color: theme === "dark" ? "#EEE" : "#333",
            fontSize: 16,
            textAlign: "left",
          }}
        >
          {description}
        </Text>
      )}
    </View>
  );
}
