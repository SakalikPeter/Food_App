import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { Calendar as RNCalendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import styles from './Calendar.MultipleDays.styles';

type CalendarMultipleDaysProps = {
  setDates: (date: string[]) => void;
};

const CalendarMultipleDays: React.FC<CalendarMultipleDaysProps> = ({ setDates }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentSelection, setCurrentSelection] = useState<'start' | 'end'>('start');
  const [collapsed, setCollapsed] = useState(true);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  const toggleCollapse = () => {
    setCollapsed(prevCollapsed => !prevCollapsed);
  };

  useEffect(() => {
    if (startDate && endDate) {
      generateMarkedDates(startDate, endDate);
    }
  }, [endDate]);

  const handleDate = (dateString: string) => {
    if (currentSelection === 'start') {
      setStartDate(dateString);
      setMarkedDates({});
      setEndDate('');
      setCurrentSelection('end');
    } else {
      setEndDate(dateString);
      setCurrentSelection('start');
    }
  };

  const generateMarkedDates = (start: string, end: string) => {
    const startDay = dayjs(start);
    const endDay = dayjs(end);
    const dates: { [key: string]: any } = {};
    const selectedDates: string[] = [];

    for (let day = startDay; day.isBefore(endDay) || day.isSame(endDay, 'day'); day = day.add(1, 'day')) {
      const dateString = day.format('YYYY-MM-DD');
      dates[dateString] = {
        selected: true,
        color: '#70d7c7',
        textColor: 'white',
      };
      selectedDates.push(dateString);
    }

    setMarkedDates(dates);
    setDates(selectedDates);
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
          <RNCalendar
            onDayPress={day => handleDate(day.dateString)}
            markedDates={{
              ...markedDates,
              [startDate]: {
                selected: true,
                startingDay: true,
                color: '#70d7c7',
                textColor: 'white',
              },
              [endDate]: {
                selected: true,
                endingDay: true,
                color: '#70d7c7',
                textColor: 'white',
              },
            }}
            markingType={startDate === endDate ? 'dot' : 'period'}
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
        <Text style={styles.dateText}>Od: {startDate}</Text>
        <Text style={styles.dateText}>Do: {endDate}</Text>
      </View>
    </View>
  );
};

export default CalendarMultipleDays;
