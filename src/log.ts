
export function log(value: any, ...vals: any[]) {
    const date = new Date();
    const pre = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}\t| `;

    console.log(pre, vals);

    // let ret = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}\t| ${value}`;
    // console.log(ret);
}