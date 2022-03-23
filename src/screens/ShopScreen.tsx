import * as React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../components/Login";
import { User } from "../models/User";
import { useEffect, useState } from "react";
import { colors, config } from "../utils/config";
import { ActivityIndicator, Colors } from "react-native-paper";
import { OfferEntry } from "../models/OfferEntry";
import { ShopListing } from "../components/ShopListing";
import { AuthContext } from "../utils/context";
import { FooterHeader } from "../templates/FooterHeader";

const renderEntry = ({ item }: { item: OfferEntry }) => (
  <ShopListing item={item} />
);

const getEntries = (setEntries: (a: Array<OfferEntry>) => void) => {
  return fetch(`${config.baseUrl}/offerentry`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status == 200) return response.json();
      return Promise.reject("Could not get any entries :(");
    })
    .then((json) => {
      setEntries(json);
    });
};

export const ShopScreen = ({ navigation }) => {
  const [entries, setEntries] = useState<Array<OfferEntry>>([]);
  const [refresh, setRefresh] = useState<boolean>(true);

  const { setError } = React.useContext(AuthContext);

  useEffect(() => {
    setRefresh(true);
    getEntries(setEntries)
      .catch((e) => console.log(e))
      .finally(() => setRefresh(false));
  }, []);

  const header = <Text style={styles.text_header}>The shop</Text>;
  const footer = (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderEntry}
        refreshing={refresh}
        keyExtractor={(item) => item.id}
        onRefresh={() => {
          setRefresh(true);
          getEntries(setEntries)
            .catch((e) => {
              setError(e);
            })
            .finally(() => setRefresh(false));
        }}
      />
    </SafeAreaView>
  );

  return (
    <FooterHeader
      footerComponent={footer}
      headerComponent={header}
      headerFlex={1}
      footerFlex={4}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  text_header: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 30,
  },
});
