import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import * as Progress from "react-native-progress";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ContentLabel } from "../../components/ContentLabel";
import { useTheme } from "../../contexts/theme.context";
import { authScreenProp } from "../../App";
import {
  primaryBackgroundColor,
  primaryTextColor,
  secondaryBackgroundColor,
  secondaryTextColor,
} from "../../utils/style";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation<authScreenProp>();

  const { theme } = useTheme();

  const Header = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 20,
          paddingBottom: 15,
        }}
      >
        <ContentLabel theme={theme} title="Jornadas" />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <TouchableOpacity
            onPress={() => {
              navigation.removeListener;
              navigation.navigate("Settings");
            }}
            style={{
              marginLeft: 10,
            }}
          >
            <Ionicons
              name="ios-settings-outline"
              color={primaryTextColor(theme)}
              size={30}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: primaryBackgroundColor(theme),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <SafeAreaView>
        <Header />
        <ScrollView
          style={{
            backgroundColor: primaryBackgroundColor(theme),
            marginTop: 10,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#6448FE",
                borderRadius: 20,
                padding: 10,
                width: Dimensions.get("window").width / 2 - 25,
                marginRight: 10,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Todas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme === "light" ? "#E0E0E0" : "#111",
                borderRadius: 20,
                padding: 10,
                width: Dimensions.get("window").width / 2 - 25,
              }}
            >
              <Text style={{ color: primaryTextColor(theme), fontSize: 16 }}>
                Minhas
              </Text>
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
            <Text style={{ color: primaryTextColor(theme), fontSize: 20 }}>
              Daily Missions
            </Text>
            <TouchableOpacity>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={primaryTextColor(theme)}
              />
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
      </SafeAreaView>
    </View>
  );
};

export default JourneysScreen;
