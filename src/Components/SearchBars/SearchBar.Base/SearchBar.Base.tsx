import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styles from './SearchBar.Base.styles';

const SearchBarBase = ({value, setter}) => {

  const onChangeSearch = (query: string) => setter(query);

  return (
   <View>
    <Searchbar
      style={styles.searchBar}
      placeholder="Hladaj..."
      onChangeText={onChangeSearch}
      value={value}
    />
   </View>

  );
};

export default SearchBarBase;