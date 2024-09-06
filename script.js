const aboutText = document.getElementsByClassName("about-text")[0];
const mainText = document.getElementsByClassName("main-text")[0];
const floatingImageBlock = document.getElementById("floatingImage");
console.log(mainText, aboutText);

const groq_query = `*[_type == "main"] {
    aboutText,
    mainText,
    'posterUrl': poster.asset -> url
    }`;
function findMark(markDefs, key) {
  return markDefs.find((mark) => mark._key === key);
}

// Function to wrap text with appropriate tags based on marks
function applyMarks(text, marks, markDefs) {
  let html = text;

  html = html
    .split("\n")
    .map((line) => line.trim())
    .join("<br>");

  // Loop through each mark and apply appropriate HTML tags
  marks.forEach((mark) => {
    if (mark === "strong") {
      html = `<strong>${html}</strong>`;
    }

    if (mark === "em") {
      html = `<em>${html}</em>`;
    }

    const linkDef = findMark(markDefs, mark);
    if (linkDef && linkDef._type === "link" && linkDef.href) {
      html = ` <a href="${linkDef.href}">${html}</a>`;
    }
  });

  return html;
}

// Function to convert Portable Text to HTML
function portableTextToHTML(portableText) {
  return portableText
    .map((block) => {
      if (block._type === "block") {
        const html = block.children
          .map((child) => {
            if (child._type === "span") {
              // Apply marks to each span of text
              return applyMarks(
                child.text,
                child.marks || [],
                block.markDefs || []
              );
            }
            return "";
          })
          .join("");

        return `<p>${html}</p>`;
      }
      return "";
    })
    .join("");
}

// Use the function to convert Portable Text to HTML

async function getData() {
  const url = `https://9zf32meo.api.sanity.io/v2024-04-09/data/query/production?query=${encodeURIComponent(
    groq_query
  )}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("fjhafalkjfla");
    }
    const json = await response.json();
    console.log(json);
    if (aboutText)
      aboutText.innerHTML = portableTextToHTML(json.result[0].aboutText);
    if (mainText) mainText.innerHTML = json.result[0].mainText;
    floatingImageBlock.setAttribute("src", json.result[0].posterUrl);
  } catch (error) {
    console.log(error.message);
  }
}

getData();
//Variables to write in manually :(
const screeningDay = 3;
//const filmDurationHours = 2;
//const filmDurationMinutes = 23;
//const screeningStartHour = 7;
const daysBetween = 4;

const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 *@param  {Date} date
 */
function formatDate(date) {
  const MONTHS = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

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

  return `${hours12.toString().padStart(1, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${
    AM ? "am" : "pm"
  }`;
  /*:${seconds.toString().padStart(2,"0")}*/
}

function screeningDayCommunication(date) {
  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const AM = date.getHours() < 12;
  const day = date.getDate();

  // variables for the end of the film
  //let screeningEndHour = screeningStartHour + filmDurationHours;
  //const screeningEndMinute = filmDurationMinutes;

  //thing to prevent displaying screening now banner too early
  //if (AM)
  //{ screeningEndHour = 99;}

  //[[[i use these to comment out thingss i dont want to use but theyre already in the comments]]]

  // variables for 'Screening Now!' blinking span, Thanks text when the film ends
  //const filmEndedToday = day===screeningDay && !AM && ((hours12===screeningEndHour && minutes > screeningEndMinute)||hours12 > screeningEndHour);
  //   const thanksDays = screeningDay + 7 > day && day > screeningDay;

  //variable to check if it is screening day [[[and film hasn't started]]]
  //   const screeningDayToday = day === screeningDay;
  //&& ((hours12<screeningStartHour) || (AM && hours12>=screeningStartHour));

  //variable to check if the film is screening now
  //const screeningNow = day===screeningDay && !AM && hours12 >=  screeningStartHour && !filmEndedToday;

  // hide date and time on the day of the screening
  // document.getElementById('show-hide-timestamp').style.display =  screeningDayToday ? "none" : "inline" ;
  //&& !filmEndedToday ? "none" : "inline" ;

  // show Screening Day blinking banner
  //   document.getElementById("blinking-span-day").style.display = screeningDayToday
  //     ? "inline"
  //     : "none";

  // Screening Now blinking banner
  // document.getElementById('blinking-span-now').style.display = screeningNow ? "inline" : "none";

  //show the container with the thanks message
  //   document.getElementById("show-hide-thanks").style.display = thanksDays
  //     ? "flex"
  //     : "none";
  //|| filmEndedToday ? "flex" : "none";

  //hide posters to make space for the thanks message
  //   document.getElementById("show-hide-posters").style.display = !thanksDays
  //     ? "flex"
  //     : "none";
  //&& !filmEndedToday ? "flex" : "none";
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
