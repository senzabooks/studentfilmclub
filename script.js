const screeningDay = 21;
const filmDurationHours = 1;
const filmDurationsMinutes = 28;
const screeningStartHour = 7;


const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**  
*@param  {Date} date
*/
function  formatDate(date){

    const MONTHS = ["Jan", "Feb", "Mar","Apr", "May", "Jun","Jul", "Aug", "Sep","Oct", "Nov", "Dec",];

    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()} `;
}
/**  
*@param  {Date} date
*/
function formatTime(date) {

    const hours12 = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const AM = date.getHours() < 12;

    return `${hours12.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")} ${AM? "AM" : "PM"}`;
}

function displayBanner(date) {

    const hours12 = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const AM = date.getHours() < 12;
    const day = date.getDate();

    const screeningEndHour = screeningStartHour +filmDurationHours;
    const screeningEndMinute = filmDurationsMinutes;

    // Screening Day blinking banner 
    const screeningDayToday = day===screeningDay && hours12<screeningStartHour;
    document.getElementById('blinking-banner-day').style.display = screeningDayToday? "flex" : "none";

    // Thanks Banner when the film ends
    const filmEnded = day===screeningDay && ((hours12===screeningEndHour && minutes > screeningEndMinute)||hours12 > screeningEndHour);
    const thanksBannerDays = day - screeningDay >= 0 && day - screeningDay <= 3;
    document.getElementById('thanks-banner').style.display =  thanksBannerDays && filmEnded ? "flex" : "none"; 

    // Screening Now blinking banner 
    const screeningNow = day===screeningDay && hours12 >=  screeningStartHour && !filmEnded;
    document.getElementById('blinking-banner-now').style.display = screeningNow? "flex" : "none";
}


setInterval(() => {
const now = new Date();
dateElement.textContent = formatDate(now);
timeElement.textContent = formatTime(now);
displayBanner(now);
}, 500);



//DAYS      const DAYS = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday" ];
//DAYS      ${DAYS[date.getDay()]},
//SECONDS   ${seconds.toString().padStart(2,"0")}