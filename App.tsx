import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Login } from "./Login";
import { User } from "./models/User";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ShopScreen } from "./screens/ShopScreen";
import { Member } from "./models/Member";
import { MemberLoginScreen } from "./screens/MemberLoginScreen";
import { getUser, login } from "./calls";
import { config } from "./config";
import { Button } from "react-native-paper";
import { AuthContext } from "./context";
import { UserLoginScreen } from "./screens/UserLoginScreen";
import { UserSignupScreen } from "./screens/UserSignupScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SplashScreen } from "./screens/SplashScreen";
import { MemberSignupScreen } from "./screens/MemberSignupScreen";

const AuthStack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Splash = () => {
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

const MemberTabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="Shop" component={ShopScreen} />
  </Tab.Navigator>
);

const UserTabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="Shop" component={ShopScreen} />
  </Tab.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
  >
    <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
    <AuthStack.Screen name="User login" component={UserLoginScreen} />
    <AuthStack.Screen name="User signup" component={UserSignupScreen} />
    <AuthStack.Screen name="Member signup" component={MemberSignupScreen} />
    <AuthStack.Screen name="Member login" component={MemberLoginScreen} />
    <AuthStack.Screen name="User pages" component={UserTabScreen} />
    <AuthStack.Screen name="Member pages" component={MemberTabScreen} />
  </AuthStack.Navigator>
);

export default function App() {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string>(null);
  const [member, setMember] = useState<Member>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mode, setMode] = useState<string>("authMode");
  const [error, setError] = useState<string>(null);

  const authContext = React.useMemo(() => {
    return {
      signInAsUser: (user: User, token: string) => {
        setUser(user);
        setToken(token);
        setMode("userMode");
      },
      signInAsMember: (member: Member, token: string) => {
        setMember(member);
        setToken(token);
        setMode("memberMode");
      },
      signOut: () => {
        setToken(null);
        setUser(null);
        setMember(null);
        setMode("authMode");
      },
      setError: setError,
      error: error,
      user: user,
      member: member,
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (user != null) {
      console.log(user);
    }
  }, [user]);

  useEffect(() => {
    if (member != null) console.log(member);
  }, [member]);

  useEffect(() => {
    if (error != null) Alert.alert(null, JSON.stringify(error));
  }, [error]);

  if (isLoading) {
    return <Splash />;
  }

  const components = {
    userMode: <UserTabScreen />,
    memberMode: <MemberTabScreen />,
    authMode: <AuthStackScreen />,
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>{components[mode]}</NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
