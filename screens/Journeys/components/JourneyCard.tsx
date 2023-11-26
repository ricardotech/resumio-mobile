import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons from the appropriate library
import * as Progress from "react-native-progress";

export default function JourneyCard({
  journey,
  index,
}: {
  journey: any;
  index: any;
}) {
  if (journey)
    return (
      <View
        style={[
          styles.cardContainer,
          { marginRight: index % 1 === 0 ? 10 : 0,
          marginBottom: 10
          },
           // Add marginRight for even-indexed cards
        ]}
      >
          <MaterialCommunityIcons
            style={styles.icon}
            name={journey.icon}
            size={30}
            color={journey.iconColor}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{journey.title}</Text>
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
      </View>
    );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    width: Dimensions.get("window").width / 2 - 25,
    backgroundColor: "#FFF", // Set your desired background color
    borderRadius: 10,
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
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
