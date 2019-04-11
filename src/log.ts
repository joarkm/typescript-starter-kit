
export function log(value: any, ...vals: any[]) {
    const date = new Date();
    const pre = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}\t`;
    if (value.toString())
        value = value.toString()
    
    console.log(pre, value);
    console.log.apply(vals);

    // let ret = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}\t| ${value}`;
    // console.log(ret);
}