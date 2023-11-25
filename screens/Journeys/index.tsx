import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const missions: {
  title: string;
  progress: number;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconColor: string;
}[] = [
  {
    title: "Get 25 Diamonds",
    progress: 0.48,
    icon: "diamond-stone",
    iconColor: "#4fc3f7",
  },
  { title: "Get 40 XP", progress: 0.6, icon: "flash", iconColor: "#ffa726" },
  {
    title: "Get 2 perfect lessons",
    progress: 0,
    icon: "target",
    iconColor: "#e57373",
  },
  {
    title: "Complete 1 challenge",
    progress: 1,
    icon: "fire",
    iconColor: "#ffeb3b",
  },
];

const JourneysScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000", padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>Challenge</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "#6448FE", borderRadius: 20, padding: 10 }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Target</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "transparent",
            borderRadius: 20,
            padding: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Badges</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>Daily Missions</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {missions.map((mission, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "#1c1c1e",
            borderRadius: 10,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <MaterialCommunityIcons
            name={mission.icon}
            size={24}
            color={mission.iconColor}
            style={{ marginRight: 8 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#fff", fontSize: 16, marginBottom: 4 }}>
              {mission.title}
            </Text>
            <Progress.Bar
              progress={mission.progress}
              width={null}
              color={mission.iconColor}
              unfilledColor="rgba(255,255,255,0.5)"
              borderWidth={0}
              borderRadius={5}
              style={{ height: 10 }}
            />
          </View>
          <Text style={{ color: "#fff", marginLeft: 8 }}>
            {Math.floor(mission.progress * 100)}%
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default JourneysScreen;
