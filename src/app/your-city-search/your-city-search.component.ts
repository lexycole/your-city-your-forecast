import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WeatherService } from '../weather/weather.service';
import { Store } from '@ngrx/store'
import { debounceTime, filter, tap } from 'rxjs/operators';

import { YourSearchActions } from '../actions/your-search.actions'
import * as fromSearch from '../reducers/your-search.reducer'

@Component({
  selector: 'app-your-city-search',
  templateUrl: './your-city-search.component.html',
  styleUrls: ['./your-city-search.component.css']
})


export class YourCitySearchComponent implements OnInit {
  useNgRx = false
  search = new FormControl('', [Validators.required, Validators.minLength(2)])

  constructor(
    private weatherService: WeatherService,
    private store: Store<fromSearch.State>) { 
      this.search.valueChanges
      .pipe(debounceTime(1000),
      filter(() => !this.search.invalid),
      tap((searchValue: string) => this.doSearch(searchValue))
      )
      .subscribe()
    }

  ngOnInit(): void {
  }

  doSearch(searchValue: string) {
    const userInput = searchValue.split(',').map(s => s.trim())
    const searchText = userInput[0]
    const country = userInput.length > 1 ? userInput[1] : undefined

    if (this.useNgRx) {
      this.ngRxBasedSearch(searchText, country)
    } else {
      this.behaviorSubjectBasedSearch(searchText, country)
    }
   }

   behaviorSubjectBasedSearch(searchText: string, country?: string) {
    this.weatherService.updateCurrentWeather(searchText, country)
  }

  ngRxBasedSearch(searchText: string, country?: string) {
    this.store.dispatch(YourSearchActions.search({ searchText, country }))
  }

  getErrorMessage() {
    return this.search.hasError('minLength') ?
    'Type more than one character to search' : '';
   }

}
