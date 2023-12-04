import { View, Text, TouchableOpacity } from "react-native"
import { ContentLabel } from "../../../components/ContentLabel";
import { authScreenProp } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { primaryTextColor } from "../../../utils/style";
import { useTheme } from "../../../contexts/theme.context";
import { SafeAreaView } from "react-native-safe-area-context";

const JourneyContentScreen = () => {
    const navigation = useNavigation<authScreenProp>()
    const { theme, changeTheme } = useTheme();
    const books = [
        'Gênesis',
        "Êxodo",
        "Levítico",
        "Números",
        "Deuteronômio"
    ]
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
                    <ContentLabel theme={theme} title="Livros da Lei" />
                </View>
            </View>
        );

    };
    const Content= () => {
        const handleButtonClick = (book: string) => {
            navigation.navigate("Chapter", {
                book
            });
        };
        return (
            <View style={{
                width: "90%",
                alignSelf: 'center'
            }}>
                {books.map((book, index) => (
                    <TouchableOpacity
                        onPress={() => handleButtonClick(book)}
                        key={index}
                        style={{
                            height: 60,
                            borderRadius: 12,
                            justifyContent: 'center',
                            padding: 20,
                            backgroundColor: '#ccc',
                            marginTop: 10
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#000'
                        }}>{book}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
    return (
        <SafeAreaView
            style={{
                backgroundColor: theme === "light" ? "#EEE" : "#111",
                flex: 1,
            }}
        >
            <Header />
            <Content/>
        </SafeAreaView>
    )
}

export default JourneyContentScreen