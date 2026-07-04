import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USerDashboardComponent } from './user-dashboard.component';

describe('USerDashboardComponent', () => {
  let component: USerDashboardComponent;
  let fixture: ComponentFixture<USerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USerDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(USerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
