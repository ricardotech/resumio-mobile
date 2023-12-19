import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons from the appropriate library
import * as Progress from "react-native-progress";
import {
  primaryTextColor,
  tertiaryBackgroundColor,
} from "../../../utils/style";
import { useTheme } from "../../../contexts/theme.context";

import { useNavigation } from "@react-navigation/native";
import { authScreenProp } from "../../../routes/user.routes";

export default function JourneyCard({
  journey,
  index,
}: {
  journey: any;
  index: any;
}) {
  const { theme } = useTheme();
  const navigation = useNavigation<authScreenProp>();
  const handleOpenJourney = () => {
    navigation.navigate("JourneyContentScreen")
  }
  if (journey)
    return (
      <TouchableOpacity
      onPress={handleOpenJourney}
        style={{
          height: 150,
          width: Dimensions.get("window").width / 2 - 25,
          backgroundColor: tertiaryBackgroundColor(theme),
          borderRadius: 10,
          padding: 20,
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginRight: index % 1 === 0 ? 10 : 0,
          marginBottom: 10,
        }}
      >
        <MaterialCommunityIcons
          style={styles.icon}
          name={journey.icon}
          size={30}
          color={journey.iconColor}
        />
        <View style={styles.titleContainer}>
          <Text
            style={{
              color: primaryTextColor(theme),
              fontSize: 14,
              textAlign: "left",
            }}
          >
            {journey.title}
          </Text>
        </View>
        <Progress.Bar
          progress={journey.progress}
          width={Dimensions.get("window").width / 2 - 60}
          height={10}
          color={journey.iconColor}
          unfilledColor={journey.theme === "light" ? "#E0E0E0" : "#333"}
          borderWidth={0}
          borderRadius={10}
        />
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginLeft: 10,
  },
  titleContainer: {
    width: "100%",
  },
  title: {
    fontSize: 14,
    textAlign: "left",
  },
});
