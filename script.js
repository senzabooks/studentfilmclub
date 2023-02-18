
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

function  formatDate(date){

    const DAYS = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday" ];
    const MONTHS = ["Jan", "Feb", "Mar","Apr", "May", "Jun","Jul", "Aug", "Sep","Oct", "Nov", "Dec",];

    return `${DAYS[date.getDay()]}, ${date.getDay()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function formatTime(date) {

    const hours12 = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const isAM = date.getHours() < 12;

    return `${hours12.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")} ${isAM? "AM" : "PM"}`;

}


setInterval(() => {
const now = new Date();
dateElement.textContent = formatDate(now);
timeElement.textContent = formatTime(now);
}, 500);