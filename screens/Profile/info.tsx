import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { authScreenProp } from "../../App";
import { AuthContext, useAuth } from "../../contexts/auth.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  primaryBackgroundColor,
  primaryTextColor,
  secondaryBackgroundColor,
  secondaryTextColor,
} from "../../utils/style";
import { ContentLabel } from "../../components/ContentLabel";
import { useTheme } from "../../contexts/theme.context";
import { Avatar } from "@rneui/base";
import { changeProfileImageFunc } from "../../utils/services";
import { Button, Input } from "@rneui/themed";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { Pressable } from "react-native";
import { Keyboard } from "react-native";
import Toast from "react-native-toast-message";

const InfoScreen = () => {
  const { theme, changeTheme } = useTheme();
  const {
    user,
    loadUser,
    changeProfileImage,
    loading,
    updateUser,
    verificationEmail,
  } = useAuth();
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const navigation = useNavigation<authScreenProp>();

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
              color={primaryTextColor(theme)}
              size={30}
            />
          </TouchableOpacity>
          <ContentLabel theme={theme} title="Perfil" />
        </View>
      </View>
    );
  };

  const ProfileInfo = () => {
    const [imageLoading, setImageLoading] = useState(true);
    const handleChangeImage = () => {
      changeProfileImageFunc(
        user,
        setUploadProgress,
        loadUser,
        changeProfileImage
      );
    };
    return (
      <View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleChangeImage}>
            <Ionicons
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                zIndex: 1,
                bottom: 0,
              }}
              name="md-add-circle"
              size={32}
              color={primaryTextColor(theme)}
            />
            <Avatar size={100} rounded>
              <Image
                source={{ uri: user?.thumbnail }}
                onLoadStart={() => setImageLoading(true)}
                onLoad={() => setImageLoading(false)}
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
              />
              {imageLoading && (
                <ActivityIndicator
                  size="large"
                  color={primaryTextColor(theme)}
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    zIndex: 1,
                    bottom: 25,
                  }}
                />
              )}
            </Avatar>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ProfileForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isValidRegister =
      name.split(" ").length > 1 && email && password.length > 8;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const handlePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    const handleUpdateUser = () => {
      updateUser(name, email, password).then(() => {
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Dados atualizados com sucesso",
          position: "bottom",
          visibilityTime: 2000,
          autoHide: true,
          onHide: () => {},
        });
      });
    };
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        <ProfileInfo />
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
          placeholder={user?.name}
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
          Seu email
        </Text>
        <TouchableOpacity onPress={verificationEmail}>
          <Text
            style={{
              color: primaryTextColor(theme),
              marginLeft: 20,
            }}
          >
            Verificar email
          </Text>
        </TouchableOpacity>
        <Input
          autoCapitalize="words"
          placeholder={user?.email}
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
          Sua senha
        </Text>
        <Input
          secureTextEntry={isPasswordVisible}
          placeholder="********"
          rightIcon={
            <Pressable onPress={handlePasswordVisibility}>
              <Ionicons
                name={isPasswordVisible ? "md-eye" : "md-eye-off"}
                size={24}
                color={primaryTextColor(theme)}
              />
            </Pressable>
          }
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
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity
          onPress={handleUpdateUser}
          disabled={!isValidRegister}
          style={{
            width: "95%",
            height: 50,
            alignSelf: "center",
            backgroundColor: isValidRegister ? "#1eff4f" : "#CCC",
            padding: 10,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: primaryTextColor(theme),
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Atualizar dados
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <SafeAreaView
          style={{
            backgroundColor: theme === "light" ? "#EEE" : "#111",
            flex: 1,
          }}
        >
          <Header />
          <ProfileForm />
        </SafeAreaView>
        <Toast />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default InfoScreen;
