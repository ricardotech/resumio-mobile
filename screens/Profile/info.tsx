import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { authScreenProp } from "../../App";
import { AuthContext, useAuth } from "../../contexts/auth.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { primaryTextColor } from "../../utils/style";
import { ContentLabel } from "../../components/ContentLabel";
import { useTheme } from "../../contexts/theme.context";
import { Avatar } from "@rneui/base";
import { changeProfileImageFunc } from "../../utils/services";
import { Input } from "@rneui/themed";


const InfoScreen = () => {
    const { theme, changeTheme } = useTheme();
    const { user, loadUser, changeProfileImage } = useAuth();
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
    }

    const ProfileInfo= () => {
        const handleChangeImage = () => {
            changeProfileImageFunc(user, setUploadProgress, loadUser, changeProfileImage)
        }
            return (
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    onPress={handleChangeImage}
                    >
                    <Ionicons
                        style={{
                            position: 'absolute',
                            alignSelf: 'flex-end',
                            zIndex: 1,
                            bottom: 0
                        }}
                        name="md-add-circle" 
                        size={32} 
                        color={primaryTextColor(theme)} />
                        <Avatar
                        rounded
                        size={100}
                        source={{
                            uri: user?.thumbnail
                        }}
                        
                    />
                </TouchableOpacity>
                <Text
                  style={{
                    color: primaryTextColor(theme),
                    fontSize: 24,
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  {user?.name}
                </Text>
              </View>
            );       
    }

    return(
        <SafeAreaView style={{
            backgroundColor: theme === "light" ? "#EEE" : "#111",
            flex: 1,
        }}>
            <Header/>
            <ProfileInfo/>
        </SafeAreaView>
    )
}

export default InfoScreen