import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  LayoutChangeEvent,
} from "react-native";
import { ContentLabel } from "../../components/ContentLabel";
import { authScreenProp } from "../../routes/user.routes";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  primaryBackgroundColor,
  primaryTextColor,
  secondaryBackgroundColor,
  tertiaryBackgroundColor,
} from "../../utils/style";
import { useTheme } from "../../contexts/theme.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { books, booksData } from "../../db";
import { useService } from "../../contexts/service.context";
import { fetchData, removeAccents } from "../../utils/services";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ProgressChapter } from "../../firestore/models/Progress";

const Filters = ({
  searchTerm,
  setSearchTerm,
  setFilteredBooks,
  activeFilter,
  setActiveFilter,
}: {
  searchTerm: string;
  setSearchTerm: any;
  setFilteredBooks: any;
  activeFilter: "search" | "old" | "new" | undefined;
  setActiveFilter: any;
}) => {
  const { theme } = useTheme();

  const searchTextInputRef = useRef<TextInput>(null);

  const horizontalScrollViewRef = useRef<ScrollView>(null);
  const filterPositions = useRef<{ [key: string]: number }>({}).current;

  const onFilterLayout = (event: LayoutChangeEvent, filterValue: string) => {
    filterPositions[filterValue] = event.nativeEvent.layout.x;
  };

  useEffect(() => {
    if (activeFilter && horizontalScrollViewRef.current) {
      const position = filterPositions[activeFilter];
      if (position !== undefined) {
        horizontalScrollViewRef.current.scrollTo({
          x: position - 200,
          animated: true,
        });
      }
    }
  }, [activeFilter]);

  const Filter = ({
    title,
    onPress,
    filterValue,
  }: {
    title?: string;
    onPress: () => void;
    filterValue: string;
  }) => {
    return (
      <Pressable
        onLayout={(event) => onFilterLayout(event, filterValue)}
        onPress={onPress}
        style={{
          marginRight: 10,
          height: 35,
          paddingHorizontal: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            filterValue === activeFilter
              ? "tomato"
              : tertiaryBackgroundColor(theme),
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: primaryTextColor(theme),
          }}
        >
          {title}
        </Text>
      </Pressable>
    );
  };

  const handleAntigoTestamentoPress = () => {
    if (activeFilter === "old") {
      setFilteredBooks(books);
      setActiveFilter(undefined);
    } else {
      setActiveFilter("old");

      const mateusIndex = books.findIndex((book) => book === "Mateus");

      const antigoTestamentoBooks = books.filter(
        (book, index) => index < mateusIndex
      );

      setFilteredBooks(antigoTestamentoBooks);
    }
  };

  const handleNovoTestamentoPress = () => {
    if (activeFilter === "new") {
      setFilteredBooks(books);
      setActiveFilter(undefined);
    } else {
      setActiveFilter("new");

      const mateusIndex = books.findIndex((book) => book === "Mateus");

      const antigoTestamentoBooks = books.filter(
        (book, index) => index > mateusIndex - 1
      );

      setFilteredBooks(antigoTestamentoBooks);
    }
  };

  return (
    <View
      style={{
        paddingBottom: 15,
      }}
    >
      <ScrollView
        ref={horizontalScrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingLeft: 20,
        }}
      >
        {activeFilter === "search" ? (
          <View
            style={{
              backgroundColor: tertiaryBackgroundColor(theme),
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: 130,
              height: 35,
              paddingHorizontal: 10,
              marginRight: 10,
            }}
          >
            <TextInput
              ref={searchTextInputRef}
              style={{
                width: "85%",
                color: primaryTextColor(theme),
              }}
              onChangeText={(e) => {
                setSearchTerm(e);
              }}
              value={searchTerm}
            />
            <Pressable
              onPress={() => {
                setSearchTerm("");
                setActiveFilter(undefined);
              }}
            >
              <Ionicons
                style={{}}
                name="close"
                size={16}
                color={primaryTextColor(theme)}
              />
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => {
              setActiveFilter("search");
              setSearchTerm("");

              searchTextInputRef.current?.focus();
            }}
            style={{
              backgroundColor: tertiaryBackgroundColor(theme),
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: 35,
              height: 35,
              paddingHorizontal: 10,
              marginRight: 10,
            }}
          >
            {searchTerm.length > 0 ? (
              <Pressable
                onPress={() => {
                  setSearchTerm("");
                  setActiveFilter(undefined);
                }}
              >
                <Ionicons
                  style={{}}
                  name="close"
                  size={16}
                  color={primaryTextColor(theme)}
                />
              </Pressable>
            ) : (
              <Ionicons
                style={{}}
                name="search"
                color={primaryTextColor(theme)}
              />
            )}
          </Pressable>
        )}
        <Filter
          filterValue="old"
          title="Antigo Testamento"
          onPress={handleAntigoTestamentoPress}
        />
        <Filter
          filterValue="new"
          title="Novo Testamento"
          onPress={handleNovoTestamentoPress}
        />
        <View
          style={{
            width: 30,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default function BibleScreen() {
  const navigation = useNavigation<authScreenProp>();

  const { theme, changeTheme } = useTheme();
  const { userChaptersProgress } = useService();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const textInputRef = useRef<TextInput>();

  const [filteredBooks, setFilteredBooks] = useState<string[]>([]);

  const [activeFilter, setActiveFilter] = useState<
    "search" | "old" | "new" | undefined
  >();

  useEffect(() => {
    if (searchTerm) {
      const search = removeAccents(searchTerm.toLowerCase());
      setFilteredBooks(
        books.filter((book) =>
          removeAccents(book.toLowerCase()).includes(search)
        )
      );
    } else {
      setFilteredBooks(books);
    }
  }, [searchTerm]);

  const isBookRead = (book: string) => {
    const bookIndex = books.findIndex((b) => b === book);
    const totalChapters = booksData[bookIndex].chapters;
    const readChapters = userChaptersProgress?.filter(
      (progress) => progress.book === book
    );
    return readChapters?.length === totalChapters;
  };

  const BookItem = ({ book }: { book: string }) => (
    <Pressable
      onPress={() => navigation.navigate("Book", { book })}
      style={{
        flexDirection: "row",
        height: 60,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: tertiaryBackgroundColor(theme),
        marginTop: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: primaryTextColor(theme),
        }}
      >
        {book}
      </Text>
      {isBookRead(book) && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: primaryTextColor(theme),
          }}
        >
          ✅
        </Text>
      )}
    </Pressable>
  );

  const Content = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ width: "90%", alignSelf: "center" }}
    >
      {filteredBooks.map((book: string, index: number) => (
        <BookItem key={index} book={book} />
      ))}
      <View style={{ height: 90 }} />
    </ScrollView>
  );

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
          <ContentLabel theme={theme} title="Bíblia" />
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
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <SafeAreaView>
        <Header />
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setFilteredBooks={setFilteredBooks}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <Content />
      </SafeAreaView>
    </View>
  );
}
