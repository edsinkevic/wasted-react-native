import React, { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { Button } from "react-native-paper";

export default ({ selectedDate, setSelectedDate, setOpen }) => {
  return (
    <>
      <DatePicker onSelectedChange={(date) => setSelectedDate(date)} />
      <Button onPress={() => setOpen(false)}>Close </Button>
    </>
  );
};
