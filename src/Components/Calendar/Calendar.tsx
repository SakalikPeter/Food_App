import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { Icon } from 'react-native-elements';

type CalendarProps = {
  date: string;
  setDate: (date: string) => void;
};

const Calendar: React.FC<CalendarProps> = ({ date, setDate }) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
        <Icon
          name={collapsed ? 'expand-more' : 'expand-less'}
          type='material'
          onPress={toggleCollapse}
        />
      </View>
      {!collapsed && (
        <View style={styles.calendarWrapper}>
          <RNCalendar
            onDayPress={day => {
              setDate(day.dateString);
            }}
            markedDates={{
              [date]: { selected: true, disableTouchEvent: true },
            }}
          />
        </View>
      )}
      <View><Divider/></View>
      <View>
      <Text>{date}</Text>
      </View>
    </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  calendarWrapper: {
    marginTop: 16,
  },
});

export default Calendar;
