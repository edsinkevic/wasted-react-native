import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Login } from './src/components/Login';
import { User } from './src/models/User';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ShopScreen } from './src/screens/ShopScreen';
import { Member } from './src/models/Member';
import { MemberLoginScreen } from './src/screens/MemberLoginScreen';
import { getReservation, getUser, login } from './src/utils/calls';
import { config } from './src/utils/config';
import { Button } from 'react-native-paper';
import { AuthContext } from './src/utils/context';
import { UserLoginScreen } from './src/screens/UserLoginScreen';
import { UserSignupScreen } from './src/screens/UserSignupScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { MemberSignupScreen } from './src/screens/MemberSignupScreen';
import { CustomerDrawer } from './src/components/CustomerDrawer';
import { MemberDrawer } from './src/components/MemberDrawer';
import { RegisterOfferScreen } from './src/screens/RegisterOfferScreen';
import { RegisterEntryScreen } from './src/screens/RegisterEntryScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import MemberOverviewScreen from './src/screens/MemberOverviewScreen';
import { ErrorResponse } from './src/models/ErrorResponse';
import { BackpackItem } from './src/models/BackpackItem';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';
import { UserShopScreen } from './src/screens/UserShopScreen';
import { Reservation } from './src/models/Reservation';
import ReservationScreen from './src/screens/ReservationScreen';
import { ConfirmReservationScreen } from './src/screens/ConfirmReservationScreen';

const AuthStack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const MemberTabScreen = () => (
  <Drawer.Navigator
    drawerContent={(props) => <MemberDrawer {...props} />}
    screenOptions={{
      swipeEdgeWidth: 300,
      headerShown: false,
      swipeEnabled: true,
    }}
  >
    <Drawer.Screen name="Shop" component={ShopScreen} />
    <Drawer.Screen name="Register items" component={RegisterOfferScreen} />
    <Drawer.Screen name="Register entries" component={RegisterEntryScreen} />
    <Drawer.Screen name="Overview" component={MemberOverviewScreen} />
    <Drawer.Screen
      name="Confirm reservation"
      component={ConfirmReservationScreen}
    />
  </Drawer.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{ headerShown: false, animation: 'fade' }}
  >
    <AuthStack.Screen name="SplashScreen" component={WelcomeScreen} />
    <AuthStack.Screen name="User login" component={UserLoginScreen} />
    <AuthStack.Screen name="User signup" component={UserSignupScreen} />
    <AuthStack.Screen name="Member signup" component={MemberSignupScreen} />
    <AuthStack.Screen name="Member login" component={MemberLoginScreen} />
    <AuthStack.Screen name="User pages" component={UserDrawerScreen} />
    <AuthStack.Screen name="Member pages" component={MemberTabScreen} />
  </AuthStack.Navigator>
);

const UserDrawerScreen = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomerDrawer {...props} />}
    screenOptions={{
      swipeEdgeWidth: 300,
      headerShown: false,
      swipeEnabled: true,
    }}
  >
    <Drawer.Screen name="Shop" component={UserShopScreen} />
    <Drawer.Screen name="Shopping cart" component={ShoppingCartScreen} />
    <Drawer.Screen name="Reservation" component={ReservationScreen} />
  </Drawer.Navigator>
);

export default function App() {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string>(null);
  const [member, setMember] = useState<Member>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mode, setMode] = useState<string>('authMode');
  const [error, setError] = useState<ErrorResponse>(null);
  const [backpack, setBackpack] = useState<BackpackItem[]>([]);
  const [reservation, setReservation] = useState<Reservation>(null);

  const authContext = React.useMemo(() => {
    return {
      signInAsUser: (user: User, token: string) => {
        setUser(user);
        setToken(token);
        setMode('userMode');
      },
      signInAsMember: (member: Member, token: string) => {
        setMember(member);
        setToken(token);
        setMode('memberMode');
      },
      signOut: () => {
        setToken(null);
        setUser(null);
        setMember(null);
        setBackpack([]);
        setMode('authMode');
      },
      backpack: backpack,
      setBackpack: setBackpack,
      setError: setError,
      error: error,
      user: user,
      setUser: setUser,
      member: member,
      reservation: reservation,
      setReservation: setReservation,
    };
  }, [user, member, error, backpack, reservation]);

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
    if (error != null) {
      Alert.alert(null, JSON.stringify(error));
      setError(null);
    }
  }, [error]);

  if (isLoading) {
    return <SplashScreen />;
  }

  const components = {
    userMode: <UserDrawerScreen />,
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
