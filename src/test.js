"use strict";
exports.__esModule = true;
var square1 = {
    side: 10
};
square1.color = 'sa';
var mas1 = [1, 2, 3, 4, 5, 6];
var mas2 = [1, 2, 3, 4, 5, 6].map(function (el) { return el.toString(); });
function reverse(mas) {
    return mas.reverse();
}
reverse(mas1);
reverse(mas2);
function r(a) {
    if (a === undefined) {
        return 'null';
    }
    return typeof a === 'string' ? [a] : a;
}
console.log('без аргументов: ', typeof r());
console.log('аргумент - число: ', typeof r(1));
console.log('аргумент - строка: ', typeof r('1'));
