import React, { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContentLabel } from "../../components/ContentLabel";
import { SvgXml } from "react-native-svg"; // Import SvgXml
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams, authScreenProp } from "../../App";
import { useTheme } from "../../contexts/theme.context";
import { primaryTextColor } from "../../utils/style";
import { fetchData } from "../../utils/services";

export default function BookScreen({ route }: { route: any }) {
  const navigation = useNavigation<authScreenProp>();
  const { theme, changeTheme } = useTheme();
  const [data, setData] = React.useState<{
    chapter: string[];
    chapternumber: number;
  } | null>(null);

  const { id, name, title, resume, book } = route.params;
  const ChapterText = () => {
    fetchData(book, 1).then((data: any) => {
      setData(data);
      const chapter = data.chapternumber;
    });
  };
  useEffect(() => {
    ChapterText();
  }, []);
  const touchables = [];
  for (let i = 1; i <= (data?.chapternumber ?? 0); i++) {
    touchables.push(
      <TouchableOpacity
        key={i}
        onPress={() => {
          navigation.navigate("ChapterPage", {
            id: i,
            name: `Capítulo ${i}`,
            title: `Capítulo ${i}`,
            resume: `Capítulo ${i}`,
            book: book,
          });
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme === "light" ? "#ccc" : "#292929",
          padding: 20,
          borderRadius: 12,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: theme === "light" ? "#000" : "#FFF",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Capítulo {i}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme === "light" ? "#EEE" : "#111" }}
    >
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
              name="ios-arrow-back"
              size={30}
              color={primaryTextColor(theme)}
            />
          </TouchableOpacity>
          <ContentLabel title={book} theme={theme} />
          <Text
            style={{
              color: theme === "light" ? "#000" : "#FFF",
              fontSize: 18,
            }}
          >
            - {data?.chapternumber} Capítulos
          </Text>
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme === "light" ? "#EEE" : "#383838",
          borderRadius: 20,
          paddingTop: 20,
          paddingHorizontal: 20,
          marginBottom: -34,
        }}
      >
        <View
          style={{
            display: "flex",
            width: "100%",
            marginBottom: 40,
          }}
        >{touchables}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
