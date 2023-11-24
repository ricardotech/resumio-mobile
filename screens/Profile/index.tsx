import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { useAuth } from "../../contexts/auth.context";
import { ContentLabel } from "../../components/ContentLabel";

export default function ProfileScreen() {
  const { user } = useAuth();

  const Header = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={{
            uri: user?.thumbnail || "https://i.imgur.com/An9ltF8.png",
          }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 10,
          }}
        />

        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 22,
              fontWeight: "900",
              textAlign: "left",
            }}
          >
            {user?.name || "Usuário"}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: "#444",
              fontSize: 14,
              textAlign: "left",
            }}
          >
            {user?.email || "Email"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <SafeAreaView>
        <ContentLabel 
            title="Profile"
            description="These are your data"
        />
      </SafeAreaView>
    </View>
  );
}
