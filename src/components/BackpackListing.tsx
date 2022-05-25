import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  View,
  Image,
} from 'react-native';
import { BackpackItem } from '../models/BackpackItem';
import { OfferEntry } from '../models/OfferEntry';
import { colors } from '../utils/config';
import { datePrettyPrint } from '../utils/functions';

export default ({ item }: { item: BackpackItem }) => {
  const expiration = new Date(item.entry.expiry);

  return (
    <Pressable onPress={() => console.log('pressed')} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/praygecover.jpg')}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.text_big}>{item.entry.offer.name}</Text>
        <Text style={styles.text_big}>{item.entry.offer.price}$</Text>
        <Text style={styles.text_big}>{item.entry.amount} units</Text>
        <Text style={styles.text_big}>
          Expires on: {datePrettyPrint(expiration)}
        </Text>
        <Text style={styles.text_big}>Taken amount: {item.amount} units</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 10,
    padding: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  imageContainer: {
    padding: 10,
    alignSelf: 'center',
  },
  text_big: {
    color: colors.darkMain,
    borderWidth: 1,
    borderRadius: 10,
    padding: 3,
    borderColor: colors.main,
  },
});
