import React from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Books from "./components/Books";
import { ContentLabel } from "../../components/ContentLabel";
import { useAuth } from "../../contexts/auth.context";
import { Ionicons } from "@expo/vector-icons";
import Journeys from "./components/Journeys";
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
import { StatusBar } from "expo-status-bar";
import { authScreenProp } from "../../routes/user.routes";
import { useService } from "../../contexts/service.context";

export default function HomeScreen() {
  const navigation = useNavigation<authScreenProp>();

  const { user } = useAuth();
  const { userChaptersProgress } = useService();
  const { theme, changeTheme } = useTheme();

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
        <ContentLabel theme={theme} title="Início" />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              marginLeft: 15,
            }}
          >
            <Ionicons
              name="ios-notifications-outline"
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
        >
          <Books />
        </View>
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
        >
          <Journeys />
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
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <SafeAreaView>
        <Header />
        <ScrollView>
          <DailyPray />
          <Text
            style={{
              margin: 20,
              color: "#FFF",
            }}
          >
            userChaptersProgress ✅
          </Text>
          <View
            style={{
              height: 70,
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
