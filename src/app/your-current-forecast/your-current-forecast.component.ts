import { Component, OnInit } from '@angular/core';
import { IYourCurrentWeather } from '../interface';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-your-current-forecast',
  templateUrl: './your-current-forecast.component.html',
  styleUrls: ['./your-current-forecast.component.css']
})
export class YourCurrentForecastComponent implements OnInit {
  current!: IYourCurrentWeather
  constructor(private weatherService: WeatherService) {
    this.current = {
      // city: 'Bethesda', 
      // country: 'US', 
      // date: new Date(),
      // image: 'assets/img/sunny.svg', 
      // temperature: 72,
      // description: 'sunny',
    } as IYourCurrentWeather
  }


  ngOnInit(): void {
    this.weatherService.getCurrentWeather('Bethesda', 'US')
      .subscribe((data) => this.current = data)
  }

  getOrdinal(date: number) {
    const n = new Date(date).getDate()
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) ||
        n % 10 > 3 ? 0 : n % 10]
      : ''
  }

}
