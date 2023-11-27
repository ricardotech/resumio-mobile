import {
  Text,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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

const LoginPage = () => {
  const navigation = useNavigation<authScreenProp>();

  const { theme } = useTheme();

  const { loading, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const auth = getAuth(app);
  const handleLogin = async () => {
    const res = await signIn({ email, password });
    console.log(res)
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: primaryBackgroundColor(theme),
      }}
    >
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
              padding: 20,
            }}
          >
            <Text
              style={{
                color: primaryTextColor(theme),
                marginTop: 20,
                fontSize: 32,
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
                marginTop: 20,
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
                marginTop: 20,
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
              marginBottom: 50,
            }}
          >
            <Button
              title="Ainda não tem uma conta?"
              buttonStyle={{
                backgroundColor: "transparent",
                borderRadius: 30,
                height: 50,
              }}
              containerStyle={{
                width: "80%",
                marginHorizontal: 50,
                marginVertical: 10,
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
              disabled={loading}
              loading={loading}
              title="Entrar"
              buttonStyle={{
                backgroundColor: secondaryBackgroundColor(theme),
                borderRadius: 30,
                height: 50,
              }}
              containerStyle={{
                width: "80%",
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              loadingProps={{ size: "small", color: secondaryTextColor(theme) }}
              titleStyle={{
                fontWeight: "bold",
                color: secondaryTextColor(theme),
              }}
              onPress={handleLogin}
            />
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
};

export default LoginPage;
