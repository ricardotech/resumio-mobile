import {
  Text,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Pressable,
} from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../utils/firebaseConfig";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const auth = getAuth(app);
  const handleLogin = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error, errorCode, errorMessage);
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "#000",
        }}
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            backgroundColor: "#000",
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Ionicons
            style={{
              marginTop: 20,
              marginLeft: 20,
            }}
            name="ios-arrow-back"
            size={24}
            color="#fff"
          />
          <View
            style={{
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
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
                color: "#fff",
                marginTop: 20,
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 20,
              }}
            >
              Email
            </Text>
            <Input
              style={{
                color: "#fff",
                padding: 10,
                fontSize: 24,
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
                color: "#fff",
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
                color: "#fff",
                padding: 10,
                fontSize: 24,
              }}
              rightIcon={
                <TouchableWithoutFeedback onPress={handlePasswordVisibility}>
                  <Ionicons
                    name={isPasswordVisible ? "ios-eye-off" : "ios-eye"}
                    size={24}
                    color="#fff"
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
              title="LOG IN"
              buttonStyle={{
                backgroundColor: "white",
                borderRadius: 30,
                height: 50,
              }}
              containerStyle={{
                width: "80%",
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: "bold", color: "#000" }}
              onPress={handleLogin}
            />
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
};

export default LoginPage;