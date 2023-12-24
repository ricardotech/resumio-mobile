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
import { useEffect, useState } from "react";
import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../utils/firebaseConfig";
import { useAuth } from "../../contexts/auth.context";
import {
  primaryBackgroundColor,
  primaryTextColor,
  secondaryBackgroundColor,
  secondaryTextColor,
} from "../../utils/style";
import { useTheme } from "../../contexts/theme.context";
import { useNavigation } from "@react-navigation/native";
import { authScreenProp } from "../../routes/auth.routes";

import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

const LoginPage = () => {
  const navigation = useNavigation<authScreenProp>();

  const { theme } = useTheme();

  const { loading, signIn, signInGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isValidLogin = email.includes("@") && password.length > 8;

  const handleLogin = async () => {
    const res = await signIn({ email, password });

    const errorMessage = res.errorMessage?.replace("Firebase: ", "");

    if (res.errorCode === "auth/invalid-login-credentials") {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: "Email ou senha inválidos",
      });
    } else if (res.errorCode === "auth/too-many-requests") {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: "Muitas tentativas de login, tente novamente mais tarde",
      });
    } else if (res.errorCode === "auth/user-not-found") {
      Toast.show({
        type: "error",
        text1: "Usuário não encontrado",
      });
    } else if (res.errorCode === "auth/wrong-password") {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: "Senha incorreta",
      });
    } else if (res.errorCode === "auth/network-request-failed") {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: "Sem conexão com a internet",
      });
    } else if (res.errorCode === "auth/invalid-email") {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: "Email inválido",
      });
    } else if (res.errorCode === "auth/user-disabled") {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: "Usuário desabilitado",
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Sucesso ao fazer login",
        text2: "Você será redirecionado para a página inicial",
      });
    }
  };

  const [googleAccessToken, setGoogleAccessToken] = useState("");

  const [isLogging, setIsLogging] = useState(false);

  const [screen, setScreen] = useState<"SignInWithEmail" | "SignIn">("SignIn");

  const SignInPage = () => {
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
            <View
              style={{
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: primaryTextColor(theme),
                  marginTop: 20,
                  fontSize: 36,
                  fontWeight: "bold",
                }}
              >
                Resumio
              </Text>
              <Text
                style={{
                  color: primaryTextColor(theme),
                  fontSize: 16,
                }}
              >
                Entrar na sua conta
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 20
              }}
            >
              <Button
                loading={loading}
                title="Entrar com Google"
                icon={
                  <Icon
                    size={16}
                    name="google"
                    type="material-community"
                    color={secondaryTextColor(theme)}
                    style={{
                      marginLeft: 10,
                    }}
                  />
                }
                iconRight
                buttonStyle={{
                  backgroundColor: secondaryBackgroundColor(theme),
                  borderRadius: 30,
                  height: 50,
                }}
                containerStyle={{
                  width: "90%",
                }}
                loadingProps={{
                  size: "small",
                  color: secondaryTextColor(theme),
                }}
                titleStyle={{
                  fontWeight: "bold",
                  color: secondaryTextColor(theme),
                }}
                onPress={signInGoogle}
              />
              {/* <Button
                loading={loading}
                title="Entrar com email"
                icon={
                  <Icon
                    size={16}
                    name="email"
                    type="material-community"
                    color={secondaryTextColor(theme)}
                    style={{
                      marginLeft: 10,
                    }}
                  />
                }
                iconRight
                buttonStyle={{
                  backgroundColor: secondaryBackgroundColor(theme),
                  borderRadius: 30,
                  height: 50,
                }}
                containerStyle={{
                  marginTop: 10,
                  width: "90%",
                }}
                loadingProps={{
                  size: "small",
                  color: secondaryTextColor(theme),
                }}
                titleStyle={{
                  fontWeight: "bold",
                  color: secondaryTextColor(theme),
                }}
                onPress={handleLogin}
              />
              <Button
                title="Ainda não tem uma conta?"
                buttonStyle={{
                  backgroundColor: "transparent",
                  borderRadius: 30,
                  height: 50,
                }}
                containerStyle={{
                  width: "90%",
                  marginTop: 10,
                }}
                loadingProps={{ size: "small", color: primaryTextColor(theme) }}
                titleStyle={{
                  fontWeight: "bold",
                  color: primaryTextColor(theme),
                }}
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              /> */}
            </View>
          </KeyboardAvoidingView>
        </Pressable>
        <Toast />
      </SafeAreaView>
    );
  };

  const SignInWithEmail = () => {
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
              <View
                style={{
                  height: 24,
                }}
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
                  marginTop: 20,
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                Bem vindo de volta!👋
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
                marginBottom: 70,
              }}
            >
              <Button
                title="Ainda não tem uma conta?"
                buttonStyle={{
                  marginBottom: 20,
                  backgroundColor: "transparent",
                  borderRadius: 30,
                  height: 50,
                }}
                containerStyle={{
                  width: "90%",
                  marginHorizontal: 50,
                  marginVertical: -8,
                }}
                loadingProps={{ size: "small", color: primaryTextColor(theme) }}
                titleStyle={{
                  fontWeight: "bold",
                  color: primaryTextColor(theme),
                }}
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              />

              <Button
                disabled={!isValidLogin}
                loading={loading}
                title="Entrar"
                buttonStyle={{
                  backgroundColor: secondaryBackgroundColor(theme),
                  borderRadius: 30,
                  height: 50,
                }}
                containerStyle={{
                  width: "90%",
                  marginHorizontal: 50,
                }}
                loadingProps={{
                  size: "small",
                  color: secondaryTextColor(theme),
                }}
                titleStyle={{
                  fontWeight: "bold",
                  color: secondaryTextColor(theme),
                }}
                onPress={handleLogin}
              />
            </View>
          </KeyboardAvoidingView>
        </Pressable>
        <Toast />
      </SafeAreaView>
    );
  };

  return (
    <>
      {screen === "SignIn" && <SignInPage />}
      {screen === "SignInWithEmail" && <SignInWithEmail />}
    </>
  );
};

export default LoginPage;
