import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import JourneyCard from "./components/JourneyCard";
import { primaryBackgroundColor, primaryTextColor } from "../../utils/style";
import { useTheme } from "../../contexts/theme.context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { authScreenProp } from "../../routes/user.routes";

export default function JourneyCollectionScreen({ route }: { route: any }) {
  const navigation = useNavigation<authScreenProp>();

  const { journeys, id, name, description } = route.params; // Assuming you pass the journeys data as a param

  const { theme } = useTheme();

  // Function to render each item in the FlatList
  const renderItem = ({ item, index }: { item: any; index: any }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* Render two Journey cards per row */}
        <JourneyCard journey={item[0]} index={index} />
        <JourneyCard journey={item[1]} index={index + 1} />
      </View>
    );
  };

  // Calculate the data source for the FlatList to display two items per row
  const data = [];
  for (let i = 0; i < journeys.length; i += 2) {
    const row = [journeys[i], journeys[i + 1]];
    data.push(row);
  }

  return (
    <View
      style={{
        backgroundColor: primaryBackgroundColor(theme),
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <SafeAreaView>
          <View
            style={{
              paddingHorizontal: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.removeListener;
                navigation.goBack();
              }}
            >
              <Ionicons
                size={30}
                name="chevron-back"
                color={primaryTextColor(theme)}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 24,
                fontWeight: "bold",
                width: "90%",
                color: primaryTextColor(theme),
              }}
            >
              {name}
            </Text>
          </View>
        </SafeAreaView>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 160,
        }}
      />
    </View>
  );
}
