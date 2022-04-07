import { FooterHeader } from '../templates/FooterHeader';
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/config';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/context';
import { BackpackItem } from '../models/BackpackItem';
import { Button, TextInput } from 'react-native-paper';
import { clone } from 'cloneable-ts';
import { OfferEntry } from '../models/OfferEntry';
import { ShopListing } from '../components/ShopListing';
import BackpackListing from '../components/BackpackListing';
import { ReservationCreate } from '../models/ReservationCreate';
import { registerReservation } from '../utils/calls';
import { Reservation } from '../models/Reservation';
import { UserLoginScreen } from './UserLoginScreen';
import { User } from '../models/User';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../models/ErrorResponse';

export default ({ navigation }) => {
  const {
    setBackpack,
    backpack,
    user,
    setUser,
    setError,
  }: {
    setBackpack: any;
    backpack: BackpackItem[];
    user: User;
    setUser: (x: User) => void;
    setError: (x: ErrorResponse) => void;
  } = useContext(AuthContext);
  const [pick, setPick] = useState<BackpackItem>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const listingOnPress = (func, item) => {
    const newAmount = func(item.amount);
    if (newAmount >= 1 && newAmount <= item.entry.amount)
      setBackpack(
        backpack.map((entry) => {
          if (entry.entry.id === item.entry.id)
            return clone(entry, { amount: newAmount });
          else return entry;
        }),
      );
  };

  const reserve = () => {
    const create: ReservationCreate = {
      customerId: user.id,
      items: backpack.map((item) => {
        return {
          amount: item.amount,
          entryId: item.entry.id,
          entryAmount: item.entry.amount,
        };
      }),
    };
    console.log(JSON.stringify(create));

    setRefresh(true);
    registerReservation(create)
      .then((res) => setUser(clone(user, { reservations: [res] })))
      .catch((e: AxiosError<ErrorResponse>) => setError(e.response.data))
      .finally(() => setRefresh(false));
    return;
  };

  const renderEntry = ({ item }: { item: BackpackItem }) => (
    <>
      <BackpackListing item={item} />
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <Button
          onPress={() => listingOnPress((x) => x + 1, item)}
          onLongPress={() => listingOnPress((x) => x + 10, item)}
        >
          More
        </Button>
        <Button
          onPress={() => listingOnPress((x) => x - 1, item)}
          onLongPress={() => listingOnPress((x) => x - 10, item)}
        >
          Less
        </Button>
        <Button
          onPress={() => setBackpack(backpack.filter((x) => x.id != item.id))}
        >
          Remove
        </Button>
      </View>
    </>
  );

  const calculateBackpack = () =>
    backpack.reduce(
      (previous, current) =>
        previous + current.amount * current.entry.offer.price,
      0,
    );

  const header = <Text style={styles.title}>Welcome</Text>;

  const footer = (
    <View>
      {backpack.length > 0 ? (
        <>
          <Button onPress={reserve}>Reserve</Button>
          <Text>Total price: {calculateBackpack()}</Text>
        </>
      ) : null}
      <FlatList
        data={backpack}
        refreshing={refresh}
        onRefresh={() => setRefresh(false)}
        renderItem={renderEntry}
        ListEmptyComponent={<Text>There aren't any items...</Text>}
      />
      {pick !== null ? (
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
                  setBackpack([pick, ...backpack]);
                  setPick(null);
                  return;
                } else return;
              }}
            >
              Pick
            </Button>
          </Modal>
        </View>
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
    backgroundColor: colors.main,
  },
  title: {
    color: colors.secondary,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
