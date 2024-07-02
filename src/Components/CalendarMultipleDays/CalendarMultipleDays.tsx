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
            onDayPress={day => handleDate(day.dateString)}
            markedDates={{
              ...markedDates,
              [startDate]: { selected: true, startingDay: true, color: '#70d7c7', textColor: 'white' },
              [endDate]: { selected: true, endingDay: true, color: '#70d7c7', textColor: 'white' },
            }}
            markingType={'period'}
          />
        </View>
      )}
      <View><Divider/></View>
      <View>
        <Text>{startDate} - {endDate}</Text>
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

export default CalendarMultipleDays;
