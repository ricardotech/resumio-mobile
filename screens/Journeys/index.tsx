import React, { useState } from "react";
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
import { allCollections } from "../../db";

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
          <TouchableOpacity
            onPress={() => {
              navigation.removeListener;
              navigation.navigate("Settings");
            }}
            style={{
              marginLeft: 10,
            }}
          >
            <Ionicons
              name="ios-search-outline"
              color={primaryTextColor(theme)}
              size={30}
            />
          </TouchableOpacity>
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
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 20,
              paddingHorizontal: 20,
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
                Favoritas
              </Text>
            </TouchableOpacity>
          </View>

          {allCollections.map((collection, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                    marginTop: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={{ color: primaryTextColor(theme), fontSize: 20 }}
                  >
                    {collection.name}
                  </Text>
                  <TouchableOpacity>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color={primaryTextColor(theme)}
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  style={{
                    paddingLeft: 20,
                  }}
                >
                  {collection.journeys.map((journey, index) => {
                    if (Number(journey.progress) < 1)
                      return (
                        <View
                          key={index}
                          style={{
                            marginRight: 10,
                            width: 220,
                            backgroundColor: secondaryBackgroundColor(theme),
                            borderRadius: 10,
                            marginBottom: 10,
                            padding: 20,
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginBottom: 20,
                            }}
                          >
                            <MaterialCommunityIcons
                              style={{
                                marginLeft: 10,
                              }}
                              name={journey.icon}
                              size={30}
                              color={journey.iconColor}
                            />
                            <View style={{ marginLeft: 20, width: "75%" }}>
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
                          </View>
                          <Progress.Bar
                            progress={journey.progress}
                            width={180}
                            height={10}
                            color="#4fc3f7"
                            unfilledColor={
                              theme === "light" ? "#E0E0E0" : "#333"
                            }
                            borderWidth={0}
                            borderRadius={10}
                          />
                        </View>
                      );
                  })}
                  <View
                    style={{
                      width: 30,
                    }}
                  />
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default JourneysScreen;
