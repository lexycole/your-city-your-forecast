import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { YourCurrentWeatherEffects } from './your-current-weather.effects';

describe('YourCurrentWeatherEffects', () => {
  let actions$: Observable<any>;
  let effects: YourCurrentWeatherEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        YourCurrentWeatherEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(YourCurrentWeatherEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
