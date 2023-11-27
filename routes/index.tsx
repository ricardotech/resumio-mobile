import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/auth.context";

import { UserRoutes } from "./user.routes";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../screens/Loading";

import { useNavigation } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";

export default function Routes() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(true);

  const { user, token, signOut } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [user]);

  if (loading) return <Loading />;

  if (user) {
    return <UserRoutes />;
  } else return <AuthRoutes />;
}
