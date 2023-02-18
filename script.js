
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
    const isAM = date.getHours() < 12;

    return `${hours12.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")} ${isAM? "AM" : "PM"}`;

}

document.getElementById("screening-now").style.display="none"

setInterval(() => {
const now = new Date();
dateElement.textContent = formatDate(now);
timeElement.textContent = formatTime(now);
}, 500);


//DAYS      const DAYS = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday" ];
//DAYS      ${DAYS[date.getDay()]},
//SECONDS   ${seconds.toString().padStart(2,"0")}