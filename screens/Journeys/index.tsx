import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import * as Progress from "react-native-progress";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ContentLabel } from "../../components/ContentLabel";
import { useTheme } from "../../contexts/theme.context";
import { authScreenProp } from "../../App";
import {
  primaryBackgroundColor,
  primaryTextColor,
  secondaryBackgroundColor,
  secondaryTextColor,
} from "../../utils/style";
import { useNavigation } from "@react-navigation/native";

const missions: {
  title: string;
  progress: number;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconColor: string;
}[] = [
  {
    title: "Get 25 Diamonds",
    progress: 0.48,
    icon: "diamond-stone",
    iconColor: "#4fc3f7",
  },
  { title: "Get 40 XP", progress: 0.6, icon: "flash", iconColor: "#ffa726" },
  {
    title: "Get 2 perfect lessons",
    progress: 0,
    icon: "target",
    iconColor: "#e57373",
  },
  {
    title: "Complete 1 challenge",
    progress: 1,
    icon: "fire",
    iconColor: "#ffeb3b",
  },
];

const JourneysScreen = () => {
  const navigation = useNavigation<authScreenProp>();

  const { theme } = useTheme();

  type Journey = {
    id: string;
    collectionId: string;
    title: string;
    description: string;
    icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    iconColor?: string;
    progress?: number;
    startedAt?: Date;
    completedAt?: Date;
  };

  type JourneyCollection = {
    id: string;
    name: string;
    description: string;
    journeys: Journey[];
  };

  // Crie um array inicial de jornadas
  const initialJourneysForOldTestament: Journey[] = [
    {
      id: "1",
      collectionId: "1",
      title: "Jornada pelos Livros da Lei",
      progress: 1,
      iconColor: "#4fc3f7",
      icon: "book-open-page-variant",
      description:
        "Explore os cinco primeiros livros da Bíblia para entender a fundação da fé judaico-cristã...",
    },
    {
      id: "2",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#ffa726",
      icon: "book-open-page-variant",
      title: "Jornada pelos Profetas Maiores",
      description:
        "Mergulhe na vida e nas profecias dos profetas maiores do Antigo Testamento...",
    },
    {
      id: "3",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#e57373",
      icon: "book-open-page-variant",
      title: "Jornada pelos Profetas Menores",
      description:
        "Explore as mensagens dos profetas menores do Antigo Testamento...",
    },
    {
      id: "4",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#ffeb3b",
      icon: "book-open-page-variant",
      title: "Jornada pelos Salmos e Provérbios",
      description:
        "Aprofunde-se nos Salmos para descobrir canções de louvor e adoração...",
    },
    {
      id: "5",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#4fc3f7",
      icon: "book-open-page-variant",
      title: "Jornada pela História de Davi",
      description:
        "Siga a vida de Davi desde sua unção como rei até sua jornada como salmista...",
    },
    {
      id: "6",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#ffa726",
      icon: "book-open-page-variant",
      title: "Jornada pela História de Abraão",
      description:
        "Viaje com Abraão desde sua chamada por Deus para deixar sua terra até as promessas de Deus...",
    },
    {
      id: "7",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#e57373",
      icon: "book-open-page-variant",
      title: "Jornada pelo Êxodo e a Páscoa",
      description:
        "Relembre a história do êxodo do povo de Israel do Egito, liderado por Moisés...",
    },
    {
      id: "8",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#ffeb3b",
      icon: "book-open-page-variant",
      title: "Jornada pela Vida de José",
      description:
        "Siga a história de José, desde sua venda como escravo até se tornar governador do Egito...",
    },
    {
      id: "9",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#4fc3f7",
      icon: "book-open-page-variant",
      title: "Jornada pelos Milagres do Antigo Testamento",
      description: "Estude os milagres registrados no Antigo Testamento...",
    },
    {
      id: "10",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#ffa726",
      icon: "book-open-page-variant",
      title: "Jornada pelos Dez Mandamentos",
      description:
        "Explore os Dez Mandamentos dados por Deus a Moisés no Monte Sinai...",
    },
    {
      id: "11",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#e57373",
      icon: "book-open-page-variant",
      title: "Jornada pelo Livro de Jó",
      description:
        "Analise a história de Jó e as questões teológicas e existenciais levantadas por seu sofrimento...",
    },
    {
      id: "12",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#ffeb3b",
      icon: "book-open-page-variant",
      title: "Jornada pelos Reis de Israel e Judá",
      description:
        "Estude os reis de Israel e Judá, incluindo suas realizações e quedas...",
    },
    {
      id: "13",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#4fc3f7",
      icon: "book-open-page-variant",
      title: "Jornada pela Criação e o Dilúvio",
      description: "Explore a narrativa da criação e o dilúvio global...",
    },
    {
      id: "14",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#ffa726",
      icon: "book-open-page-variant",
      title: "Jornada pelo Livro de Rute",
      description:
        "Siga a história de Rute e Noemi, destacando temas de lealdade, providência divina e redenção...",
    },
    {
      id: "15",
      collectionId: "1",
      progress: 0.1,
      iconColor: "#e57373",
      icon: "book-open-page-variant",
      title: "Jornada pela Construção do Templo de Salomão",
      description:
        "Aprofunde-se na construção do Templo de Salomão e seu significado espiritual na história de Israel...",
    },
  ];

  const collectionOldTestament: JourneyCollection = {
    id: "1",
    name: "Jornada pelo Antigo Testamento",
    description:
      "Uma série de jornadas que abordam livros, profetas e eventos específicos do Antigo Testamento.",
    journeys: initialJourneysForOldTestament,
  };

  const initialJourneysForPsalmsAndProverbs: Journey[] = [
    {
      id: "1",
      collectionId: "2",
      progress: 0.1,
      iconColor: "#4fc3f7",
      icon: "book-open-page-variant",
      title: "Jornada pelos Salmos de Louvor",
      description:
        "Explore os Salmos para momentos de louvor e adoração a Deus...",
    },
    {
      id: "2",
      collectionId: "2",
      progress: 0.1,
      iconColor: "#ffa726",
      icon: "book-open-page-variant",
      title: "Jornada pelos Salmos de Lamentação",
      description:
        "Reflicta sobre os Salmos que expressam lamentos e buscam consolo...",
    },
    {
      id: "3",
      collectionId: "2",
      progress: 0.1,
      iconColor: "#e57373",
      icon: "book-open-page-variant",
      title: "Jornada pelos Provérbios de Sabedoria",
      description:
        "Aprofunde-se nos Provérbios para obter sabedoria prática para a vida cotidiana...",
    },
    {
      id: "4",
      collectionId: "2",
      progress: 0.1,
      iconColor: "#ffeb3b",
      icon: "book-open-page-variant",
      title: "Jornada pelos Provérbios sobre Relacionamentos",
      description:
        "Estude os Provérbios que oferecem orientações para relacionamentos saudáveis...",
    },
    {
      id: "5",
      collectionId: "2",
      progress: 0.1,
      iconColor: "#4fc3f7",
      icon: "book-open-page-variant",
      title: "Jornada pelos Salmos de Gratidão",
      description:
        "Explore os Salmos que expressam gratidão e reconhecimento pelas bênçãos de Deus...",
    },
    {
      id: "6",
      collectionId: "2",
      progress: 0.1,
      iconColor: "#ffa726",
      icon: "book-open-page-variant",
      title: "Jornada pelos Salmos de Confiança",
      description:
        "Mergulhe nos Salmos que enfatizam a confiança em Deus em tempos de dificuldade...",
    },
    {
      id: "7",
      collectionId: "2",
      progress: 0.1,
      iconColor: "#e57373",
      icon: "book-open-page-variant",
      title: "Jornada pelos Salmos de Sabedoria",
      description:
        "Examine os Salmos que oferecem ensinamentos e conselhos práticos...",
    },
  ];

  const collectionPsalmsAndProverbs: JourneyCollection = {
    id: "2",
    name: "Jornada pelos Salmos e Provérbios",
    description:
      "Explore os Salmos para momentos de louvor e adoração, e os Provérbios para sabedoria prática.",
    journeys: initialJourneysForPsalmsAndProverbs,
  };

  const allCollections: JourneyCollection[] = [
    collectionOldTestament,
    collectionPsalmsAndProverbs,
  ];

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
        <ContentLabel theme={theme} title="Jornadas" />
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
              navigation.navigate("Settings");
            }}
            style={{
              marginLeft: 10,
            }}
          >
            <Ionicons
              name="ios-search-outline"
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
        flex: 1,
        backgroundColor: primaryBackgroundColor(theme),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <SafeAreaView>
        <Header />
        <ScrollView
          style={{
            backgroundColor: primaryBackgroundColor(theme),
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 20,
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#6448FE",
                borderRadius: 20,
                padding: 10,
                width: Dimensions.get("window").width / 2 - 25,
                marginRight: 10,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Todas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme === "light" ? "#E0E0E0" : "#111",
                borderRadius: 20,
                padding: 10,
                width: Dimensions.get("window").width / 2 - 25,
              }}
            >
              <Text style={{ color: primaryTextColor(theme), fontSize: 16 }}>
                Favoritas
              </Text>
            </TouchableOpacity>
          </View>

          {allCollections.map((collection, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                    marginTop: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={{ color: primaryTextColor(theme), fontSize: 20 }}
                  >
                    {collection.name}
                  </Text>
                  <TouchableOpacity>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color={primaryTextColor(theme)}
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  style={{
                    paddingLeft: 20,
                  }}
                >
                  {collection.journeys.map((journey, index) => {
                    if (Number(journey.progress) < 1)
                      return (
                        <View
                          key={index}
                          style={{
                            marginRight: 10,
                            width: 220,
                            backgroundColor: secondaryBackgroundColor(theme),
                            borderRadius: 10,
                            marginBottom: 10,
                            padding: 20,
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginBottom: 20,
                            }}
                          >
                            <MaterialCommunityIcons
                              style={{
                                marginLeft: 10,
                              }}
                              name={journey.icon}
                              size={30}
                              color={journey.iconColor}
                            />
                            <View style={{ marginLeft: 20, width: "75%" }}>
                              <Text
                                style={{
                                  color: primaryTextColor(theme),
                                  fontSize: 14,
                                  textAlign: "left",
                                }}
                              >
                                {journey.title}
                              </Text>
                            </View>
                          </View>
                          <Progress.Bar
                            progress={journey.progress}
                            width={180}
                            height={10}
                            color="#4fc3f7"
                            unfilledColor={
                              theme === "light" ? "#E0E0E0" : "#333"
                            }
                            borderWidth={0}
                            borderRadius={10}
                          />
                        </View>
                      );
                  })}
                  <View
                    style={{
                      width: 30,
                    }}
                  />
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default JourneysScreen;
