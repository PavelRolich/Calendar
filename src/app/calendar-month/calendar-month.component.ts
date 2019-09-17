import { Component, OnChanges, Input } from '@angular/core';
import { CalendarDay, CalendarService } from '../calendar.service';
import { PopupChangeDayComponent } from '../popup-change-day/popup-change-day.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { month } from '../app.model';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnChanges {

  @Input() enable: boolean;
  @Input() nowYear: number;
  @Input() numMonth: number;
  nowMonth: string;
  days: CalendarDay[];
  daysArrayInCalendar: any;
  workingDaysCount: number;
  workingTimeEight: number;
  workingTimeSeven: number;
  dialogRef: MatDialogRef<PopupChangeDayComponent>;

  // Popup window
  constructor(
    public dialog: MatDialog,
    private calendarPageService: CalendarService,
  ) { }

  // Обновление значений переменных
  ngOnChanges() {
    this.nowMonth = month[this.numMonth];
    this.days = this.getDayArray(this.nowYear, this.numMonth);
    this.daysArrayInCalendar = this.getListDays();
    this.workingDaysCount = this.getWorkingDaysCount();
    this.workingTimeEight = this.workingDaysCount * 8 - this.getShortenedDaysCount();
    this.workingTimeSeven = this.workingDaysCount * 7 - this.getShortenedDaysCount();
  }

  openDialog(day: number): void {
    this.dialogRef = this.dialog.open(PopupChangeDayComponent, {
      width: '500px',
      height: '550px',
      hasBackdrop: true,
      disableClose: true,
      data: {
        date: this.findCalendarDateObject(day),
        daysArray: this.daysArrayInCalendar,
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.daysArrayInCalendar = result;
    });
  }

  // Нахождение выбранного дня в массиве
  findCalendarDateObject(dayNum: number): CalendarDay {
    return this.daysArrayInCalendar.flat().find(element => {
      return dayNum === element.id;
    });
  }

  // Определение количества дней в месяце
  getDayArray(year: number, monthNum: number): CalendarDay[] {
    let dayArray: CalendarDay[] = [];
    this.calendarPageService.getCalendarMonth(year, monthNum)
    .subscribe(
      (data: CalendarDay[]) => dayArray = data,
    );
    return dayArray;
  }

  // Определение количества рабочих дней в месяце
  getWorkingDaysCount(): number {
    const workingDaysArray: CalendarDay[] = this.daysArrayInCalendar.flat().filter(element => {
      return (Number(element) !== 0 && !element.isNonWorkingDay && !element.isHoliday && !element.isLocalHoliday);
    });
    return workingDaysArray.length;
  }

  // Определение количества сокращенных дней в месяце
  getShortenedDaysCount(): number {
    const shortenedDays: CalendarDay[] = this.daysArrayInCalendar.flat().filter(element => {
      return element.isShortenedDay;
    });
    return shortenedDays.length;
  }

  // Получение полного списка дней месяца
  getListDays(): any[] {
    let k = 0;
    const rows: any[] = [];
    let dayArray: any[] = [];
    const daysArray: any[] = this.days.slice();

    // Вставка дополнительных дней (для красивого отображения в календаре)
    let firstDay: number = new Date(this.nowYear, this.numMonth, daysArray[0].id).getDay();
    if (firstDay === 0) {
      firstDay = 7;
    }
    for (let i = 0; i < firstDay - 1; i++) {
      daysArray.unshift(0);
    }
    const colDay = 7 - (daysArray.length % 7);
    for (let i = 0; i < colDay; i++) {
      daysArray.push(0);
    }

    // заполнение массива днями (6 строк по 7 дней)
    let maxLine: number = Math.ceil(daysArray.length / 7);
    if (maxLine === 5) {
      for (let i = 0; i < 7; i++) {
        daysArray.push(0);
      }
      maxLine++;
    }
    for (let i = 0; i < maxLine; i++) {
      for (let j = 0; j < 7; j++) {
          dayArray[j] = daysArray[k];
          k++;
      }
      rows[i] = dayArray;
      dayArray = [];
      }
    return rows;
  }
}


