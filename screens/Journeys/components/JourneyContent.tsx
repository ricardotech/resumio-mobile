import { View, Text, TouchableOpacity } from "react-native";
import { ContentLabel } from "../../../components/ContentLabel";
import { authScreenProp } from "../../../routes/user.routes";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  primaryBackgroundColor,
  primaryTextColor,
  secondaryBackgroundColor,
  tertiaryBackgroundColor,
} from "../../../utils/style";
import { useTheme } from "../../../contexts/theme.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { books, booksData } from "../../../db";
import { useService } from "../../../contexts/service.context";
import { fetchData } from "../../../utils/services";
import { useEffect, useState } from "react";
import { ProgressChapter } from "../../../firestore/models/Progress";

const JourneyContentScreen = () => {
  const navigation = useNavigation<authScreenProp>();
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ContentLabel theme={theme} title="Bíblia" />
        </View>
      </View>
    );
  };

  const Content = () => {
    const { userChaptersProgress } = useService();



    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "90%",
          alignSelf: "center",
        }}
      >
        {userChaptersProgress &&
          books.map((book, index) => {

            const isBookRead = (book: any) => {
              const totalChapters = booksData[index].chapters;
              const readChapters = userChaptersProgress.filter(
                (progress) => progress.book === book
              );
              return readChapters.length === totalChapters;
            };

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Book", {
                    book: book,
                  });
                }}
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: 60,
                  borderRadius: 12,
                  justifyContent: "space-between",
                  padding: 20,
                  backgroundColor: tertiaryBackgroundColor(theme),
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: primaryTextColor(theme),
                  }}
                >
                  {book}
                </Text>
                {isBookRead(book) && (
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: primaryTextColor(theme),
                    }}
                  >
                    ✅
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        <View
          style={{
            height: 40,
          }}
        />
      </ScrollView>
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
        <Content />
      </SafeAreaView>
    </View>
  );
};

export default JourneyContentScreen;
