import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-full-year-list',
  templateUrl: './full-year-list.component.html',
  styleUrls: ['./full-year-list.component.scss']
})
export class FullYearListComponent implements OnInit {

  numMonthArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  nowYear: number = new Date().getFullYear();
  nextYear: number = this.nowYear + 1;
  previousYear: number = this.nowYear - 1;
  enable = false;
  fullYearList;

  upDate(): void {
    this.nextYear = this.nowYear + 1;
    this.previousYear = this.nowYear - 1;
  }

  constructor(private route: ActivatedRoute, private calendarService: CalendarService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nowYear = new Date().getFullYear();
      const year: number = +this.route.snapshot.params.year;
      this.nowYear = year;
      this.fullYearList = this.calendarService.getFullYearList();
      this.upDate();
    });
  }
}
