import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from '../components/Login';
import { User } from '../models/User';
import { useEffect, useState } from 'react';
import { colors, config } from '../utils/config';
import {
  ActivityIndicator,
  Button,
  Colors,
  TextInput,
} from 'react-native-paper';
import { OfferEntry } from '../models/OfferEntry';
import { ShopListing } from '../components/ShopListing';
import { AuthContext } from '../utils/context';
import { FooterHeader } from '../templates/FooterHeader';
import { getEntries as getOfferEntries } from '../utils/calls';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../models/ErrorResponse';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { BackpackItem } from '../models/BackpackItem';
import { clone } from 'cloneable-ts';

export const UserShopScreen = ({ navigation }) => {
  const [entries, setEntries] = useState<Array<OfferEntry>>([]);
  const [refresh, setRefresh] = useState<boolean>(true);
  const [pick, setPick] = useState<BackpackItem>(null);

  const { setError, setBackpack, backpack } = React.useContext(AuthContext);

  const getEntries = () => {
    setRefresh(true);
    getOfferEntries()
      .then(setEntries)
      .catch((e: AxiosError<ErrorResponse>) => {
        setError(e.response.data);
      })
      .finally(() => setRefresh(false));
  };

  useEffect(getEntries, []);

  const renderEntry = ({ item }: { item: OfferEntry }) => (
    <ShopListing
      item={item}
      onPress={() => {
        setPick({ id: Math.random().toString(), entry: item, amount: 1 });
      }}
    />
  );

  const [open, setOpen] = useState(false);

  const header = <Text style={styles.text_header}>The shop</Text>;
  const footer = (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderEntry}
        refreshing={refresh}
        keyExtractor={(item) => item.id}
        onRefresh={getEntries}
      />
      {pick != null ? (
        <View style={{ width: 200, height: 400, flex: 0.3 }}>
          <Modal onRequestClose={() => setPick(null)}>
            <TextInput
              value={pick.amount.toString()}
              keyboardType="number-pad"
              onChangeText={(x) => setPick(clone(pick, { amount: Number(x) }))}
            />
            <Button
              onPress={() => {
                if (pick.amount >= 1 && pick.amount <= pick.entry.amount) {
                  // console.log(pick);
                  setBackpack([pick, ...backpack]);
                  setPick(null);
                  // console.log('picked');
                  //console.log(backpack);
                  // console.log([...backpack, clone(pick, { amount: amount })]);
                  return;
                } else return;
              }}
            >
              Pick
            </Button>
          </Modal>
        </View>
      ) : null}
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
    fontWeight: 'bold',
    fontSize: 30,
  },
});
