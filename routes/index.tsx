import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/auth.context";

import { UserRoutes } from "./user.routes";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../screens/Loading";

import { useNavigation } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useService } from "../contexts/service.context";

export default function Routes() {
  const navigation = useNavigation();

  const { user, loading } = useContext(AuthContext);
  const { loadingServices } = useService();

  if (loading || loadingServices) return <Loading />;

  if (user) {
    return <UserRoutes />;
  } else return <AuthRoutes />;
}
