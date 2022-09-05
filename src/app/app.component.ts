import { Component } from '@angular/core';
import { IYourCurrentWeather } from './interface';
import { WeatherService } from './weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentWeather!: IYourCurrentWeather
  constructor(private weatherService: WeatherService) { }

  // doSearch(searchValue: string) {
  //   const userInput = searchValue.split(',').map(s => s.trim()) 
  //   this.weatherService
  //   .getCurrentWeather(userInput[0], userInput.length > 1 ?
  //   userInput[1] : undefined
  //   )
  //   .subscribe(data => this.currentWeather = data)
  //   }
}
