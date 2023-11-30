import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../contexts/theme.context";
import { primaryTextColor } from "../../utils/style";
import { authScreenProp } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { ContentLabel } from "../../components/ContentLabel";
import { useAuth } from "../../contexts/auth.context";

const SettingsScreen = () => {
  const { signOut } = useAuth();

  const navigation = useNavigation<authScreenProp>();

  const { theme, changeTheme } = useTheme();
  
  const openInfoScreen = () => {
    navigation.navigate('Info')
  }

  const settingsOptions = [
    {
      title: "Personal Info",
      iconName: "person-circle",
      iconColor: "#F5A623",
      isSwitch: false,
    },
    {
      title: "Dark Mode",
      iconName: "moon",
      iconColor: "#4A90E2",
      isSwitch: true,
      switchValue: theme === "dark" ? true : false,
      onToggle: () => {
        changeTheme(theme === "dark" ? "light" : "dark");
      },
    },
    {
      title: "Sign Out",
      iconName: "log-out",
      iconColor: "#F5A623",
      isSwitch: false,
      onToggle: () => {
        signOut();
      },
    },
  ];

  const SettingsOption = ({
    iconName,
    iconSize,
    iconColor,
    title,
    isSwitch,
    onToggle,
    switchValue,
    openInfoScreen,
  }: {
    iconName: any;
    iconSize: number;
    iconColor: string;
    title: string;
    isSwitch: any;
    onToggle: any;
    switchValue: any;
    openInfoScreen: () => void
  }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
      }}
      onPress={title == "Personal Info" ? openInfoScreen : signOut }
    >
      <View
        style={{
          borderRadius: 20,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: iconColor,
        }}
      >
        <Ionicons
          name={iconName}
          size={iconSize}
          
          color={primaryTextColor(theme)}
        />
      </View>
      <Text
        style={{
          color: primaryTextColor(theme),
          flex: 1,
          marginLeft: 16,
        }}
      >
        {title}
      </Text>
      {isSwitch ? (
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          onValueChange={onToggle}
          value={switchValue}
        />
      ) : (
        <Ionicons
          name="ios-arrow-forward"
          size={20}
          color={primaryTextColor(theme)}
        />
      )}
    </TouchableOpacity>
  );

  const Header = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ContentLabel theme={theme} title="Ajustes" />
        <View
          style={{
            paddingRight: 20,
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
            style={{}}
          >
            <Ionicons
              name="ios-close-circle"
              color={primaryTextColor(theme)}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: theme === "light" ? "#EEE" : "#111",
        flex: 1,
      }}
    >
      <Header />
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        {settingsOptions.map((option, index) => (
          <SettingsOption
            key={index}
            iconName={option.iconName}
            iconSize={24}
            iconColor={option.iconColor}
            title={option.title}
            isSwitch={option.isSwitch}
            onToggle={option.onToggle}
            switchValue={option.switchValue}
            openInfoScreen={openInfoScreen}
          />
        ))}
      </View>
    </View>
  );
};

export default SettingsScreen;
