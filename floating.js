let movingDiv = document.getElementById("floatingDiv");
let floatingImage = document.getElementById("floatingImage");

let xPos = 0; // Start at left
let yPos = 0; // Start at top
let xSpeed = 0.5;
let ySpeed = 0.5;

function updatePosition() {
  xPos += xSpeed;
  yPos += ySpeed;

  if (xPos + movingDiv.offsetWidth >= window.innerWidth || xPos <= 0)
    xSpeed = -xSpeed;
  if (yPos + movingDiv.offsetHeight >= window.innerHeight || yPos <= 0)
    ySpeed = -ySpeed;

  movingDiv.style.left = xPos + "px";
  movingDiv.style.top = yPos + "px";
}

function adjustPositionOnResize() {
  xPos = Math.min(xPos, window.innerWidth - floatingImage.offsetWidth);
  yPos = Math.min(yPos, window.innerHeight - floatingImage.offsetHeight);

  movingDiv.style.left = xPos + "px";
  movingDiv.style.top = yPos + "px";
}

var intervalId = setInterval(updatePosition, 10);

window.addEventListener("resize", adjustPositionOnResize);

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("wheel", function (e) {
  e.preventDefault();
});
