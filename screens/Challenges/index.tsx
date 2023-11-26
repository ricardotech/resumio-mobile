import React from "react";

import { View } from "react-native";
import { primaryBackgroundColor } from "../../utils/style";
import { useTheme } from "../../contexts/theme.context";

export default function Challenges() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: primaryBackgroundColor(theme),
      }}
    ></View>
  );
}
