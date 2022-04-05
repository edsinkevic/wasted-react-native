import { FooterHeader } from '../templates/FooterHeader';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/config';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/context';
import BackpackListing from '../components/BackpackListing';

export default () => {
  const { setBackpack, backpack } = useContext(AuthContext);

  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    setRefresh(true);
    setRefresh(false);
    console.log(backpack);
  }, [backpack]);

  const header = <Text style={styles.title}>Welcome</Text>;
  const footer = (
    <View>
      <FlatList
        data={backpack}
        refreshing={refresh}
        onRefresh={() => setRefresh(false)}
        renderItem={BackpackListing}
        ListEmptyComponent={<Text>There aren't any items...</Text>}
      />
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
