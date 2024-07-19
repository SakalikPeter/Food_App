import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-elements';
import styles from './Chip.Base.styles';

type Item = {
  key: string;
  value: string;
};

type ChipProps = {
  items?: Item[];
};


const ChipBase: React.FC<ChipProps> = ({ items }) => {
  // Sort items by value in ascending order
  const sortedItems = items.sort((a, b) => a.value.localeCompare(b.value));

  return (
    <View style={styles.chipsContainer}>
      {sortedItems.map((item) => (
        <Chip key={item.key} title={item.value} containerStyle={styles.chip} buttonStyle={styles.chipButton} titleStyle={styles.chipTitle}/>
      ))}
    </View>
  );
};

export default ChipBase;
