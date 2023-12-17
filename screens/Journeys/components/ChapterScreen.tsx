import { View, Text, TouchableOpacity } from "react-native";
import { ContentLabel } from "../../../components/ContentLabel";
import { authScreenProp } from "../../../routes/user.routes";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { primaryTextColor } from "../../../utils/style";
import { useTheme } from "../../../contexts/theme.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchData } from "../../../utils/services";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../../contexts/auth.context";
import { useService } from "../../../contexts/service.context";
import { books } from "../../../db";

const ChapterScreen = ({ route }: { route: any }) => {
  const { theme, changeTheme } = useTheme();
  const { user } = useAuth();
  const { addProgress } = useService();

  const navigation = useNavigation<authScreenProp>();

  const { id, name, title, resume, book } = route.params;

  const bookId = books.findIndex((b) => b === book);

  const [data, setData] = React.useState<{
    chapter: string[];
    chapternumber: number;
  } | null>(null);

  useEffect(() => {
    fetchChapterData();
  }, [id]);

  const fetchChapterData = () => {
    fetchData(book, id)
      .then((data: any) => {
        setData(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return data;
  };

  const chapterWithVerses = () => {
    const chapter = data?.chapter;
    const chapterWithVerses = chapter?.map((item: string, index: number) => {
      return (
        <View
          key={index}
          style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}
        >
          <Text
            style={{
              color: theme === "light" ? "#252323" : "#686868",
              fontSize: 24,
              letterSpacing: 1,
              textAlign: "justify",
            }}
          >
            {`${index + 1}. `}
            <Text
              style={{
                color: theme === "light" ? "#000" : "#FFF",
                fontSize: 20,
                letterSpacing: 1,
                textAlign: "justify",
              }}
            >
              {item}
            </Text>
          </Text>
        </View>
      );
    });
    return chapterWithVerses;
  };

  const Header = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 20,
          paddingBottom: 5,
        }}
      >
        <View
          style={{
            marginTop: -20,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 10,
          }}
        >
          <Text
            style={{
              color: theme === "light" ? "#000" : "#EEE",
              fontSize: 16,
              marginLeft: 30,
              alignSelf: "flex-start",
            }}
          >
            {book}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.removeListener;
              navigation.goBack();
            }}
          >
            <Ionicons
              name="ios-close"
              color={primaryTextColor(theme)}
              size={26}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                color: theme === "light" ? "#000" : "#FFF",
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Capítulo {id}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const Content = () => {
    return (
      <SafeAreaView
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingBottom: 0,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          indicatorStyle={theme === "light" ? "black" : "white"}
          style={{
            backgroundColor: theme === "light" ? "#EEE" : "#292929",
            borderRadius: 30,
            paddingTop: 20,
            marginTop: -30,
            paddingHorizontal: 20,
            paddingBottom: 60,
          }}
        >
          <View
            style={{
              marginBottom: 40,
              flexShrink: 1,
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {chapterWithVerses()}
          </View>
          {/* {id > 1 ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChapterPage", {
                  id: id - 1,
                  name: `Capítulo ${id}`,
                  title: `Capítulo ${id}`,
                  resume: `Capítulo ${id}`,
                  book: book,
                });
              }}
              style={{
                padding: 20,
                marginTop: -40,
                marginBottom: 40,
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                style={{
                  marginLeft: -10,
                  marginRight: 10,
                }}
                name="arrow-back"
                size={20}
                color={theme === "light" ? "#000" : "#FFF"}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: theme === "light" ? "#000" : "#FFF",
                }}
              >
                Capítulo anterior
              </Text>
            </TouchableOpacity>
          ) : undefined} */}
          {id < (data?.chapternumber ?? 0) ? (
            <TouchableOpacity
              onPress={async () => {
                await addProgress({
                  book: book,
                  chapter: id,
                  timestamp: new Date(),
                  userId: String(user?.uid),
                });

                navigation.navigate("ChapterPage", {
                  id: id + 1,
                  name: `Capítulo ${id}`,
                  title: `Capítulo ${id}`,
                  resume: `Capítulo ${id}`,
                  book: book,
                });
              }}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                marginTop: -30,
                width: "100%",
                height: 60,
                alignSelf: "center",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                backgroundColor: theme === "light" ? "#FFF" : "#000",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: theme === "light" ? "#000" : "#FFF",
                }}
              >
                Concluir capítulo
              </Text>
              <Ionicons
                style={{
                  marginLeft: 10,
                }}
                name="checkmark"
                size={20}
                color={theme === "light" ? "#000" : "#FFF"}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={async () => {
                await addProgress({
                  book: book,
                  chapter: id,
                  timestamp: new Date(),
                  userId: String(user?.uid),
                });

                navigation.navigate("Book", {
                  book: books[bookId + 1],
                });
              }}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                marginTop: -30,
                width: "100%",
                height: 60,
                alignSelf: "center",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                backgroundColor: theme === "light" ? "#FFF" : "#000",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: theme === "light" ? "#000" : "#FFF",
                }}
              >
                Concluir o livro
              </Text>
              <Ionicons
                style={{
                  marginLeft: 10,
                }}
                name="checkmark"
                size={20}
                color={theme === "light" ? "#000" : "#FFF"}
              />
            </TouchableOpacity>
          )}

          <View
            style={{
              height: 40,
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme === "light" ? "#fff" : "#000" }}
    >
      <Header />
      <Content />
    </SafeAreaView>
  );
};

export default ChapterScreen;
