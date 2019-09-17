import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChangeDayComponent } from './popup-change-day.component';

describe('PopupChangeDayComponent', () => {
  let component: PopupChangeDayComponent;
  let fixture: ComponentFixture<PopupChangeDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupChangeDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupChangeDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
