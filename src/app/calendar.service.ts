import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const publicHolidays: HolidayType[] = [
  { day: 1, month: 0, description: 'Новый год' },
  { day: 7, month: 0, description: 'Рождество Христово(по календарю православной конфессии)' },
  { day: 8, month: 2, description: 'Международный женский день' },
  { day: 1, month: 4, description: 'Праздник труда' },
  { day: 7, month: 4, description: 'Радуница(по календарю православной конфессии)' },
  { day: 9, month: 4, description: 'День победы' },
  { day: 3, month: 6, description: 'День Независимости Республики Беларусь' },
  { day: 7, month: 10, description: 'День Октябрьской революции' },
  { day: 25, month: 11, description: 'Рождество Христово(по календарю католической конфессии)' },
];

export const localHolidays: HolidayType[] = [
  { day: 15, month: 1, description: 'Локальный праздник компании' },
  { day: 27, month: 2, description: 'Еще один локальный праздник компании' },
  { day: 23, month: 3, description: 'Третий локальный праздник компании' },
  { day: 21, month: 4, description: 'Дополнительный локальный праздник компании' },
  { day: 20, month: 5, description: 'Запасной, но не менее важный, локальный праздник компании' },
];

export const shortenedDays: ShortenedDayType[] = [
  { day: 7, month: 2, year: new Date().getFullYear() },
  { day: 2, month: 6, year: new Date().getFullYear() },
  { day: 6, month: 10, year: new Date().getFullYear() },
  { day: 24, month: 11, year: new Date().getFullYear() },
];

const isPublicHoliday = (day: Date): boolean => {
  return publicHolidays.some(condition);
  function condition(value, index, array) {
    let result = false;
    if (value.month === day.getMonth() && value.day === day.getDate()) {
      result = true;
    }
    return result;
  }
};

const isLocalHoliday = (day: Date): boolean => {
  return localHolidays.some(condition);
  function condition(value, index, array) {
    let result = false;
    if (value.month === day.getMonth() && value.day === day.getDate()) {
      result = true;
    }
    return result;
  }
};

const isNonWorkingDay = (day: Date): boolean => {
  const date = day.getDay();
  if (date === 0 || date === 6 || isPublicHoliday(day) || isLocalHoliday(day)) {
    return true;
  }
  return false;
};

const isShortenedDay = (day: Date): boolean => {
  return shortenedDays.some(condition);
  function condition(value, index, array) {
    let result = false;
    if (value.month === day.getMonth() && value.day === day.getDate() && value.year === day.getFullYear()) {
      result = true;
    }
    return result;
  }
};

const getMonthDays = (year: number, month: number): CalendarDay[] => {
  const dayArray: CalendarDay[] = [];
  const monthDaysCol = new Date(year, month + 1, 0).getDate();
  for (let j = 0; j < monthDaysCol; j++) {
    const day: Date = new Date(year, month, j + 1);
    dayArray[j] = {
      // tslint:disable-next-line: object-literal-shorthand
      year: year,
      // tslint:disable-next-line: object-literal-shorthand
      month: month,
      id: j + 1,
      isPublicHoliday: isPublicHoliday(day),
      isLocalHoliday: isLocalHoliday(day),
      isNonWorkingDay: isNonWorkingDay(day),
      isShortenedDay: isShortenedDay(day),
      mooveTo: null
    };
  }
  return dayArray;
};

export const calendarMonthsData: CalendarDay[][] = [
  ...Array.from({ length: 12 }, (v, m) => getMonthDays(2019, m))
];

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) {}

  getFullYearList() {
    return this.http.get('../assets/testfile.json');
  }

  getCalendarMonth(year: number, month?: number): Observable<CalendarDay[]> {
    return new Observable<CalendarDay[]>(observer => {
      observer.next(calendarMonthsData[month]);
      observer.complete();
    });
  }

  getHolidaysDescriptions(day: Date): HolidayType[] {
    const descriptions: HolidayType[] = [];
    publicHolidays.forEach(condition);
    localHolidays.forEach(condition);
    function condition(value, index, array) {
      if (value.month === day.getMonth()) {
        descriptions.push(value);
      }
    }
    return descriptions;
  }
}

export interface HolidayType {
  day: number;
  month: number;
  description: string;
}

export interface ShortenedDayType {
  day: number;
  month: number;
  year: number;
}

export interface CalendarDay {
  id: number;
  month: number;
  year: number;
  isNonWorkingDay: boolean;
  isPublicHoliday: boolean;
  isShortenedDay: boolean;
  isLocalHoliday: boolean;
  mooveTo: Date;
}

export interface CalendarYear {
  year: {
    jan: {
      day: CalendarDay;
    }
    feb: {
      day: CalendarDay;
    }
    mar: {
      day: CalendarDay;
    }
    apr: {
      day: CalendarDay;
    }
    may: {
      day: CalendarDay;
    }
    june: {
      day: CalendarDay;
    }
    july: {
      day: CalendarDay;
    }
    aug: {
      day: CalendarDay;
    }
    sept: {
      day: CalendarDay;
    }
    oct: {
      day: CalendarDay;
    }
    nov: {
      day: CalendarDay;
    }
    dec: {
      day: CalendarDay;
    }
  };
}
