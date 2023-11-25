import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { primaryTextColor, secondaryTextColor } from "../../utils/style";
import { useTheme } from "../../contexts/theme.context";

type Statistic = {
  key: string;
  value: number;
  label: string;
  emoji: string;
};

const statistics: Statistic[] = [
  {
    key: "challenges",
    value: 127,
    label: "Challenges",
    emoji: "🏆",
  },
  {
    key: "lessons",
    value: 458,
    label: "Lessons Passed",
    emoji: "📚",
  },
  {
    key: "xp",
    value: 1234,
    label: "XP",
    emoji: "🎉",
  },
  {
    key: "streak",
    value: 3,
    label: "Streak",
    emoji: "🔥",
  },
  {
    key: "rank",
    value: 1,
    label: "Rank",
    emoji: "🥇",
  },
  {
    key: "journeys",
    value: 3,
    label: "Journeys",
    emoji: "🌎",
  },
  {
    key: "prayers",
    value: 3,
    label: "Prayers",
    emoji: "🙏",
  },
  {
    key: "groups",
    value: 3,
    label: "Groups",
    emoji: "👥",
  },
  {
    key: "books",
    value: 3,
    label: "Books",
    emoji: "📖",
  },
  {
    key: "chapters",
    value: 3,
    label: "Chapters",
    emoji: "📖",
  },
  {
    key: "verses",
    value: 3,
    label: "Verses",
    emoji: "📖",
  },
  {
    key: "words",
    value: 3,
    label: "Words",
    emoji: "📖",
  },
  {
    key: "characters",
    value: 3,
    label: "Characters",
    emoji: "📖",
  },
];

export default function StatisticsCard() {
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: Statistic }) => {
    // let IconComponent: any = MaterialCommunityIcons; // Default icon set

    // Determine which icon set to use
    // switch (item.iconType) {
    //   case "FontAwesome5":
    //     IconComponent = FontAwesome5;
    //     break;
    //   case "Material":
    //     IconComponent = MaterialIcons;
    //     break;
    //   case "Ionicons":
    //     IconComponent = Ionicons;
    //     break;
    // }

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: theme === "dark" ? "#333" : "#DDD",
          borderRadius: 10,
          padding: 10,
          paddingBottom: 20,
          marginBottom: 10,
          marginLeft: 10,
          width: Dimensions.get("window").width / 2 - 20,
          alignItems: "flex-start",
        }}
      >
        <Text style={{
          fontSize: 30,
          marginRight: 10
        }}>{item.emoji}</Text>
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              color: secondaryTextColor(theme), // Replace with actual color code
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            {item.value}
          </Text>
          <Text
            style={{
              color: secondaryTextColor(theme),
              fontSize: 16,
              marginTop: 4,
            }}
          >
            {item.label}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={statistics}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      numColumns={2} // Two items per row
      style={{
        paddingLeft: 5
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  value: {
    color: "#fff", // Replace with actual color code
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  label: {
    color: "#fff", // Replace with actual color code
    fontSize: 16,
    marginTop: 4,
  },
});
