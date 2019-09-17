import { Component, Inject } from '@angular/core';
import { CalendarDay } from '../calendar.service';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { monthForDescription } from '../app.model';

@Component({
  selector: 'app-popup-change-day',
  templateUrl: './popup-change-day.component.html',
  styleUrls: ['./popup-change-day.component.scss']
})
export class PopupChangeDayComponent {

  date: CalendarDay;
  selectedDate: Date;
  selectedDateString: string;
  dateValue: FormControl;
  daysArray: any;
  minDate: Date;
  maxDate: Date;
  disabledSignDay: boolean;
  disabledWrapDay: boolean;
  disabledSaveButton: boolean;
  disabledSignDayItem: boolean;
  disabledWrapDayItem: boolean;

  constructor(
    public dialogRef: MatDialogRef<PopupChangeDayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.date = data.date;
    this.selectedDate = new Date(this.date.year, this.date.month, this.date.id);
// tslint:disable-next-line: max-line-length
    this.selectedDateString = this.selectedDate.getDate() + ' ' + monthForDescription[this.selectedDate.getMonth()] + ' ' + this.selectedDate.getFullYear();
    this.maxDate = new Date(this.date.year, this.date.month + 1, 0);
    this.minDate = new Date(this.date.year, this.date.month, 1);
    this.dateValue = new FormControl(this.date.mooveTo);
    this.daysArray = data.daysArray;
    this.disabledSignDay = false;
    this.disabledWrapDay = false;
    this.disabledSaveButton = true;
    this.disabledSignDayItem = true;
    this.disabledWrapDayItem = true;
  }

  onNoClick(): void {
    this.dialogRef.close(this.daysArray);
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDate();
    let result = false;
    this.daysArray.flat().forEach(element => {
        if (day === new Date(element.year, element.month, element.id).getDate()) {
          if (element.mooveTo === null && element.isNonWorkingDay !== this.date.isNonWorkingDay) {
            result = true;
          }
        }
    });
    return result;
  }

  changeSignDay(): void {
    this.disabledWrapDay = true;
    this.disabledSignDayItem = false;
    this.disabledSaveButton = false;
  }

  makeWrapday(): void {
    this.disabledSignDay = true;
    this.disabledWrapDayItem = false;
    this.disabledSaveButton = false;
  }

  saveChanges(): void {
    const localDate = this.date;
    if (this.disabledWrapDay === true) {
      this.daysArray.find((element) => {
        element.find((dayElement) => {
          if (dayElement !== ' ') {
            if (dayElement.id === localDate.id) {
              dayElement.isPublicHoliday = localDate.isPublicHoliday;
              dayElement.isLocalHoliday = localDate.isLocalHoliday;
              dayElement.isNonWorkingDay = localDate.isNonWorkingDay;
              dayElement.isShortenedDay = localDate.isShortenedDay;
            }
          }
        });
      });
    }
    if (this.disabledSignDay === true) {
      const moovingDay = localDate.mooveTo;
      this.daysArray.find((element) => {
        element.find((dayElement) => {
          if (dayElement !== ' ') {
            if (dayElement.id === moovingDay.getDate()) {
              dayElement.mooveTo = new Date(localDate.year, localDate.month, localDate.id);
              dayElement.isNonWorkingDay = false;
            }
            if (dayElement.id === localDate.id) {
              dayElement.mooveTo = localDate.mooveTo;
              dayElement.isNonWorkingDay = true;
            }
          }
        });
      });
    }
    this.disabledSignDay = false;
    this.disabledWrapDay = false;
    this.disabledSignDayItem = true;
    this.disabledWrapDayItem = true;
    this.disabledSaveButton = true;
  }
}

export interface DialogData {
  date: CalendarDay;
  daysArray: [];
}

