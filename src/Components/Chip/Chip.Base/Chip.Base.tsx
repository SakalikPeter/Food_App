import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-elements';

type ChipProps = {
  value: string;
  quantity: number;
  unit: string;
};

const ChipBase: React.FC<ChipProps> = ({ value, quantity, unit }) => {
  const title: string = value + " " + quantity + " " + unit;

  return (
    <View>
      <Chip title={title} containerStyle={{ marginVertical: 15 }} />
    </View>
  );
};

export default ChipBase;
