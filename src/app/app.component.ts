import { Component, OnInit } from '@angular/core';
import { ServService } from './serv.service';
import * as Rx from 'rxjs';
import { ajax } from 'rxjs/ajax';
import * as Operator from 'rxjs/operators';
import * as R from 'ramda';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  API_WIKI = 'https://en.wikipedia.org/w/api.php ?action=query&format=json&list=search&utf8=1&srsearch=';

  constructor(private serv: ServService) { }

  ngOnInit() {
    const input: any = document.querySelector('input');
    const results: any = document.querySelector('#results');


    const isEmpty = (param: any) => !!param && param.trim().length > 0;
    const input$ = Rx.fromEvent(input, 'keyup');
    input$.pipe(
      Operator.debounceTime(1000),
      Operator.pluck('target', 'value'),
      Operator.filter(isEmpty),
      Operator.map(query => this.API_WIKI + query),
    ).subscribe((data) => {
      if (data.length === 0) {
        this.clearResults(results);
      } else {
        let res$ = ajax.get(data);
        let res = res$.pipe(
          Operator.pluck('response', 'query', 'search'),
          Operator.mergeMap(R.map(R.prop('title'))));
        this.appendResults(res, results);
      }
    });;



  }

  clearResults(container: any) {
    while (container.childElementCount > 0) {
      container.removeChild(container.firstChild);
    }
  }

  appendResults(result: any, container: any) {
    let li = document.createElement('li');
    let text = document.createTextNode(result);
    li.appendChild(text);
    container.appendChild(li);
  }
}
