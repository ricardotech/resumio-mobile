import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";

import SignIn from "../screens/Login";
import SignUp from "../screens/Register";

export type AuthStackNavigatorParams = {
  SignIn: undefined;
  SignUp: undefined;
};

export type authScreenProp = StackNavigationProp<AuthStackNavigatorParams>;

const AuthStack = createStackNavigator<AuthStackNavigatorParams>();

export function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}
