import React from "react";
import { View, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";

const BaseSearchBar = ({value, setValue}) => {
  return (
    <View style={styles.searchContainer}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(newVal) => {
            setValue(newVal);
        }}
        value={value}
        round
      />
    </View>
  );
};

export default BaseSearchBar;

const styles = StyleSheet.create({

    searchContainer: {
      padding: 10,
    },})