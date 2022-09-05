import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { defaultIfEmpty, mergeMap } from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod'

export interface IYourPostalCode {
  countryCode: string
  postalCode: string
  placeName: string
  lng: number
  lat: number
}

export const defaultPostalCode: IYourPostalCode = {
  countryCode: '--',
  postalCode: '--',
  placeName: '--',
  lng: 0,
  lat: 0,
}

export interface YourPostalCodeData {
  postalCodes: [IYourPostalCode]
}

export interface YourPostalCodeService {
  resolvePostalCode(postalCode: string): Observable<IYourPostalCode>
}

@Injectable({
  providedIn: 'root'
})

export class YourPostalCodeService implements YourPostalCodeService{

  constructor(private httpClient: HttpClient) {}
  
  resolvePostalCode(postalCode: string): Observable<IYourPostalCode> {
    const uriParams = new HttpParams()
      .set('maxRows', '1')
      .set('username', environment.username)
      .set('postalcode', postalCode)

    return this.httpClient
      .get<YourPostalCodeData>(
        `${environment.baseUrl}${environment.geonamesApi}.geonames.org/postalCodeSearchJSON`,
        { params: uriParams }
      )
      .pipe(
        mergeMap((data) => data.postalCodes),
        defaultIfEmpty(defaultPostalCode)
      )
  }
}
