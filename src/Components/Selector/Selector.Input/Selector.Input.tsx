import React, { useState } from 'react';
import { View, Text, SafeAreaView, VirtualizedList } from 'react-native';
import { CheckBox, Divider, Icon, Input } from 'react-native-elements';
import SearchBarBase from '../../SearchBars/SearchBar.Base/SearchBar.Base';
import { SelectedItem } from '../../../Models/SelectedItem';
import styles from './Selector.Input.styles';
import ChipBase from '../../Chip/Chip.Base/Chip.Base';

type Item = {
  key: string;
  value: string;
  unit?: string;
};

type Props = {
  items?: Item[];
  checkedItems?: SelectedItem[];
  setCheckedItems: (key: string) => void;
  setInput?: (item: SelectedItem) => void;
  title: string;
  input?: boolean;
};

const SelectorInput: React.FC<Props> = ({ items = [], checkedItems = [], setCheckedItems, setInput, title, input = true }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [value, setValue] = useState<string>('');
  const checkedKeys = checkedItems.map((ch) => ch.key);
  const chips = items.filter((i) => checkedKeys.includes(Number(i.key)));

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getItem = (data: Item[], index: number) => ({
    key: data[index].key,
    value: data[index].value,
    unit: data[index].unit,
  });

  const getItemCount = (data: Item[]) => data.length;

  const toggleCheckbox = (key: string) => {
    setCheckedItems(key);
  };

  const handleInputChange = (key: number, quantity: number) => {
    const selectedItem = checkedItems.find((item) => item.key === key);
    if (selectedItem) {
      const updatedItem = new SelectedItem(key, quantity);
      setInput(updatedItem);
    }
  };

  const renderItem = ({ item }: { item: Item }) => {
    const isChecked = checkedKeys.includes(Number(item.key));
    const selectedItem = checkedItems.find((f) => f.key === Number(item.key));
    const inputValue = selectedItem ? String(selectedItem.quantity) : '';

    return (
      <View style={styles.itemContainer}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={isChecked}
            onPress={() => toggleCheckbox(item.key)}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#009688"
          />
        </View>
        <Text style={styles.itemValue}>{item.value}</Text>
        {input && 
        <View>
        <View style={styles.inputContainer}>
          <Input
            disabled={!isChecked}
            style={styles.input}
            value={inputValue}
            onChangeText={(text) => handleInputChange(Number(item.key), Number(text))}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.unitText}>{item.unit}</Text>
        </View>
        }
        
      </View>
    );
  };

  return (
    <SafeAreaView style={title === "Potraviny"? styles.containerFood : styles.containerRecipe}>
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
          <View>
            <SearchBarBase value={value} setter={setValue} />
          </View>
          <View style={styles.list}>
            <VirtualizedList
              data={items.filter((item) => !value || item.value.toLowerCase().includes(value.toLowerCase()))}
              initialNumToRender={10}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              getItemCount={getItemCount}
              getItem={getItem}
            />
          </View>
        </View>
      )}
      <Divider style={styles.divider} />
      <View>
        <ChipBase items={chips} />
      </View>
    </SafeAreaView>
  );
};


export default SelectorInput;
