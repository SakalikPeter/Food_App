import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const BaseSearchBar = ({value, setter}) => {

  const onChangeSearch = (query: string) => setter(query);

  return (
   <View>
    <Searchbar
      placeholder="Hladaj..."
      onChangeText={onChangeSearch}
      value={value}
    />
   </View>

  );
};

export default BaseSearchBar;