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
  setCheckedItems: (key: string)=>void
  setInput: (item: SelectedItem) => void
  title: string;
};

const Selector: React.FC<Props> = ({ items = [], checkedItems = [], setCheckedItems, setInput, title }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [value, setValue] = useState<string>("");
  const checkedKeys = checkedItems.map((ch) => ch.key)
  console.log("checked: ", checkedKeys)
  const chips = items.filter((i) => checkedKeys.includes(Number(i.key)))

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getItem = (data: Item[], index: number) => ({
    key: data[index].key,
    value: data[index].value,
    unit: data[index].unit
  });

  const getItemCount = (data: Item[]) => data.length;

  const toggleCheckbox = (key: string) => {
    setCheckedItems(key)
  };
  
  const handleInputChange = (key: number, quantity: number) => {
    setInput(new SelectedItem(key, quantity))
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={checkedKeys.includes(Number(item.key))}
          onPress={() => toggleCheckbox(item.key)}
        />
      </View>
      <Text style={styles.itemValue}>{item.value}</Text>
      <View style={styles.inputContainer}>
        <Input
          disabled={!checkedKeys.includes(Number(item.key))}
          style={styles.input}
          value={checkedKeys.includes(Number(item.key))? String(checkedItems.filter((f) => f.key === Number(item.key))[0].quantity) : ''}
          onChangeText={(text) => handleInputChange(Number(item.key), Number(text))}
          editable={!!checkedItems[item.key]}
        />
      
      </View>
      <Text style={{ fontSize: 16, marginLeft: 4 }}>{item.unit}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Icon
          name={collapsed ? 'expand-more' : 'expand-less'}
          type='material'
          onPress={toggleCollapse}
        />
      </View>
      {!collapsed && (
        <View>
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
      <View><Divider/></View>
      <View style={styles.chipsContainer}>
        {chips.map((c) => ( <Chip key={c.key} title={c.value} containerStyle={styles.chip}/>))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 16,
  },
  input: {
    // flex: 1,
    // height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    // borderRadius: 4,
    // padding: 8,
    // marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 16,
  },
  list: {
    maxHeight: 200,  // Adjust based on your needs
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
    flex: 1, // Take up the remaining space
  },
  checkboxContainer: {
    marginRight: 10,
  },
  inputContainer: {
    flex: 0.75,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',  // Enable wrapping
    marginTop: 15,
  },
  chip: {
    marginVertical: 5,
    marginRight: 5, // Add margin to prevent chips from sticking together
  },
});

export default Selector;
