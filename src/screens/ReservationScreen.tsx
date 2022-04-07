import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FooterHeader } from '../templates/FooterHeader';
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
import { cancelReservation, registerReservation } from '../utils/calls';
import { Reservation } from '../models/Reservation';
import { UserLoginScreen } from './UserLoginScreen';
import { User } from '../models/User';
import { Axios, AxiosError } from 'axios';
import { ErrorResponse } from '../models/ErrorResponse';
import { ReservationItem } from '../models/ReservationItem';
import moment from 'moment';
import { WastedButton } from '../components/WastedButton';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

export default ({ navigation }) => {
  const {
    user,
    setUser,
    setError,
  }: {
    user: User;
    setUser: (x: User) => void;
    setError: (x: ErrorResponse) => void;
  } = useContext(AuthContext);

  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (user.reservations.length == 0)
    return (
      <FooterHeader
        headerComponent={
          <Text style={styles.title}>You haven't reserved anything</Text>
        }
        footerComponent={<></>}
        headerFlex={3}
        footerFlex={1}
      />
    );

  const reservation = user.reservations[0];

  const timeBetween = moment.duration(
    moment(reservation.expirationDate).diff(currentTime),
  );

  const renderEntry = ({ item }: { item: ReservationItem }) => (
    <>
      <BackpackListing
        item={{ id: item.id, amount: item.amount, entry: item.entry }}
      />
    </>
  );
  const header = <Text style={styles.title}>{reservation.code}</Text>;
  const footer = (
    <View>
      <WastedButton
        onPress={() => {
          cancelReservation(reservation.id)
            .then((res) => setUser(clone(user, { reservations: [] })))
            .catch((e: AxiosError<ErrorResponse>) => {
              console.log(e);
              setError(e.response.data);
            });
        }}
        text="Cancel"
      />
      <Text>
        Timeleft: {timeBetween.hours()}:{timeBetween.minutes()}:
        {timeBetween.seconds()}
      </Text>
      <FlatList data={reservation.reservationItems} renderItem={renderEntry} />
    </View>
  );

  return (
    <FooterHeader
      headerComponent={header}
      footerComponent={footer}
      headerFlex={1}
      footerFlex={4}
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
