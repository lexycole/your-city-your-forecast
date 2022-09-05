// import { createAction, props } from '@ngrx/store';

// export const loadYourSearchs = createAction(
//   '[YourSearch] Load YourSearchs'
// );

// export const loadYourSearchsSuccess = createAction(
//   '[YourSearch] Load YourSearchs Success',
//   props<{ data: any }>()
// );

// export const loadYourSearchsFailure = createAction(
//   '[YourSearch] Load YourSearchs Failure',
//   props<{ error: any }>()
// );

import { createAction, props, union } from '@ngrx/store';
import { IYourCurrentWeather } from '../interface';

export const YourSearchActions = {
  search: createAction(
    '[Search] Search',
    props<{ searchText: string; country?: string }>()
  ),
  weatherLoaded: createAction(
    '[Search] CurrentWeather loaded',
    props<{ current: IYourCurrentWeather }>()
  ),
}

const all = union(YourSearchActions)
export type YourSearchActions = typeof all