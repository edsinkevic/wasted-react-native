import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/config";

export const FooterHeader = ({
  headerComponent,
  footerComponent,
  headerFlex,
  footerFlex,
}) => (
  <View style={styles(headerFlex, footerFlex).container}>
    <View style={styles(headerFlex, footerFlex).header}>{headerComponent}</View>
    <View style={styles(headerFlex, footerFlex).footer}>{footerComponent}</View>
  </View>
);

const styles = (headerFlex, footerFlex) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.main,
    },
    header: {
      flex: headerFlex,
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      flex: footerFlex,
      backgroundColor: "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30,
    },
  });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.purple100,
//   },

//   text: {
//     color: "grey",
//     marginTop: 5,
//   },
//   button: {
//     alignItems: "flex-end",
//     marginTop: 30,
//   },
//   signIn: {
//     width: 150,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 50,
//     flexDirection: "row",
//   },
//   textSign: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });
