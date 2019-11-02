import * as React from 'react';

interface Square {
    readonly side: number,
    color?: string,
}

const square1 = {
    side: 10
} as Square;

square1.color = 'sa';

const mas1 = [1,2,3,4,5,6];
const mas2 = [1,2,3,4,5,6].map(el => el.toString());

function reverse<T>(mas: T[]): Array<T> {
    return mas.reverse();
}

reverse(mas1)
reverse(mas2)

function r(): number
function r(a: number): number
function r(a: string): string[]

function r (a?: string | number) {
    if (a === undefined) {
        return 'null';
    }

    return typeof a === 'string' ? [a] : a;
}

console.log('без аргументов: ', typeof r());
console.log('аргумент - число: ', typeof r(1));
console.log('аргумент - строка: ', typeof r('1'));