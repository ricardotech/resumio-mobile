import React from "react";

import { View, Text, ActivityIndicator } from "react-native";
import { primaryBackgroundColor, primaryTextColor } from "../../utils/style";
import { useTheme } from "../../contexts/theme.context";
import { StatusBar } from "expo-status-bar";

export default function Loading() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: primaryBackgroundColor(theme),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar style={theme === "dark" ? "dark" : "light"} />
      <ActivityIndicator color={primaryTextColor(theme)} size="large" />
    </View>
  );
}
