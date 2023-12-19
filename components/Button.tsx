import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

export function Button({
  title,
  onPress,
  bgColor = "#FFF",
  color = "#000",
}: {
  title: string;
  onPress: () => void;
  bgColor?: string;
  color?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bgColor,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: color,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
