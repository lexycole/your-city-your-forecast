import { Action, createReducer, on } from '@ngrx/store';

import { YourSearchActions } from '../actions/your-search.actions'
import { IYourCurrentWeather } from '../interface';
import { defaultWeather } from '../weather/weather.service'


export interface State {
  current: IYourCurrentWeather
}

export const initialState: State = {
  current: defaultWeather,
};

const yourSearchReducer = createReducer(
  initialState,
  on(YourSearchActions.weatherLoaded, (state, action) => {
    return {
      ...state,
      current: action.current,
    }
  })
)

export function reducer(state: State | undefined, action: Action) {
  return yourSearchReducer(state, action)
}

