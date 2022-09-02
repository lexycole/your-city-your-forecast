import { HttpClient,  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IYourCurrentWeather } from '../interface';
import { Observable, map } from 'rxjs';

interface IYourCurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(city: string, country: string): Observable<IYourCurrentWeather>{ 
    const uriParams = new HttpParams()
      .set('q', `${city},${country}`)
      .set('appid', environment.appId)

    return this.httpClient
    .get<IYourCurrentWeatherData>(
      `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
       `q=${city},${country}&appid=${environment.appId}`
      // { params: uriParams }
      )

      .pipe(map(data => this.transformToIYourCurrentWeather(data)))
    
    }

    private transformToIYourCurrentWeather(data: IYourCurrentWeatherData): IYourCurrentWeather {
      return {
        city: data.name,
        country: data.sys.country,
        date: data.dt * 1000,
        image:
        `http://openweathermap.org/img/w/${data.weather[0].icon}.png`, 
        temperature: this.convertKelvinToFahrenheit(data.main.temp), 
        description: data.weather[0].description,
      }
    }

    private convertKelvinToFahrenheit(kelvin: number): number
    { 
      return kelvin * 9 / 5 - 459.67
    }

  }