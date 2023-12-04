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

const ChapterScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation<authScreenProp>();
  const { theme, changeTheme } = useTheme();
  const { id, name, title, resume, book } = route.params;
  const [data, setData] = React.useState<{
    chapter: string[];
    chapternumber: number;
  } | null>(null);

  const ChapterText = () => {
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
        <View key={index} style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}>
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

  useEffect(() => {
    setData(null);
    ChapterText();
  }, [id]);
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
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {id > 1 ? (
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
                marginLeft: 10,
              }}
            >
              <Ionicons
                name="ios-arrow-back"
                color={primaryTextColor(theme)}
                size={30}
              />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                marginLeft: 10,
              }}
            ></View>
          )}
          <Text
            style={{
              color: theme === "light" ? "#000" : "#FFF",
              fontSize: 32,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Capítulo {id}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.removeListener;
              navigation.goBack();
            }}
            style={{
              marginLeft: 10,
            }}
          >
            <Ionicons
              name="ios-close"
              color={primaryTextColor(theme)}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Content = () => {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          paddingBottom: 0,
        }}
      >
        <ScrollView
          indicatorStyle={theme === "light" ? "black" : "white"}
          style={{
            backgroundColor: theme === "light" ? "#EEE" : "#292929",
            borderRadius: 30,
            paddingTop: 20,
            paddingHorizontal: 20,
            marginBottom: 20,
            paddingBottom: 60,
            gap: 20,
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
          {id < (data?.chapternumber ?? 0) ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChapterPage", {
                  id: id + 1,
                  name: `Capítulo ${id}`,
                  title: `Capítulo ${id}`,
                  resume: `Capítulo ${id}`,
                  book: book,
                });
              }}
              style={{
                width: "100%",
                height: 60,
                borderRadius: 12,
                padding: 20,
                marginTop: -40,
                marginBottom: 30,
                backgroundColor: theme === "light" ? "#ccc" : "#3b3b3b",
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
                Próximo capítulo
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: "100%",
                height: 60,
                borderRadius: 12,
                padding: 20,
                marginTop: -40,
                marginBottom: 30,
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
                Fim do livro
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
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
