import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { ContentLabel } from "../../components/ContentLabel";
import { authScreenProp } from "../../routes/user.routes";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  primaryBackgroundColor,
  primaryTextColor,
  secondaryBackgroundColor,
  secondaryTextColor,
} from "../../utils/style";
import { useTheme } from "../../contexts/theme.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchData } from "../../utils/services";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../contexts/auth.context";
import { useService } from "../../contexts/service.context";
import { books } from "../../db";
import { Devotional } from "../../firestore/models/Devotional";

import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

export default function DevotionalScreen({ route }: { route: any }) {
  const { theme, changeTheme } = useTheme();
  const { user } = useAuth();
  const { devotionals } = useService();

  const navigation = useNavigation<authScreenProp>();

  const { id, name, title, resume, book } = route.params;

  // get the actual devotional filtering the devitionals array based on the id provided on route.params

  const [actualDevotional, setActualDevotional] = useState<Devotional>();

  useEffect(() => {
    if (devotionals) {
      devotionals.map((d, i) => {
        if (d.id === id) {
          setActualDevotional(d);
        }
      });
    }
  }, []);

  const Header = () => {
    return (
      <View
        style={{
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            paddingTop: 20,
            paddingHorizontal: 20,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme === "light" ? "#000" : "#EEE",
              fontSize: 14,
              fontWeight: "300",
              alignSelf: "flex-start",
            }}
          >
            {/* 19 de Dezembro de 2023 */}
            {moment().format("DD [de] MMMM [de] YYYY")}
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
        <Text
          style={{
            marginLeft: 20,
            color: theme === "light" ? "#000" : "#EEE",
            fontSize: 18,
            fontWeight: "700",
            alignSelf: "flex-start",
          }}
        >
          {actualDevotional?.tema}
        </Text>
      </View>
    );
  };

  const Card = ({
    isOpen = false,
    time,
    title,
    content,
    icon,
    bgColor,
    textColor,
    onPress,
    value,
  }: {
    isOpen?: boolean;
    time: number;
    title: string;
    content: string;
    icon?: any;
    bgColor?: string;
    textColor?: string;
    onPress?: () => void;
    value: "oracao" | "explicacao" | "aplicacao" | "texto" | "exemplos";
  }) => {
    const [isOpened, setIsOpened] = useState(isOpen || false);

    return (
      <Pressable
        onPress={() => {
          setIsOpened(!isOpened);
        }}
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "#009cb8",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {icon && icon}

              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#FFF",
                }}
              >
                {title}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "#FFF",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5,
                  paddingHorizontal: 7,
                  marginLeft: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#009cb8",
                  }}
                >
                  {time} min
                </Text>
              </View>
            </View>
          </View>
          {isOpened && (
            <View
              style={{
                width: "100%",
              }}
            >
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  color: "#FFF",
                }}
              >
                {content}
              </Text>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  height: 45,
                  width: "100%",
                  backgroundColor: "#FFF",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#009cb8",
                  }}
                >
                  Coletar {time} {time > 1 ? "moedas" : "moeda"}
                </Text>
                <MaterialCommunityIcons
                  style={{
                    marginLeft: 5,
                  }}
                  size={18}
                  name="poker-chip"
                  color="#009cb8"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#000",
        flex: 1,
      }}
    >
      <Header />

      <ScrollView>
        <Card
          isOpen
          time={1}
          value="aplicacao"
          onPress={() => {}}
          icon={<Ionicons size={20} name="today-outline" color="#FFF" />}
          content={actualDevotional?.aplicacao || ""}
          title="Onde se aplica?"
        />
        <Card
          time={3}
          value="oracao"
          onPress={() => {}}
          icon={<Text style={{ fontSize: 20 }}>🙏🏼</Text>}
          content={actualDevotional?.oracao || ""}
          title="Oração"
        />
        <Card
          time={3}
          value="texto"
          onPress={() => {}}
          icon={<Text style={{ fontSize: 20 }}>📖</Text>}
          content={actualDevotional?.texto || ""}
          title="Texto"
        />
        <Card
          time={5}
          value="explicacao"
          onPress={() => {}}
          icon={<Text style={{ fontSize: 20 }}>📝</Text>}
          content={actualDevotional?.reflexao || ""}
          title="Explicação"
        />
        <View
          style={{
            height: 40,
          }}
        />
      </ScrollView>
    </View>
  );
}
