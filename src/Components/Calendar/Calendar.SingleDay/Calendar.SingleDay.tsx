import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import styles from './Calendar.SingleDay.styles';

type CalendarProps = {
  date: string;
  setDate: (date: string) => void;
};

const CalendarSingleDay: React.FC<CalendarProps> = ({ date, setDate }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(prevCollapsed => !prevCollapsed);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kalendar</Text>
        <Icon
          name={collapsed ? 'expand-more' : 'expand-less'}
          type='material'
          color='#70d7c7'
          onPress={toggleCollapse}
          style={styles.icon}
        />
      </View>
      {!collapsed && (
        <View style={styles.calendarWrapper}>
          <Calendar
            onDayPress={day => setDate(day.dateString)}
            markedDates={{
              [date]: { selected: true, disableTouchEvent: true },
            }}
            theme={{
              todayTextColor: '#70d7c7',
              selectedDayBackgroundColor: '#70d7c7',
              dotColor: '#70d7c7',
              arrowColor: '#70d7c7',
              monthTextColor: '#70d7c7',
              indicatorColor: '#70d7c7',
            }}
          />
        </View>
      )}
      <Divider style={styles.divider} />
      <View style={styles.dateInfo}>
        <Text style={styles.dateText}>Datum: {date || ''}</Text>
      </View>
    </View>
  );
};

export default CalendarSingleDay;
