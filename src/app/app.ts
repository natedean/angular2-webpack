import {Component} from 'angular2/core';
import {Observable} from "rxjs/Observable";

let stream$ = new Observable((observer) => {
    let count = 0;

    let interval = setInterval(() => {
        count = count + 1;
        observer.next(count);
    }, 1000);

    return () => {
        clearInterval(interval);
    }
});


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

let mapNumberToString = (x: number) : string => x % 2 === 0 ? x + ' is even' : x + ' is odd!';

@Component({
  selector: 'app',
  template: ` <h1 *ngIf="!observableMessage">LOADING THE OBSERVABLE</h1>
              <h1 *ngIf="observableMessage">{{ observableMessage }}</h1>
              <br>
              <h1 *ngIf="!promiseMessage">LOADING THE PROMISE</h1>
              <h1 *ngIf="promiseMessage">{{ promiseMessage }}</h1>
              <br>
              <h3>This is an observable counter with an async pipe. From scratch. Counter: {{ stream | async }}</h3>
              `
})
export class App {
    observableMessage;
    promiseMessage;
    stream1Subscription;
    stream;
    streamSubscription;

    constructor() {
        this.stream1Subscription = stream1$.subscribe((data) => {
            this.observableMessage = data;
        });

        getPromiseMessage.then((data) => {
            this.promiseMessage = data;
        });

        this.stream =  stream$
                .startWith(0)
                .map(mapNumberToString);

        setTimeout(() => {
            this.streamSubscription.unsubscribe();
        }, 5000);
    }



}
