const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let futureDate = new Date(2022, 3, 2, 17, 30,26,0);
// console.log(futureDate);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const min = futureDate.getMinutes();
let month = futureDate.getMonth();
month = months[month];

const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];


giveaway.textContent = `giveaway ends on ${weekday} ${date} ${month} ${year} ${hours}:${min}am`;


const futureTime = futureDate.getTime();
console.log(futureTime);

function getRemaingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;
    //1s = 1000ms
    // 1m =60s;
    //1hr = 60m;
    //day = 24hr;

    //in ms
    const oneday = 24 * 60 * 60 * 1000;
    const oneHr = 60 * 60 * 1000;
    const oneMin = 60 * 1000;

    //calsulate all days
    let days = t / oneday;
    days = Math.floor(days);
    let hours = Math.floor((t % oneday) / oneHr);
    let minutes = Math.floor((t % oneHr) / oneMin);
    let seconds = Math.floor((t % oneMin) / 1000);

    //set value array
    const values = [days, hours, minutes, seconds];

    function format(item) {
        if (item < 10) {
            return item = `0${item}`;
        }
        return item;
    }
    items.forEach(function (item, index) {
        item.innerHTML = format(values[index]);
    })
    if(t<0){
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class='expired'>sory This giveaway is expired</h4>`
    }
}


// countdown
let countdown = setInterval(getRemaingTime, 1000)
getRemaingTime();