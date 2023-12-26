import React, { useEffect, useReducer, useRef } from "react";
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
import { authScreenProp } from "../../routes/user.routes";
import { useTheme } from "../../contexts/theme.context";
import {
  primaryBackgroundColor,
  primaryTextColor,
  tertiaryBackgroundColor,
} from "../../utils/style";
import { fetchData } from "../../utils/services";
import { useService } from "../../contexts/service.context";

export default function BookScreen({ route }: { route: any }) {
  const { id, name, title, resume, book } = route.params;

  const navigation = useNavigation<authScreenProp>();

  const { theme, changeTheme } = useTheme();
  const { userChaptersProgress } = useService();

  const userBookChaptersProgress = userChaptersProgress?.filter(
    (chapterProgress: any) => chapterProgress.book === book
  );

  const [data, setData] = React.useState<{
    chapter: string[];
    chapternumber: number;
  } | null>(null);

  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    // Scroll to the top when the component mounts or route parameters change
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
    }

    ChapterText();
  }, [route.params]);

  useEffect(() => {
    ChapterText();
  }, [route.params]);

  const touchables = [];

  for (let i = 1; i <= (data?.chapternumber ?? 0); i++) {
    touchables.push(
      <TouchableOpacity
        key={i}
        onPress={() => {
          navigation.navigate("ChapterScreen", {
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
          backgroundColor: tertiaryBackgroundColor(theme),
          paddingHorizontal: 20,
          height: 60,
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
        {userChaptersProgress &&
          userChaptersProgress.map((chapterProgress) => {
            if (
              chapterProgress.chapter === i &&
              chapterProgress.book === book
            ) {
              return (
                <Text
                  key={`progress-${i}`}
                  style={{
                    color: theme === "light" ? "#000" : "#FFF",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  ✅
                </Text>
              );
            }
            return null; // Return null if the chapter doesn't match
          })}
      </TouchableOpacity>
    );
  }

  const ChapterText = () => {
    fetchData(book, 1).then((data: any) => {
      setData(data);
    });
  };

  return (
    <>
      <View
        style={{
          paddingVertical: 20,
          display: "flex",
          flexDirection: "row",
          backgroundColor: primaryBackgroundColor(theme),
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            paddingRight: 20,
          }}
        >
          <ContentLabel
            title={book}
            description={`${Number(
              ((userBookChaptersProgress?.length || 0) /
                (data?.chapternumber || 1)) *
                100
            ).toFixed(0)}% Concluído`}
            theme={theme}
          />
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
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={{
          flex: 1,
          backgroundColor: primaryBackgroundColor(theme),
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
        >
          {touchables}
        </View>
        <View
          style={{
            height: 20,
          }}
        />
      </ScrollView>
    </>
  );
}
