"use strict";
window.addEventListener("DOMContentLoaded", start);

const HTML = {};

function start() {
  HTML.colorBox = document.querySelector(".show_color");
  HTML.colorPicker = document.querySelector(".color");
  clickAble();
}
function clickAble() {
  const clickText = document.querySelector(".click");
  HTML.colorBox.addEventListener("click", function() {
    HTML.colorPicker.focus();
    clickText.classList.add("hide");
    HTML.colorPicker.click();
  });
  getHex();
}

function getHex() {
  console.log("getHex");
  //Get current hex code
  const hexColor = HTML.colorPicker.value;
  //send hex code as a parameter to functions
  splitHex(hexColor);
  showColor(hexColor);
  showHex(hexColor);
}
function splitHex(hexColor) {
  //Find the two characters of r, g and b
  let r = hexColor.substring(1, 3);
  let g = hexColor.substring(3, 5);
  let b = hexColor.substring(5, 6 + 1);
  //Parse the strings into integer numbers from the hexadecimal numerical system
  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);
  //Send r, g, b as parameters when calling the functions
  calculations(r, g, b);
  showRgb(r, g, b);
  //goes back to get a new hex code on input change
  document.querySelector("input").addEventListener("input", getHex);
}

function calculations(r, g, b) {
  console.log("calculations");
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  //Parse h, s and l into integer numbers
  h = parseInt(h);
  s = parseInt(l);
  l = parseInt(s);
  //send parameters with call to function
  showHsl(h, s, l);
}

//DISPLAY FUNCTIONS
function showColor(hexColor) {
  console.log("showColor");
  //Let the bg color be the same color as the current hex code
  HTML.colorBox.style.setProperty("--main-bg-color", hexColor);
}

function showHex(hexColor) {
  console.log("showHex");
  const hexParagraph = document.querySelector(".show_hex");
  hexParagraph.textContent = "";
  //Write the hex code in HTML
  hexParagraph.textContent += `HEX: ${hexColor}`;
}

function showRgb(r, g, b) {
  console.log("showRgb");
  const rgbParagraph = document.querySelector(".show_rgb");
  rgbParagraph.textContent = "";
  //Write the rgb code in HTML
  rgbParagraph.textContent += `RGB: ${r}, ${g}, ${b}`;
}
function showHsl(h, s, l) {
  console.log("showHsl");
  const hslParagraph = document.querySelector(".show_hsl");
  hslParagraph.textContent = "";
  //Write the hsl code in HTML
  hslParagraph.textContent += `HSL ${h}, ${s}%, ${l}%`;
}
