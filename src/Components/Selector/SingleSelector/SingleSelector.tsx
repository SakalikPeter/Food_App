import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, VirtualizedList } from 'react-native';
import { CheckBox, Chip, Divider, Icon, Input } from 'react-native-elements';

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

const Selector: React.FC<Props> = ({ items = [], checkedValue, setCheckedItems, title, multi = false }) => {
  const [collapsed, setCollapsed] = useState(true);
  const chips = items.filter((item) => checkedValue.includes(item.value))

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
      <View style={styles.chipsContainer}>
        {chips && chips.map((chip) =>
          <Chip key={chip.key} title={chip.value} containerStyle={styles.chip} />)
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // global
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
  // global -> header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  // global -> title
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  // global -> icon
  iconContainer: {
    marginLeft: 'auto',
    paddingRight: 10,
  },
  icon: {
    fontSize: 24,
    paddingRight: 10,
  },
  // global -> content wrapper
  selectorWrapper: {
    marginTop: 16,
  },
  // global -> divider
  divider: {
    marginVertical: 16,
    backgroundColor: '#e0e0e0',
  },
  // list
  list: {
    maxHeight: 250,
    marginTop: 16,
  },
  // list - item wrapper
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  checkboxContainer: {
    marginRight: 10,
    flex: 0.2,
  },
  itemValue: {
    color: '#555',
    flex: 0.8,
  },
  inputContainer: {
    flex: 0.25,
  },
  input: {
    // flex: 1,
  },
  unitText: {
    color: '#555',
    flex: 0.2,
  },
  // chips
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
