import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullYearListComponent } from './full-year-list/full-year-list.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { PopupChangeDayComponent } from './popup-change-day/popup-change-day.component';


const routes: Routes = [
  { path: 'full-year/:year', component: FullYearListComponent },
  { path: 'calendar-list/:year/:month', component: CalendarListComponent },
  { path: 'popup-change-day/:year/:month/:day', component: PopupChangeDayComponent },
  { path: '', redirectTo: 'full-year/2019', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
