import { Component, OnInit } from '@angular/core';
import { HolidayType, CalendarService } from '../calendar.service';
import { ActivatedRoute } from '@angular/router';
import { month, monthForDescription } from '../app.model';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {

  enable: boolean;
  nextDate: Date;
  previousDate: Date;
  nowYear: number;
  numMonth: number;
  nextNumMonth: number;
  previousNumMonth: number;
  nextMonth: string;
  previousMonth: string;
  arrayHolidays: HolidayType[];
  holidaysThisMonth: HolidayType[];

  constructor(
    private route: ActivatedRoute,
    private calendarPageService: CalendarService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nowYear = +this.route.snapshot.params.year;
      this.numMonth = +this.route.snapshot.params.month;
      this.enable = true;
      this.upDate();
    });
  }

  upDate(): void {
    this.nextDate = new Date(this.nowYear, this.numMonth, 1);
    this.nextDate.setMonth(this.nextDate.getMonth() + 1);
    this.previousDate = new Date(this.nowYear, this.numMonth, 1);
    this.previousDate.setMonth(this.previousDate.getMonth() - 1);
    this.nextNumMonth = this.nextDate.getMonth();
    this.previousNumMonth = this.previousDate.getMonth();
    this.nextMonth = month[this.nextNumMonth] + ' ' + this.nextDate.getFullYear();
    this.previousMonth = month[this.previousNumMonth] + ' ' + this.previousDate.getFullYear();
    this.arrayHolidays = this.calendarPageService.getHolidaysDescriptions(new Date(this.nowYear, this.numMonth, 1));
    this.holidaysThisMonth = this.getHolidayListArray(this.arrayHolidays);
  }

  getHolidayListArray(array: HolidayType[]): HolidayType[] {
    const localArray = array.reduce((pV, cV, index) => {
      pV.push({
        id: cV.day,
        month: monthForDescription[cV.month],
        description: cV.description,
      });
      return pV;
    }, []);
    return localArray;
  }

}
