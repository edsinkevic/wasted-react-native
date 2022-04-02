import { useLinkProps } from "@react-navigation/native";
import React from "react";
import { Button } from "react-native-paper";
import { colors } from "../utils/config";

export const WastedButton = ({ text, ...props }) => (
  <Button color={colors.darkerMain} {...props}>
    {text}
  </Button>
);
