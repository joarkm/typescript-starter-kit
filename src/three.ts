import { timer, Subscription, of } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { log } from "./log";


// const { log } = console;

export default function() {

    const subscriptions: Subscription = new Subscription();
    
    const setsOfValues = [
      ["a", "b", "c", "d", "e", "f"],
      [1, 2, 3, 4, 5, 6],
      ["😀", "🐶", "🍏", "⚽️", "🚗", "⌚️"]
    ];
    
    const threeStreamsOfThings$ = timer(0, 1800).pipe(
      take(3),
      tap(val => log(val)),
      map(outerNumber =>
        timer(0, 250).pipe(
          take(6),
          map(innerNumber => setsOfValues[outerNumber][innerNumber])
        )
      )
    );
    
    threeStreamsOfThings$.subscribe((innerObservable) => {
        log('New observable', );
        innerObservable.subscribe(
            val => log(val)
        );
    });
}
