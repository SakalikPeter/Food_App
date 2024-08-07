import React, { useState } from 'react';
import { View, Text, SafeAreaView, VirtualizedList } from 'react-native';
import { CheckBox, Chip, Divider, Icon } from 'react-native-elements';
import styles from './Selector.Base.styles';
import ChipBase from '../../Chip/Chip.Base/Chip.Base';

type Item = {
  key: number;
  value: string;
};

type Props = {
  items?: Item[];
  checkedValue?: string[];
  setCheckedItems: (value: string[]) => void;
  title: string;
  multi?: boolean;
};

const SelectorBase: React.FC<Props> = ({ items = [], checkedValue, setCheckedItems, title, multi = false }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getItem = (data: Item[], index: number) => ({
    key: data[index].key,
    value: data[index].value,
  });

  const getItemCount = (data: Item[]) => data.length;

const toggleCheckbox = (value: string) => {
  if (multi) {
    if (checkedValue.includes(value)) {
      setCheckedItems(checkedValue.filter(item => item !== value));
    } else {
      setCheckedItems([...checkedValue, value]);
    }
  } else {
    setCheckedItems(value === checkedValue[0] ? [] : [value]);
  }
};


  const renderItem = ({ item }: { item: Item }) => {
    const isChecked = checkedValue.includes(item.value)

    return (
      <View style={styles.itemContainer}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={isChecked}
            onPress={() => toggleCheckbox(item.value)}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#009688"
          />
        </View>
        <Text style={styles.itemValue}>{item.value}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={title === "Potraviny"? styles.container : styles.containerTag}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconContainer}>
          <Icon
            name={collapsed ? 'expand-more' : 'expand-less'}
            type="material"
            color="#70d7c7"
            onPress={toggleCollapse}
            style={styles.icon}
          />
        </View>
      </View>
      {!collapsed && (
        <View style={styles.selectorWrapper}>
          <View style={styles.list}>
            <VirtualizedList
              data={items}
              initialNumToRender={10}
              renderItem={renderItem}
              keyExtractor={(item) => item.key.toString()}
              getItemCount={getItemCount}
              getItem={getItem}
            />
          </View>
        </View>
      )}
      <Divider style={styles.divider} />
      <View>
        <ChipBase items={checkedValue.map((item) => ({ key: item, value: item })
      )} />
      </View>
    </SafeAreaView>
  );
};

export default SelectorBase;
