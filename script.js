const countdown = () => {

//date and time to countdown to 

const countDate = new Date("Feb 21,2023 19:08:00").getTime();
const now = new Date().getTime();
    
document.querySelector(".now").innerText = now;

//calculate remaining time

const remainingTime = countDate - now;


// time to days hours minutes seconds

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const textDay = Math.floor(remainingTime / day);
const textHour = Math.floor((remainingTime % day)/hour);
const textMinute = Math.floor((remainingTime % hour)/minute);
const textSecond = Math.floor((remainingTime % minute)/second);

// switching from plural to singular on html thx to bartekp.nl
document.querySelector(".days").innerText = textDay === 1 ? "day" : "days";
document.querySelector(".hours").innerText = textHour === 1 ? "hour" : "hours";
document.querySelector(".minutes").innerText = textMinute === 1 ? "minute" : "minutes";
document.querySelector(".seconds").innerText = textSecond === 1 ? "second" : "seconds";


//updating the text on html
//check if the time is past 0 

document.querySelector(".day").innerText = textDay > 0 ? textDay: 0;
document.querySelector(".hour").innerText = textHour > 0 ? textHour: 0;
document.querySelector(".minute").innerText = textMinute > 0 ? textMinute: 0;
document.querySelector(".second").innerText = textSecond > 0 ? textSecond: 0;




//run the countdown 
}
setInterval (countdown, 500);

