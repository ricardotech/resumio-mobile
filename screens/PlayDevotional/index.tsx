import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "expo-image";
import Background from "../../assets/PlayDevotionalBackground.png"
import { TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { primaryTextColor } from "../../utils/style";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/theme.context";
import { useNavigation } from "@react-navigation/native";
import { authScreenProp } from "../../routes/auth.routes";
import { Text } from "react-native";
import { Slider } from "@rneui/themed";
import { Audio } from "expo-av";
import musica from "../../assets/audios/Musica.mp3"


export function PlayDevotionalScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<authScreenProp>();
    const [icon, setIcon] = useState("play-outline");
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [status, setStatus] = useState({} as any);
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const [ isplaying, setIsPlaying ] = useState(false);


    async function LoadFile() {
        try {
            const { sound } = await Audio.Sound.createAsync(
                musica,
                { shouldPlay: isplaying }
            );
            (status: any) => { setStatus(status) }
            setSound(sound);
        } catch (error) {
            console.error('Error loading or playing sound:', error);
        }
    }

    async function PlaySound() {
        setIcon(icon === "play-outline" ? "pause-outline" : "play-outline");
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true
        });
        setIsPlaying(true);
        sound?.playAsync();
        sound?.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.durationMillis) {
                setPlaybackPosition(status.positionMillis / status.durationMillis);
            }
        });
    }

    async function PauseSound() {
        setIcon(icon === "play-outline" ? "pause-outline" : "play-outline");
        sound?.pauseAsync();
    }

    const timeInMinutes = () => {
        if (status?.durationMillis) {
            const minutes = Math.floor(status.durationMillis / 60000);
            const seconds = ((status.durationMillis % 60000) / 1000).toFixed(0);
            return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
        }
    }
    // fix currentTimeInMinutes function to update time in real time
    const currentTimeInMinutes = () => {
        if (status?.positionMillis) {
            const minutes = Math.floor(status.positionMillis / 60000);
            const seconds = ((status.positionMillis % 60000) / 1000).toFixed(0);
            return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
        }
        return "0:00";
    }



    useEffect(() => {
        LoadFile();
    }, []);

    useEffect(() => {

        if (sound) {
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setStatus(status);
                }
            });
        }

        return () => {
            if (sound) {
                sound.setOnPlaybackStatusUpdate(null);
            }
        };
    }, [sound]);

    return (
        <ImageBackground style={{
            flex: 1,
            justifyContent: "center"
        }}
            source={
                Background
            }>
            <SafeAreaView style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.removeListener;
                            navigation.goBack();
                        }}
                        style={{
                            marginRight: 20
                        }}
                    >
                        <Ionicons
                            name="close-outline"
                            color={primaryTextColor(theme)}
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}>
                    {/* SETAS PROXIMO E ANTERIOR */}

                    {/* <TouchableOpacity style={{
                        marginLeft: 20
                    }}>
                        <Ionicons
                            name="chevron-back-outline"
                            color={primaryTextColor(theme)}
                            size={40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginRight: 20
                    }}>
                        <Ionicons
                            name="chevron-forward-outline"
                            color={primaryTextColor(theme)}
                            size={40}
                        />
                    </TouchableOpacity> */}
                </View>
                <View style={{
                    paddingHorizontal: 40,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 20,
                        textAlign: 'left',
                        fontWeight: 'bold',
                        marginVertical: 10,
                        color: primaryTextColor(theme)
                    }}>
                        Desde que o samba é samba
                    </Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        marginBottom: 10,
                        gap: 10
                    }} >
                        <Ionicons
                            name="moon-outline"
                            size={16}
                            color={primaryTextColor(theme)}
                        />
                        <Text style={{
                            color: primaryTextColor(theme),
                            fontSize: 16
                            // }}>Narrador: Lucas Couto</Text>
                        }}>Caetano Veloso</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        width: "100%",
                        marginBottom: 20
                    }}>
                        <Slider
                            thumbTintColor={primaryTextColor(theme)}
                            value={playbackPosition}
                            thumbStyle={{
                                width: 20,
                                height: 20,
                                borderRadius: 20,
                            }}
                            allowTouchTrack
                            onValueChange={(value) => {
                                if (status?.durationMillis) {
                                    sound?.setPositionAsync(value * status.durationMillis);
                                }
                            }}
                            minimumTrackTintColor="#4ab7f7"
                            maximumTrackTintColor="#cccccc4c"
                            style={{
                                width: "100%",
                            }}
                        />
                        <Text style={{
                            color: primaryTextColor(theme),
                            fontSize: 16,
                            textAlign: "right"
                        }}> {currentTimeInMinutes()} / {timeInMinutes()}</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 20
                    }}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "transparent",
                                    padding: 10,
                                    borderRadius: 10
                                }}
                                onPress={() => {
                                    icon === "play-outline" ? PlaySound() : PauseSound();
                                }}
                            >
                                <Ionicons
                                    name={icon}
                                    size={30}
                                    color={primaryTextColor(theme)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "transparent",
                                    padding: 10,
                                    borderRadius: 10
                                }}
                            >
                                <Ionicons
                                    name="volume-high-outline"
                                    size={30}
                                    color={primaryTextColor(theme)}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            flex: 1
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "transparent",
                                    padding: 10,
                                    borderRadius: 10
                                }}
                            >
                                <Ionicons
                                    name="download-outline"
                                    size={30}
                                    color={primaryTextColor(theme)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "transparent",
                                    padding: 10,
                                    borderRadius: 10
                                }}
                            >
                                <Ionicons
                                    name="heart-outline"
                                    size={28}
                                    color={primaryTextColor(theme)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "transparent",
                                    padding: 10,
                                    borderRadius: 10
                                }}
                            >
                                <Ionicons
                                    name="share-social-outline"
                                    size={28}
                                    color={primaryTextColor(theme)}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}