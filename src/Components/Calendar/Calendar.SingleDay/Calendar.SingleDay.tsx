import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import styles from './Calendar.SingleDay.styles';
import ChipBase from '../../Chip/Chip.Base/Chip.Base';

LocaleConfig.locales['sk'] = {
  monthNames: [
    'Januar',
    'Februar',
    'Marec',
    'April',
    'Maj',
    'Jun',
    'Jul',
    'August',
    'September',
    'Oktober',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'Maj', 'Jun', 'Jul.', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dec.'],
  dayNames: ['Nedela', 'Pondelok', 'Utorok', 'Streda', 'Stvrtok', 'Piatok', 'Sobota'],
  dayNamesShort: ['Ned.', 'Pon.', 'Uto.', 'Str.', 'Stv.', 'Pia.', 'Sob.'],
  today: "Dnes"
};

LocaleConfig.defaultLocale = 'sk';

const parseDate = (date: string) => {
  const parts = date.split("-");

  // Ensure we have exactly three parts (year, month, day)
  if (parts.length !== 3) {
    console.error('Invalid date format');
    return null;
  }

  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  
  // Create formatted date string in the format "dd-mm-yyyy"
  const formattedDate = `${day}-${month}-${year}`;
  
  return formattedDate;
}

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
          color='#77E4C8'
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
              todayTextColor: '#77E4C8',
              selectedDayBackgroundColor: '#77E4C8',
              dotColor: '#77E4C8',
              arrowColor: '#77E4C8',
              monthTextColor: '#77E4C8',
              indicatorColor: '#77E4C8',
            }}
          />
        </View>
      )}
      <Divider style={styles.divider} />
      <View>
        <ChipBase items={[{key: "0", value: `Datum: ${parseDate(date)}`}]} />
      </View>
    </View>
  );
};

export default CalendarSingleDay;
