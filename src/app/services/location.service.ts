import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { APIs } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class LocationService {
  private URI = APIs.geocode;
  public responseCache = new Map();

  constructor(private http: HttpClient) {}

  getLocationData(para: any): Observable<any> {
    const url = this.URI + para;
    const fromCache = this.responseCache.get(url);
    if (fromCache) {
      return of(fromCache);
    } else {
      return this.http
        .get<any>(url)
        .pipe(tap(response => this.responseCache.set(url, response)));
    }
  }
}
