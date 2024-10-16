import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomRadioButton = ({ status, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.radioButton, status && styles.radioButtonSelected]}>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    textAlignVertical: "center",
    alignSelf: "center",
    marginHorizontal: 5,
    top: 6,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    backgroundColor: "transparent",
    borderColor: "#101828",
    justifyContent: "center",
    alignItems: "center",
  },

  radioButtonSelected: {
    backgroundColor: "#101828",
    borderColor: "#101828",
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CustomRadioButton;
