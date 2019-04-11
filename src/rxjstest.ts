import { pairs, from, interval, of, asapScheduler, asyncScheduler, forkJoin, Observable } from "rxjs";
import { log } from "./log";
import { observeOn, map, take, tap, withLatestFrom } from "rxjs/operators";
import fetch from "node-fetch";
import { Agent } from "https";
import { async } from "rxjs/internal/scheduler/async";

export default function () {
    // randObs();
    // delayedRandObs();
    delayedFibonacciSequence();
    // scheduleTasks();
}

function* fibonacci() {
    let fn1 = 1, fn2 = 1;
    while (1) {
        const current = fn2;
        fn2 = fn1;
        fn1 = fn1 + current;
        yield current;
    }
}

function* randGenerator() {
    while (true) {
        const randNum = Math.floor(1 + Math.random() * 10);
        if (randNum > 9)
            return randNum;
        else
            yield randNum;
    }
}

function randObs() {
    const syncObs$ = from(randGenerator());
    // syncObs$.subscribe(log, console.error, () => { log('random number exceeded threshold'); });
    const asyncObs$ = syncObs$.pipe(observeOn(asapScheduler));
    log('logging once...');
    asyncObs$.subscribe(log, console.error, () => { log('random number exceeded threshold'); });
    log('logging twice...');
    log('logging third...');
    log('fetching...');

    // fetchEnvironments();
}

function delayedFibonacciSequence() {
    const fibonacci$: Observable<number> = from(fibonacci()).pipe(
        tap(val => log(`fib: ${val}`)),
        take(10)
        );
    const interval$ = interval(100).pipe(
        tap((n) => { log(`i=${n}`); }),
        take(10)
    );
    const randNum$ = from(randGenerator()).pipe(
        tap(val => log(`rand: ${val}`)),
        take(10)
    );

    // const asyncObs$ = fibonacci$.pipe(
    //     withLatestFrom(randNum$)
    // );
    const asyncObs$ = fibonacci$.pipe(observeOn(asyncScheduler)).pipe(
        withLatestFrom(randNum$.pipe(observeOn(asyncScheduler)))
    );

    asyncObs$.subscribe(
        /** next */     values => log(`latest: rand: ${values[1]} fib: ${values[0]}`),
        /** error */    console.error,
        /** complete */ () => { log('complete'); });
}

function delayedRandObs() {
    // const asyncObs$ = from(randGenerator())
    //     .pipe(
    //         observeOn(asyncScheduler)
    //     );
    const asyncObs$ = forkJoin(
        // from(randGenerator())
        //     .pipe(
        //         observeOn(asyncScheduler)
        //     ),
        // from(randGenerator(), asyncScheduler),
        from(randGenerator()),
        interval(100).pipe(
            tap((n) => { log(`i=${n}`); }),
            take(12)
        )
    ).pipe(
        map(res => res[0])
    );
    asyncObs$.subscribe(log, console.error, () => { log('forkjoin complete'); });
}

function scheduleTasks() {
    const task1 = { taskId: 'task1', start: 0, num: 0 };
    const task2 = { taskId: 'task2', start: 100, num: 100 };
    const task3 = { taskId: 'task2', start: 2000, num: 2000 };
    async.schedule(task, 3000, task1);
    async.schedule(task, 1000, task2);
    async.schedule(task, 500, task3);
}

function task(state) {
    const { num: curNum, start } = state;
    log(curNum);
    if (curNum - start < 5) {
        const newState = { ...state, num: curNum + 1 };
        this.schedule(newState, 1000);
    } else {
        log(`'${state.taskId}' done`);
    }
}

async function fetchEnvironments() {
    const environments: { displayName: string, id: string }[] = await fetch('https://url', {
        agent: new Agent({
            rejectUnauthorized: false
        })
    })
        .then(handleErrors)
        .then(response => response.json())
        .catch(console.error);
    for (const environment of environments) {
        log(JSON.stringify(environment, null, 4));
    }
}

function handleErrors(response: Response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function PAIRS() {
    const lol = { "al": "be", "cl": "ce" };
    const obs = pairs(lol);
    obs.subscribe(log);
}