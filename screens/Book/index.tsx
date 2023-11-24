import React from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ContentLabel } from "../../components/ContentLabel";
import { SvgXml } from "react-native-svg"; // Import SvgXml
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "../../App";

export default function BookScreen({ route }: { route: any }) {
  type authScreenProp = StackNavigationProp<StackNavigatorParams, "Tab">;

  const navigation = useNavigation<authScreenProp>();

  const { id, name, title, resume } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView>
        <View
          style={{
            borderBottomColor: "#DDD",
            borderBottomWidth: 1,
            height: 60,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              zIndex: 999,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: -10,
            }}
          >
            <Ionicons name="chevron-back-sharp" color="tomato" size={18} />
            <Text
              style={{
                fontSize: 16,
                textDecorationLine: "underline",
                color: "tomato",
              }}
            >
              Voltar
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 60,
              justifyContent: "center",
              position: "absolute",
              width: Dimensions.get("window").width,
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 20,
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {name}
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 20,
          }}
        >
          <Text
            style={{
              marginTop: 20,
              color: "#000",
              fontSize: 28,
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              marginTop: 40,
              color: "#444",
              fontSize: 16,
              textAlign: "left",
            }}
          >
            {resume}
          </Text>
          <TouchableOpacity style={{
            marginTop: 30,
            height: 50,
            width: "100%",
            borderRadius: 10,
            backgroundColor: "tomato",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Text
              style={{
                color: "#FFF",
                fontSize: 16,
                fontWeight: "900",
                textAlign: "center",
              }}
            >
              Confirmar leitura
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 30,
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
