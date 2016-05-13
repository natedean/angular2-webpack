import {Component} from 'angular2/core';
import {Observable} from "rxjs/Observable";

let stream1$ = new Observable(observer => {
    setTimeout(() => {
        observer.next('observable timeout');
    }, 2000);
});

let getPromiseMessage = new Promise(resolve => {
    setTimeout(() => {
        resolve('This is a promise!');
    }, 3000);
});

@Component({
  selector: 'app',
  template: ` <h1 *ngIf="!observableMessage">LOADING THE OBSERVABLE</h1>
              <h1 *ngIf="observableMessage">{{ observableMessage }}</h1>
              <br>
              <h1 *ngIf="!promiseMessage">LOADING THE PROMISE</h1>
              <h1 *ngIf="promiseMessage">{{ promiseMessage }}</h1>`
})
export class App {
    observableMessage;
    promiseMessage;
    stream1Subscription;

    constructor() {
        this.stream1Subscription = stream1$.subscribe((data) => {
            this.observableMessage = data;
        });

        setTimeout(() => {
            this.stream1Subscription.unsubscribe();
        }, 1000);

        getPromiseMessage.then((data) => {
            this.promiseMessage = data;
        });

    }



}
