var moment = require('moment');


var date= moment();
date.add(100, 'years').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));
//
// Challenge
// 10:35 am 12hours clock

console.log(new Date().getTime());
var someTimestamp=moment().valueOf();
console.log(someTimestamp);

var createdAt=1234;
var time = moment(createdAt);
console.log(time.format('h:mm a'));