// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
// } from "react-native";
// import { useTheme } from "../../contexts/theme.context";
// import { primaryBackgroundColor, primaryTextColor } from "../../utils/style";
// import { Ionicons } from "@expo/vector-icons";
// import { ContentLabel } from "../../components/ContentLabel";
// import { authScreenProp } from "../../App";
// import { useNavigation } from "@react-navigation/native";

// const UserProfileScreen = () => {
//   const navigation = useNavigation<authScreenProp>();

//   const { theme } = useTheme();

//   const Header = () => {
//     return (
//       <View
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           paddingRight: 20,
//           paddingBottom: 15,
//         }}
//       >
//         <ContentLabel theme={theme} title="Início" />
//         <View
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               marginLeft: 15,
//             }}
//           >
//             <Ionicons
//               name="ios-notifications-outline"
//               color={primaryTextColor(theme)}
//               size={30}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.removeListener;
//               navigation.navigate("Settings");
//             }}
//             style={{
//               marginLeft: 10,
//             }}
//           >
//             <Ionicons
//               name="ios-settings-outline"
//               color={primaryTextColor(theme)}
//               size={30}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <ScrollView
//       style={{ flex: 1, backgroundColor: primaryBackgroundColor(theme) }}
//     >
//       <SafeAreaView>
//         <Header />

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             padding: 20,
//           }}
//         >
//           <Image
//             source={require("../../assets/icon.png")}
//             style={{ width: 25, height: 25 }}
//           />
//           <Image
//             source={require("../../assets/icon.png")}
//             style={{ width: 25, height: 25 }}
//           />
//         </View>

//         {/* Profile Section */}
//         <View style={{ alignItems: "center", marginVertical: 20 }}>
//           <Image
//             source={require("../../assets/icon.png")}
//             style={{ width: 100, height: 100, borderRadius: 50 }}
//           />
//           <Text
//             style={{
//               color: primaryTextColor(theme),
//               fontSize: 24,
//               fontWeight: "bold",
//               marginTop: 10,
//             }}
//           >
//             Andrew Ainsley
//           </Text>
//           <Text
//             style={{
//               color: primaryTextColor(theme),
//               fontSize: 16,
//               marginTop: 5,
//             }}
//           >
//             Joined since 20 June 2020
//           </Text>
//         </View>

//         {/* Statistics Section */}
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-around",
//             paddingVertical: 20,
//           }}
//         >
//           <View>
//             <Text
//               style={{
//                 color: primaryTextColor(theme),
//                 fontSize: 20,
//                 fontWeight: "bold",
//                 textAlign: "center",
//               }}
//             >
//               1,536
//             </Text>
//             <Text
//               style={{
//                 color: primaryTextColor(theme),
//                 fontSize: 16,
//                 textAlign: "center",
//               }}
//             >
//               followers
//             </Text>
//           </View>
//           <View>
//             <Text
//               style={{
//                 color: primaryTextColor(theme),
//                 fontSize: 20,
//                 fontWeight: "bold",
//                 textAlign: "center",
//               }}
//             >
//               195
//             </Text>
//             <Text
//               style={{
//                 color: primaryTextColor(theme),
//                 fontSize: 16,
//                 textAlign: "center",
//               }}
//             >
//               following
//             </Text>
//           </View>
//           <View>
//             <Text
//               style={{
//                 color: primaryTextColor(theme),
//                 fontSize: 20,
//                 fontWeight: "bold",
//                 textAlign: "center",
//               }}
//             >
//               15,274
//             </Text>
//             <Text
//               style={{
//                 color: primaryTextColor(theme),
//                 fontSize: 16,
//                 textAlign: "center",
//               }}
//             >
//               lifetime XP
//             </Text>
//           </View>
//         </View>

//         {/* XP and Achievements Section */}
//         <View style={{ paddingHorizontal: 20 }}>
//           <Text
//             style={{
//               color: primaryTextColor(theme),
//               fontSize: 22,
//               fontWeight: "bold",
//               marginBottom: 20,
//             }}
//           >
//             Your Achievements
//           </Text>

//           {/* Achievement Items */}
//           {/* This should be mapped from data ideally */}
//           <View style={{ flexDirection: "row", marginBottom: 20 }}>
//             <View style={{ marginRight: 15 }}>
//               <Image
//                 source={require("../../assets/icon.png")}
//                 style={{ width: 50, height: 50 }}
//               />
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text
//                 style={{
//                   color: primaryTextColor(theme),
//                   fontSize: 18,
//                   fontWeight: "bold",
//                 }}
//               >
//                 Great King
//               </Text>
//               <Text style={{ color: primaryTextColor(theme), fontSize: 14 }}>
//                 Get 5000 XP in this month to get achievements.
//               </Text>
//               {/* Progress Bar */}
//               <View
//                 style={{
//                   height: 20,
//                   backgroundColor: "#333333",
//                   borderRadius: 10,
//                   marginTop: 10,
//                 }}
//               >
//                 <View
//                   style={{
//                     width: "75%",
//                     height: "100%",
//                     backgroundColor: "#4C9A2A",
//                     borderRadius: 10,
//                   }}
//                 />
//               </View>
//             </View>
//           </View>
//           {/* Repeat for other achievements... */}
//         </View>
//       </SafeAreaView>
//     </ScrollView>
//   );
// };

// export default UserProfileScreen;
import React from "react";
import { Image } from "expo-image";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContentLabel } from "../../components/ContentLabel";
import { useAuth } from "../../contexts/auth.context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/theme.context";
import { Button } from "../../components/Button";
import { Theme } from "../../utils/types";
import {
  primaryTextColor,
  primaryBackgroundColor,
  secondaryBackgroundColor,
  secondaryTextColor,
} from "../../utils/style";
import { useNavigation } from "@react-navigation/native";
import { authScreenProp } from "../../App";

export default function HomeScreen() {
  const navigation = useNavigation<authScreenProp>();

  const { user } = useAuth();
  const { theme, changeTheme } = useTheme();

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
      label: "Lessons",
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
          alignItems: "flex-start",
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
            marginLeft: 20,
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

  const DailyPray = () => {
    return (
      <View
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "#009cb8",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons size={20} name="ios-chatbox" color="#FFF" />

              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#FFF",
                }}
              >
                Oração de hoje
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#FFF",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                  paddingHorizontal: 7,
                  marginLeft: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#009cb8",
                  }}
                >
                  3 min
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              color: "#FFF",
            }}
          >
            A oração de hoje diz que devemos ser gratos por tudo que temos e por
            tudo que somos.
          </Text>
          <TouchableOpacity
            style={{
              height: 45,
              width: "100%",
              backgroundColor: "#FFF",
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#009cb8",
              }}
            >
              Fazer oração
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ScripturesResumes = () => {
    return (
      <View
        style={{
          marginTop: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <ContentLabel theme={theme} title="O que diz as escrituras?" />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        ></View>
      </View>
    );
  };

  const MyJourneys = () => {
    return (
      <View
        style={{
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <ContentLabel
          theme={theme}
          size="sm"
          title="Suas jornadas"
          description="Continue de onde parou"
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        ></View>
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
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View style={{ marginRight: 15 }}>
            <Image
              cachePolicy="memory-disk"
              contentFit="cover"
              transition={1000}
              source={{
                uri: "https://github.com/ricardotech.png",
              }}
              style={{ width: 50, height: 50 }}
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
          contentFit="cover"
          cachePolicy="memory-disk"
          source={{
            uri: "https://github.com/ricardotech.png",
          }}
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

              <Statistics />

              <Experience />
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
