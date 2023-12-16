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
import { books } from "../../../db";

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
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "90%",
          alignSelf: "center",
        }}
      >
        {books.map((book, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Book", {
                id: index,
                book: book,
              });
            }}
            key={index}
            style={{
              height: 60,
              borderRadius: 12,
              justifyContent: "center",
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
          </TouchableOpacity>
        ))}
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
