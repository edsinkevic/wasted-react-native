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
import { registerReservation } from '../utils/calls';
import { Reservation } from '../models/Reservation';
import { UserLoginScreen } from './UserLoginScreen';
import { User } from '../models/User';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../models/ErrorResponse';
import { ReservationItem } from '../models/ReservationItem';
import moment from 'moment';

export default () => {
  const { user }: { user: User } = useContext(AuthContext);

  const reservation = user.reservations[0];

  const [currentTime, setCurrentTime] = useState(moment());
  const timeBetween = moment.duration(
    moment(reservation.expirationDate).diff(currentTime),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
      <Text>
        Timeleft: {timeBetween.hours()}:{timeBetween.minutes()}:
        {timeBetween.seconds()}
      </Text>
      <FlatList data={reservation.reservationItems} renderItem={renderEntry} />
    </View>
  );

  return user.reservations.length > 0 ? (
    <FooterHeader
      headerComponent={header}
      footerComponent={footer}
      headerFlex={1}
      footerFlex={4}
    />
  ) : (
    <Text style={styles.title}>No reservation</Text>
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
