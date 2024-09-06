const aboutText = document.getElementsByClassName("about-text")[0];
const currentText = document.getElementsByClassName("current-text")[0];
const currentPosterBlock = document.getElementById("current-poster");
//console.log(currentText, aboutText);

const groq_query = `*[_type == "main"] {
    aboutText,
    currentText,
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
      html = ` <a href="${linkDef.href}">${html}</a> `;
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
      throw new Error("errrrror");
    }
    const json = await response.json();
    console.log(json);
    if (aboutText)
      aboutText.innerHTML = portableTextToHTML(json.result[0].aboutText);
    if (currentText) currentText.innerHTML = json.result[0].currentText;
    currentPosterBlock.setAttribute("src", json.result[0].posterUrl);
  } catch (error) {
    console.log(error.message);
  }
}

getData();

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
}

setInterval(() => {
  const now = new Date();
  dateElement.textContent = formatDate(now);
  timeElement.textContent = formatTime(now);
  screeningDayCommunication(now);
}, 1);
