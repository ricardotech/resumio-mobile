import React, { useState } from "react";
import { Image } from "expo-image";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContentLabel } from "../../components/ContentLabel";
import { useAuth } from "../../contexts/auth.context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/theme.context";
import { primaryTextColor, primaryBackgroundColor } from "../../utils/style";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { authScreenProp } from "../../routes/user.routes";
import { Statistic } from "../../utils/types";
import { useService } from "../../contexts/service.context";

export default function HomeScreen() {
  const navigation = useNavigation<authScreenProp>();

  const { user } = useAuth();
  const { userChaptersProgress } = useService();
  const { theme, changeTheme } = useTheme();

  const statistics: Statistic[] = [
    {
      key: "Quantidade de capítulos lidos",
      value: userChaptersProgress?.length || 0,
      label: "Capítulos",
      emoji: "🏆",
    },
  ];

  const renderStatisticItem = ({ item }: { item: Statistic }) => {
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
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginTop: 10,
            fontSize: 30,
          }}
        >
          {item.emoji}
        </Text>
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              color: primaryTextColor(theme), // Replace with actual color code
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            {item.value}
          </Text>
          <Text
            style={{
              color: primaryTextColor(theme),
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
        <ContentLabel theme={theme} title="Perfil" />
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
              name="ios-settings-outline"
              color={primaryTextColor(theme)}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Experience = () => {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            color: primaryTextColor(theme),
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Your Achievements
        </Text>

        {/* Achievement Items */}
        {/* This should be mapped from data ideally */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "center",
          }}
        >
          <View
            style={
              Platform.OS === "ios"
                ? {
                    marginRight: 15,
                    marginTop: 3,
                  }
                : {
                    marginRight: 15,
                    marginTop: 15,
                  }
            }
          >
            <Image
              cachePolicy="memory-disk"
              contentFit="cover"
              transition={1000}
              source={user?.picture || require("../../assets/default.jpg")}
              style={{ width: 60, height: 60, borderRadius: 50 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: primaryTextColor(theme),
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Great King
            </Text>
            <Text style={{ color: primaryTextColor(theme), fontSize: 14 }}>
              Get 5000 XP in this month to get achievements.
            </Text>
            {/* Progress Bar */}
            <View
              style={{
                height: 20,
                backgroundColor: "#333333",
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  width: "75%",
                  height: "100%",
                  backgroundColor: "#4C9A2A",
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
        </View>
        {/* Repeat for other achievements... */}
      </View>
    );
  };

  const Statistics = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 20,
        }}
      >
        <View>
          <Text
            style={{
              color: primaryTextColor(theme),
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            1,536
          </Text>
          <Text
            style={{
              color: primaryTextColor(theme),
              fontSize: 16,
              textAlign: "center",
            }}
          >
            followers
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: primaryTextColor(theme),
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            195
          </Text>
          <Text
            style={{
              color: primaryTextColor(theme),
              fontSize: 16,
              textAlign: "center",
            }}
          >
            following
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: primaryTextColor(theme),
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            15,274
          </Text>
          <Text
            style={{
              color: primaryTextColor(theme),
              fontSize: 16,
              textAlign: "center",
            }}
          >
            lifetime XP
          </Text>
        </View>
      </View>
    );
  };

  const Profile = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={user?.picture || require("../../assets/default.jpg")}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text
          style={{
            color: primaryTextColor(theme),
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {user?.name}
        </Text>
        <Text
          style={{
            color: primaryTextColor(theme),
            fontSize: 16,
            marginTop: 5,
          }}
        >
          Joined since 20 June 2020
        </Text>
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

        <FlatList
          ListFooterComponent={
            <View
              style={{
                height: 60,
              }}
            />
          }
          ListHeaderComponent={
            <>
              <Profile />

              <View
                style={{
                  paddingTop: 20,
                }}
              />
            </>
          }
          data={statistics}
          renderItem={renderStatisticItem}
          keyExtractor={(item) => item.key}
          numColumns={2} // Two items per row
          style={{
            paddingLeft: 5,
          }}
        />
      </SafeAreaView>
    </View>
  );
}
