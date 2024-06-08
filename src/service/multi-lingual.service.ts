import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiLingualService {
  // private _multilingual: any;
  // Getter method
  // get multilingual(): any {
  //   return this._multilingual;
  // }

  // // Setter method
  // set multilingual(value: any) {
  //   this._multilingual = value;
  // }
  private apiUrl = 'https://evn698i8ce.execute-api.ca-central-1.amazonaws.com/dev/multi_langual';

constructor(private http: HttpClient) {}

getTranslations(language: string | null): Observable<any[]> {
  const url = `${this.apiUrl}?language=${language}`;
  return this.http.get<any[]>(url);
}

}