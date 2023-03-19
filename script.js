//Variables to write in manually :( 
const screeningDay = 28;
const filmDurationHours = 3;
const filmDurationMinutes = 22;
const screeningStartHour = 6;
const daysBetween = 20;

const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**  
*@param  {Date} date
*/
function  formatDate(date){

    const MONTHS = ["Jan", "Feb", "Mar","Apr", "May", "Jun","Jul", "Aug", "Sep","Oct", "Nov", "Dec"];

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
    /*:${seconds.toString().padStart(2,"0")}*/
}

function screeningDayCommunication(date) {

    const hours12 = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const AM = date.getHours() < 12;
    const day = date.getDate();





    // variables for the end of the film
    let screeningEndHour = screeningStartHour + filmDurationHours;
    const screeningEndMinute = filmDurationMinutes;

    if (AM){
        screeningEndHour = 99;
    }

    // variables for 'Screening Now!' blinking span, Thanks text when the film ends 
    const filmEndedToday = day===screeningDay && !AM && ((hours12===screeningEndHour && minutes > screeningEndMinute)||hours12 > screeningEndHour);
    const thanksDays = day + screeningDay < daysBetween;

    //variable to check if it is screening day and film hasn't started
    const screeningDayToday = day===screeningDay && ((hours12<screeningStartHour) || (AM && hours12>=screeningStartHour));

    //variable to check if the film is screening now
    const screeningNow = day===screeningDay && !AM && hours12 >=  screeningStartHour && !filmEndedToday;


    // hide date and time on the day of the screening
    document.getElementById('show-hide-timestamp').style.display =  day===screeningDay && !filmEndedToday ? "none" : "inline" ;

    // show Screening Day blinking banner 
    document.getElementById('blinking-span-day').style.display = screeningDayToday? "inline" : "none";
    
    // Screening Now blinking banner 
    document.getElementById('blinking-span-now').style.display = screeningNow ? "inline" : "none";
    
    //show the container with the thanks message
    document.getElementById('show-hide-thanks').style.display =  thanksDays || filmEndedToday ? "flex" : "none";

    //hide posters to make space for the thanks message
    document.getElementById('show-hide-posters').style.display =  !thanksDays && !filmEndedToday ? "flex" : "none";
    

    
}


setInterval(() => {
const now = new Date();
dateElement.textContent = formatDate(now);
timeElement.textContent = formatTime(now);
screeningDayCommunication(now);
}, 1);




//DAYS      const DAYS = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday" ];
//DAYS      ${DAYS[date.getDay()]},
//SECONDS   ${seconds.toString().padStart(2,"0")}