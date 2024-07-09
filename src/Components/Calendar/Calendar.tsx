import React from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { Icon } from 'react-native-elements';
import styles from './Calendar.style';

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
        <Text style={styles.title}>Kalendar</Text>
        <View style={styles.iconContainer}>
          <Icon
            name={collapsed ? 'expand-more' : 'expand-less'}
            type='material'
            color="#70d7c7"
            onPress={toggleCollapse}
            style={styles.icon}
          />
        </View>
      </View>
      {!collapsed && (
        <View style={styles.calendarWrapper}>
          <RNCalendar
            onDayPress={day => setDate(day.dateString)}
            markedDates={{
              [date]: { selected: true, disableTouchEvent: true },
            }}
            theme={{
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              dayTextColor: '#2d4150',
              todayTextColor: '#70d7c7',
              selectedDayBackgroundColor: '#70d7c7',
              selectedDayTextColor: '#ffffff',
              textDisabledColor: '#d9e1e8',
              dotColor: '#70d7c7',
              selectedDotColor: '#ffffff',
              arrowColor: '#70d7c7',
              monthTextColor: '#70d7c7',
              indicatorColor: '#70d7c7',
              textDayFontFamily: 'Roboto',
              textMonthFontFamily: 'Roboto',
              textDayHeaderFontFamily: 'Roboto',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
        </View>
      )}
      <Divider style={styles.divider} />
      <View style={styles.dateInfo}>
      <Text style={styles.dateText}>Datum: {date? date: ""}</Text>
      </View>
    </View>
  );
};

export default Calendar;
