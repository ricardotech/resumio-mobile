import React from "react";
import Routes from "./routes";

import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./contexts/auth.context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./contexts/theme.context";
import { ServicesProvider } from "./contexts/service.context";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <ServicesProvider>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </ServicesProvider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
