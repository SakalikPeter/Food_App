import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, VirtualizedList } from 'react-native';
import { CheckBox, Chip, Divider, Icon, Input } from 'react-native-elements';
import BaseSearchBar from '../SearchBars/BaseSearchBar/BaseSearchBar';
import { SelectedItem } from '../../Models/SelectedItem';

type Item = {
  key: string;
  value: string;
  unit?: string;
};

type Props = {
  items?: Item[];
  checkedItems?: SelectedItem[];
  setCheckedItems: (key: string) => void;
  setInput: (item: SelectedItem) => void;
  title: string;
};

const Selector: React.FC<Props> = ({ items = [], checkedItems = [], setCheckedItems, setInput, title }) => {
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
        <View style={styles.inputContainer}>
          <Input
            disabled={!isChecked}
            style={styles.input}
            value={inputValue}
            onChangeText={(text) => handleInputChange(Number(item.key), Number(text))}
            keyboardType="numeric"
          />
        </View>
        <Text style={{ fontSize: 16, marginLeft: 4 }}>{item.unit}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
            <BaseSearchBar value={value} setter={setValue} />
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
      <View style={styles.chipsContainer}>
        {chips.map((c) => (
          <Chip key={c.key} title={c.value} containerStyle={styles.chip} />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  iconContainer: {
    marginLeft: 'auto',
    paddingRight: 10,
  },
  icon: {
    fontSize: 24,
    paddingRight: 10,
  },
  selectorWrapper: {
    marginTop: 16,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#e0e0e0',
  },
  input: {
    flex: 1,
  },
  content: {
    marginTop: 16,
  },
  list: {
    maxHeight: 200,
    marginTop: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemKey: {
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  itemValue: {
    color: '#555',
    flex: 1,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  inputContainer: {
    flex: 0.75,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    marginVertical: 5,
    marginRight: 5,
  },
});

export default Selector;
