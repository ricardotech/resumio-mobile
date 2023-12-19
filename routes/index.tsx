import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/auth.context";

import { UserRoutes } from "./user.routes";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../screens/Loading";

import { useNavigation } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";

export default function Routes() {
  const navigation = useNavigation();

  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading />;

  if (user) {
    return <UserRoutes />;
  } else return <AuthRoutes />;
}
