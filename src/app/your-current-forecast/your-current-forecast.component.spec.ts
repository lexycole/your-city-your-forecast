import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCurrentForecastComponent } from './your-current-forecast.component';

describe('YourCurrentForecastComponent', () => {
  let component: YourCurrentForecastComponent;
  let fixture: ComponentFixture<YourCurrentForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourCurrentForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourCurrentForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
