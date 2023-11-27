import React from "react";

import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import GenesisThumbnail from "../../../../assets/thumbnails/genesis2.png";
import ExodusThumbnail from "../../../../assets/thumbnails/exodo2.png";
import LeviticusThumbnail from "../../../../assets/thumbnails/leviticus2.png";
import { ContentLabel } from "../../../../components/ContentLabel";

import { genesis, exodus } from "../../../../db";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "../../../../App";

export default function Books() {
  type authScreenProp = StackNavigationProp<StackNavigatorParams, "Tab">;

  const navigation = useNavigation<authScreenProp>();

  const starterPack = [
    {
      name: "Gênesis",
      description: "Origem do mundo e humanidade",
      chapters: 50,
      imageBg: GenesisThumbnail,
      content: genesis,
    },
    {
      name: "Êxodo",
      description: "Libertação de Israel do Egito",
      chapters: 40,
      imageBg: ExodusThumbnail,
      content: exodus,
    },
    {
      name: "Levítico",
      description: "Leis e rituais de Israel",
      chapters: 27,
      imageBg: LeviticusThumbnail,
    },
  ];

  const Book = ({
    name,
    description,
    chapters,
    imageBg,
    content,
  }: {
    name: string;
    description: string;
    chapters: number;
    imageBg: any;
    content?: {
      title: string;
      resume: string;
    };
  }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Book", {
            id: 1,
            name: name,
            resume: content?.resume,
            title: content?.title,
          });
        }}
      >
        <ImageBackground
          imageStyle={{
            borderRadius: 10,
          }}
          source={imageBg}
          style={{
            height: 350,
            width: 250,
            marginRight: 15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View />
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              width: "100%",
              height: 80,
              display: "flex",
              padding: 20,
              justifyContent: "center",
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: "#FFF",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {description}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    );
  };

  const BookList = ({
    books,
  }: {
    books: {
      name: string;
      description: string;
      chapters: number;
      imageBg: any;
      content?: {
        title: string;
        resume: string;
      };
    }[];
  }) => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
        }}
      >
        {books.map((book, i) => {
          return (
            <Book
              key={i}
              chapters={book.chapters}
              name={book.name}
              description={book.description}
              imageBg={book.imageBg}
              content={book.content}
            />
          );
        })}
        <View
          style={{
            width: 30,
          }}
        />
      </ScrollView>
    );
  };

  return (
    <>
      {/* <ContentLabel
        title="Books"
        description="Enjoy the Bible in a new way, exploring all you can about each book of the Bible."
      /> */}
      <BookList books={starterPack} />
    </>
  );
}
