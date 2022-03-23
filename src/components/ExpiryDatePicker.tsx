import React, { useState } from "react";
import { Button } from "react-native";
import DatePicker from "react-native-date-picker";

export default ({ date, setDate }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
