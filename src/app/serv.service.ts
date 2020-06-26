import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServService {
  API_WIKI = 'https://en.wikipedia.org/w/api.php ?action=query&format=json&list=search&utf8=1&srsearch=';

  constructor(private http: HttpClient) { }

  

  getQueryWiki(data: string): Observable<any[]> {
    return this.http.get<any[]>(`${data}`);
  }


}
