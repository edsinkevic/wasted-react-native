import * as React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../Login";
import { User } from "../models/User";
import { useEffect, useState } from "react";
import { config } from "../config";
import { ActivityIndicator, Colors } from "react-native-paper";

interface Vendor {
  id: string;
  name: string;
}

interface Offer {
  id: string;
  addedBy: Vendor;
  name: string;
  weight: string;
  category: string;
}

interface OfferEntry {
  id: string;
  offer: Offer;
  expiry: Date;
  added: Date;
  amount: number;
}

const renderEntry = ({ item }: { item: OfferEntry }) => (
  <TouchableOpacity
    style={{ borderColor: Colors.black }}
    onPress={() => console.log("pressed")}
  >
    <Text style={{ color: Colors.black }}>{item.offer.name}</Text>
    <Text style={{ color: Colors.black }}>{item.offer.weight}</Text>
    <Text style={{ color: Colors.black }}>{item.amount}</Text>
    <Text style={{ color: Colors.black }}>{item.offer.addedBy.name}</Text>
    <Text style={{ color: Colors.black }}>{item.expiry.toDateString}</Text>
  </TouchableOpacity>
);

const getEntries = (setEntries: (a: Array<OfferEntry>) => void, setRefresh) => {
  setRefresh(true);
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
    })
    .finally(() => setRefresh(false));
};

export const ShopScreen = ({ navigation }) => {
  const [entries, setEntries] = useState<Array<OfferEntry>>([]);
  const [refresh, setRefresh] = useState<boolean>(true);
  useEffect(() => {
    getEntries(setEntries, setRefresh)
      .catch((e) => console.log(e))
      .finally(() => setRefresh(false));
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 100,
        alignItems: "baseline",
        justifyContent: "center",
      }}
    >
      <FlatList
        style={{
          paddingTop: 100,
          borderColor: Colors.black,
          shadowColor: Colors.black,
        }}
        data={entries}
        renderItem={renderEntry}
        refreshing={refresh}
        keyExtractor={(item) => item.id}
        onRefresh={() => {
          getEntries(setEntries, setRefresh).catch((e) => {
            console.log(e);
          });
        }}
      />
    </SafeAreaView>
  );
};
