import { View, Text, TouchableOpacity } from "react-native"
import { ContentLabel } from "../../../components/ContentLabel";
import { authScreenProp } from "../../../routes/user.routes";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { primaryTextColor } from "../../../utils/style";
import { useTheme } from "../../../contexts/theme.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const JourneyContentScreen = () => {
    const navigation = useNavigation<authScreenProp>()
    const { theme, changeTheme } = useTheme();
    const books = [
        'Gênesis',
        "Êxodo",
        "Levítico",
        "Números",
        "Deuteronômio",
        "Josué",
        "Juízes",
        "Rute",
        "1 Samuel",
        "2 Samuel",
        "1 Reis",
        "2 Reis",
        "1 Crônicas",
        "2 Crônicas",
        "Esdras",
        "Neemias",
        "Ester",
        "Jó",
        "Salmos",
        "Provérbios",
        "Eclesiastes",
        "Cânticos",
        "Isaías",
        "Jeremias",
        "Lamentações",
        "Ezequiel",
        "Daniel",
        "Oséias",
        "Joel",
        "Amós",
        "Obadias",
        "Jonas",
        "Miquéias",
        "Naum",
        "Habacuque",
        "Sofonias",
        "Ageu",
        "Zacarias",
        "Malaquias",
        "Mateus",
        "Marcos",
        "Lucas",
        "João",
        "Atos",
        "Romanos",
        "1 Coríntios",
        "2 Coríntios",
        "Gálatas",
        "Efésios",
        "Filipenses",
        "Colossenses",
        "1 Tessalonicenses",
        "2 Tessalonicenses",
        "1 Timóteo",
        "2 Timóteo",
        "Tito",
        "Filemom",
        "Hebreus",
        "Tiago",
        "1 Pedro",
        "2 Pedro",
        "1 João",
        "2 João",
        "3 João",
        "Judas",
        "Apocalipse"
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
                    <ContentLabel theme={theme} title="Livros da bíblia" />
                </View>
            </View>
        );

    };
    const Content= () => {
        const handleButtonClick = (book: string) => {
            navigation.navigate("Chapter", {
                id: 1,
                name: `Capítulo 1`,
                title: `Capítulo 1`,
                resume: `Capítulo 1`,
                book: book,
            });
        };
        return (
            <ScrollView style={{
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
            </ScrollView>
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