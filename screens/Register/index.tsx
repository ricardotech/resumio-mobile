import React from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Icon, Button } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../utils/firebaseConfig";
import { useAuth } from "../../contexts/auth.context";
import {
  primaryBackgroundColor,
  primaryTextColor,
  secondaryBackgroundColor,
  secondaryTextColor,
} from "../../utils/style";
import { useTheme } from "../../contexts/theme.context";
import { authScreenProp } from "../../routes/auth.routes";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

export default function RegisterPage() {
  const navigation = useNavigation<authScreenProp>();

  const { theme } = useTheme();

  const { loading, signUp } = useAuth();

  const [photoURL, setPhotoURL] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const auth = getAuth(app);

  const handleSignUp = async () => {
    const res = await signUp({ name, email, password });

    const errorMessage = res.errorMessage?.replace("Firebase: ", "");

    // validate the createUserWithEmailAndPassword firebase

    if (res.errorCode === "auth/email-already-in-use") {
      Toast.show({
        type: "error",
        text1: "Erro ao registrar",
        text2: "Email já cadastrado",
      });
    } else if (res.errorCode === "auth/invalid-email") {
      Toast.show({
        type: "error",
        text1: "Erro ao registrar",
        text2: "Email inválido",
      });
    } else if (res.errorCode === "auth/weak-password") {
      Toast.show({
        type: "error",
        text1: "Erro ao registrar",
        text2: "Senha muito fraca",
      });
    } else if (res.errorCode === "auth/too-many-requests") {
      Toast.show({
        type: "error",
        text1: "Erro ao registrar",
        text2: "Muitas tentativas de login, tente novamente mais tarde",
      });
    } else if (res.errorCode === "auth/network-request-failed") {
      Toast.show({
        type: "error",
        text1: "Erro ao registrar",
        text2: "Sem conexão com a internet",
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Registrado com sucesso",
        text2: "Bem vindo!",
      });
    }
  };

  const isValidRegister =
    name.split(" ").length > 1 && email && password.length > 8;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: primaryBackgroundColor(theme),
      }}
    >
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Pressable
        style={{
          flex: 1,
          backgroundColor: primaryBackgroundColor(theme),
        }}
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            backgroundColor: primaryBackgroundColor(theme),
            flex: 1,
            flexDirection: "column",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.removeListener;
              navigation.goBack();
            }}
          >
            <Ionicons
              style={{
                marginTop: 20,
                marginLeft: 20,
              }}
              name="ios-arrow-back"
              size={24}
              color={primaryTextColor(theme)}
            />
          </TouchableOpacity>
          <View
            style={{
              padding: 20,
            }}
          >
            <Text
              style={{
                color: primaryTextColor(theme),
                fontSize: 28,
                fontWeight: "bold",
              }}
            >
              Pronto para começar?👋
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: primaryTextColor(theme),
                marginTop: 10,
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 20,
              }}
            >
              Seu nome completo
            </Text>
            <Input
              autoCapitalize="words"
              style={{
                paddingLeft: 0,
                color: primaryTextColor(theme),
                padding: 10,
                fontSize: 20,
              }}
              inputContainerStyle={{
                width: "95%",
                alignSelf: "center",
              }}
              onChangeText={setName}
              value={name}
            />
            <Text
              style={{
                color: primaryTextColor(theme),
                marginTop: 10,
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 20,
              }}
            >
              Email
            </Text>
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              style={{
                paddingLeft: 0,
                color: primaryTextColor(theme),
                padding: 10,
                fontSize: 20,
              }}
              inputContainerStyle={{
                width: "95%",
                alignSelf: "center",
              }}
              onChangeText={setEmail}
              value={email}
            />
            <Text
              style={{
                color: primaryTextColor(theme),
                marginTop: 10,
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 20,
              }}
            >
              Senha
            </Text>
            <Input
              secureTextEntry={!isPasswordVisible}
              style={{
                paddingLeft: 0,
                color: primaryTextColor(theme),
                padding: 10,
                fontSize: 20,
              }}
              rightIcon={
                <TouchableWithoutFeedback onPress={handlePasswordVisibility}>
                  <Ionicons
                    name={isPasswordVisible ? "ios-eye-off" : "ios-eye"}
                    size={24}
                    color={primaryTextColor(theme)}
                  />
                </TouchableWithoutFeedback>
              }
              inputContainerStyle={{
                width: "95%",
                alignSelf: "center",
              }}
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 60,
            }}
          >
            <Button
              title="Registrar"
              buttonStyle={{
                backgroundColor: secondaryBackgroundColor(theme),
                borderRadius: 30,
                height: 50,
              }}
              containerStyle={{
                width: "90%",
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              disabled={!isValidRegister}
              loading={loading}
              loadingProps={{
                size: "small",
                color: secondaryTextColor(theme),
              }}
              titleStyle={{
                fontWeight: "bold",
                color: secondaryTextColor(theme),
              }}
              onPress={handleSignUp}
            />
          </View>
        </KeyboardAvoidingView>
      </Pressable>
      <Toast />
    </SafeAreaView>
  );
}
