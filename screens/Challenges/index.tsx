import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { ContentLabel } from "../../components/ContentLabel";

const LeaderboardScreen = () => {
  const leaderboardData = [
    {
      id: "1",
      name: "João Gustavo",
      xp: "948 XP",
      rank: 1,
      imageUri: "https://github.com/ricardotech.png",
    },
    {
      id: "2",
      name: "Andrew",
      xp: "872 XP",
      rank: 2,
      imageUri: "https://github.com/andrew.png",
    },
    {
      id: "3",
      name: "Charlotte",
      xp: "769 XP",
      rank: 3,
      imageUri: "https://github.com/charlotte.png",
    },
    // ...other users
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
        <ContentLabel title="Desafios" />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              marginLeft: 15,
            }}
          >
            <Ionicons name="ios-trophy-outline" color="#333" size={30} />
          </TouchableOpacity>
 
        </View>
      </View>
    );
  };

  const reorderLeaderboard = (data: any) => {
    const first = data.find((user: any) => user.rank === 1);
    const second = data.find((user: any) => user.rank === 2);
    const third = data.find((user: any) => user.rank === 3);

    return [second, first, third, ...data.filter((user: any) => user.rank > 3)];
  };

  const renderPodium = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-end",
          paddingTop: 20,
          paddingBottom: 50,
          backgroundColor: "#FFF", // Alterado para o novo fundo
        }}
      >
        {reorderLeaderboard(leaderboardData).map((user, index) => (
          <View
            key={user.id}
            style={{
              alignItems: "center",
              marginBottom: user.rank === 1 ? 30 : -30,
            }}
          >
            <Image
              source={{ uri: user.imageUri }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                borderWidth: 3,
                borderColor: "tomato", // Alterado para a cor tomato
                marginBottom: 10,
              }}
            />
            <Text
              style={{
                color: "tomato", // Alterado para a cor tomato
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {user.name}
            </Text>
            <Text style={{ color: "tomato", fontSize: 16 }}>{user.xp}</Text>
            {/* Alterado para a cor tomato */}
            <Text style={{ color: "tomato", fontSize: 24, fontWeight: "bold" }}>
              {user.rank}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderUserItem = ({
    item,
  }: {
    item: {
      id: string;
      name: string;
      xp: string;
      rank: number;
      imageUri: string;
    };
  }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#F0F0F0", // Alterado para o novo fundo
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "tomato", // Alterado para a cor tomato
          marginRight: 10,
        }}
      >
        {item.rank}
      </Text>
      <Image
        source={{ uri: item.imageUri }}
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
      />
      <Text style={{ fontSize: 18, color: "tomato", flex: 1 }}>
        {item.name}
      </Text>
      <Text style={{ fontSize: 16, color: "tomato" }}>{item.xp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <Header />
      <FlatList
        ListHeaderComponent={
          <>
            {renderPodium()}
          </>
        }
        data={leaderboardData}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
