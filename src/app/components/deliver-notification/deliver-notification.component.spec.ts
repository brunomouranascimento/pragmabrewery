import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverNotificationComponent } from './deliver-notification.component';

describe('DeliverNotificationComponent', () => {
  let component: DeliverNotificationComponent;
  let fixture: ComponentFixture<DeliverNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
