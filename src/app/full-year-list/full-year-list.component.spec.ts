import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullYearListComponent } from './full-year-list.component';

describe('FullYearListComponent', () => {
  let component: FullYearListComponent;
  let fixture: ComponentFixture<FullYearListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullYearListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullYearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
