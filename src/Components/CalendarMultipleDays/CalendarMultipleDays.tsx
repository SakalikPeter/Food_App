import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { Icon } from 'react-native-elements';
import dayjs from 'dayjs';

type CalendarMultipleDaysProps = {
  setDates: (date: string[]) => void;
};

const CalendarMultipleDays: React.FC<CalendarMultipleDaysProps> = ({ setDates }) => {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [date, setDate] = React.useState("start");
  const [collapsed, setCollapsed] = React.useState(true);
  const [markedDates, setMarkedDates] = React.useState({});

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  React.useEffect(() => {
    if (startDate && endDate) {
      generateMarkedDates(startDate, endDate);
    }
  }, [endDate]);

  const handleDate = (dateString: string) => {
    if (date === "start") {
      setStartDate(dateString);
      setMarkedDates({})
      setEndDate("");
      setDate("end");
    } else if (date === "end") {
      setEndDate(dateString);
      setDate("start");
    }
  };

  const generateMarkedDates = (start, end) => {
    const startDay = dayjs(start);
    const endDay = dayjs(end);
    let dates = {};
    let selectedDates = []

    for (let day = startDay; day.isBefore(endDay) || day.isSame(endDay, 'day'); day = day.add(1, 'day')) {
      const dateString = day.format('YYYY-MM-DD');
      dates[dateString] = { selected: true, color: '#70d7c7', textColor: 'white' };
      selectedDates.push(dateString)
    }
    setMarkedDates(dates);
    setDates(selectedDates)
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
            onDayPress={day => handleDate(day.dateString)}
            markedDates={{
              ...markedDates,
              [startDate]: { selected: true, startingDay: true, color: '#70d7c7', textColor: 'white' },
              [endDate]: { selected: true, endingDay: true, color: '#70d7c7', textColor: 'white' },
            }}
            markingType={startDate===endDate?"dot":'period'}
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
        <Text style={styles.dateText}>Od: {startDate}</Text>
        <Text style={styles.dateText}>Do: {endDate}</Text>
      </View>
    </View>
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
    paddingVertical: 2
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
  calendarWrapper: {
    marginTop: 16,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#e0e0e0',
  },
  dateInfo: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateText: {
    marginTop: 4,
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
});

export default CalendarMultipleDays;
