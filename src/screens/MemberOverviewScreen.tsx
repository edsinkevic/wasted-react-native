import { FooterHeader } from "../templates/FooterHeader";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { colors } from "../utils/config";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/context";
import { Member } from "../models/Member";
import { Offer } from "../models/Offer";
import { getOffersByVendorName } from "../utils/calls";
import { SplashScreen } from "./SplashScreen";
import OfferListing from "../components/OfferListing";
import OfferOverviewScreen from "./OfferOverviewScreen";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

export default ({ navigation }) => {
  const { member, setError }: { member: Member; setError: () => void } =
    useContext(AuthContext);

  const [offers, setOffers] = useState<Array<Offer>>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [picked, pick] = useState(null);

  const renderOffer = ({ item }) => (
    <OfferListing
      item={item}
      onPress={() => {
        pick(item);
        setOpen(true);
      }}
    />
  );

  useEffect(() => {
    setLoading(true);
    getOffersByVendorName(member.vendor.name)
      .then(setOffers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <SplashScreen />;

  const header = <Text style={styles.text_header}>{member.vendor.name}</Text>;

  const footer = (
    <View style={styles.container}>
      <Text style={styles.list_header}>Your offers</Text>
      <FlatList
        refreshing={refresh}
        onRefresh={() => {
          setRefresh(true);
          getOffersByVendorName(member.vendor.name)
            .then(setOffers)
            .catch(setError)
            .finally(() => setRefresh(false));
        }}
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={renderOffer}
      />
      {open ? (
        <OfferOverviewScreen
          visible={open}
          setVisible={setOpen}
          offer={picked}
          onSuccess={(offer) => {
            setOpen(!open);
            setRefresh(true);
          }}
        />
      ) : null}
    </View>
  );

  return (
    <FooterHeader
      headerComponent={header}
      footerComponent={footer}
      headerFlex={1}
      footerFlex={3}
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
  list_header: {
    color: colors.main,
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    paddingBottom: 30,
  },
});
