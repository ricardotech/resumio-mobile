import React from "react";

import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import GenesisThumbnail from "../../../../assets/thumbnails/genesis2.png";
import ExodusThumbnail from "../../../../assets/thumbnails/exodo2.png";
import LeviticusThumbnail from "../../../../assets/thumbnails/leviticus2.png";
import { ContentLabel } from "../../../../components/ContentLabel";
import { Book } from "../../../../utils/types";

export default function BookReading({ book }: { book: Book }) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10
      }}
    >
      <TouchableOpacity
        style={{
          width: "100%",
          borderRadius: 10,
          display: "flex",
          flexDirection: "row",
          padding: 10,
          backgroundColor: "#FFF"
        }}
      >
        <Image
          source={book.imageBg}
          style={{
            height: 50,
            width: "15%",
            borderRadius: 10,
          }}
        />
        <View
          style={{
            marginLeft: 10,
            width: "70%",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 22,
              fontWeight: "900",
            }}
          >
            Continuar lendo
          </Text>
          <Text
            style={{
              color: "#444",
              fontSize: 16,
            }}
          >
            {book.title}
          </Text>
        </View>
        <View
          style={{
            width: "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="book" color="#333" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
