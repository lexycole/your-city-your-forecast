import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCitySearchComponent } from './your-city-search.component';

describe('YourCitySearchComponent', () => {
  let component: YourCitySearchComponent;
  let fixture: ComponentFixture<YourCitySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourCitySearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourCitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
