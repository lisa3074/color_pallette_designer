"use strict";
window.addEventListener("DOMContentLoaded", globalVariables);

const HTML = {};

//-------------------- GLOBAL VARIABLES ---------------------//

function globalVariables() {
  console.log("globalVariables");
  HTML.c1 = document.querySelector(".c1");
  HTML.c2 = document.querySelector(".c2");
  HTML.c3 = document.querySelector(".c3");
  HTML.c4 = document.querySelector(".c4");
  HTML.c5 = document.querySelector(".c5");
  HTML.colorBox = document.querySelectorAll(".color_box");
  HTML.colorPicker = document.querySelector(".color");
  init();
  delegation();
}

//-------------------- CONTROLLER FUNCTIONS ---------------------//

function init() {
  console.log("init");
  document.querySelector(".click").addEventListener("click", function () {
    HTML.colorPicker.focus();
    document.querySelector(".clicky").classList.add("hide");
    HTML.colorPicker.click();
  });
  document.querySelector(".color").addEventListener("input", delegation); //Listen for new input -"live" color change
  document.querySelector("form").addEventListener("change", getUserInput); //Listen for change in harmony
}

//Function that only calls and recieves
function delegation() {
  console.log("delegation");
  let hexValue = getHexCode(); //Call function to get current hex code and store in a variable
  const seperateHex = splitHex(hexValue); //Calls splitHex to devide hex code into r, g and b, stores return in a variable. Use of object rgb.r + rgb.g + rgb.b (from "rgb" from the cosnt above and "r" as the object name)
  const rgb = calcRgbValues(seperateHex.r, seperateHex.g, seperateHex.b); //Call function, store return in object and variable. Use of object RGB.r + RGB.g + RGB.b
  const hsl = calcHslFromRgb(rgb.r, rgb.g, rgb.b); //call function, store return in object and variable. Use of object hsl.h + hsl.l + hsl.s
  showColor(hsl.h, hsl.s, hsl.l); //Show colors in hsl so we are able to use css variables
  console.log(hsl.h, hsl.s, hsl.l);

  //FIND AND SHOW CURRENT COLOR VALUES IN REAL TIME
  const currRgb = getCurrRgb(setColor); // RGB --- Call to calculate current RGB value for colors, store return object in variable
  showRgbCode(currRgb.rgb1, currRgb.rgb2, currRgb.rgb3, currRgb.rgb4, currRgb.rgb5); //Show RGB values in p tag
  const currHex = preCalcHex(currRgb.rgb1, currRgb.rgb2, currRgb.rgb3, currRgb.rgb4, currRgb.rgb5); // HEX --- Call to calculate current HEX code for colors, store return object in variable
  showHexCode(currHex.hex1, currHex.hex2, currHex.hex3, currHex.hex4, currHex.hex5); //Show HEX values in p tag
  const currHsl = preCalcHsl(currHex.hex1, currHex.hex2, currHex.hex3, currHex.hex4, currHex.hex5); // HSL --- Call to calculate current HSL value for colors, store return object in variable
  showHslCode(currHsl.hsl1, currHsl.hsl2, currHsl.hsl3, currHsl.hsl4, currHsl.hsl5); //Show HSL values in p tag
  textVariables();
}

//-------------------- MODEL / CALCUATING FUNCTIONS ---------------------//

//Returns current hex code
function getHexCode() {
  console.log("getHexCode");
  //get hex code from color picker and return value
  const hexColor = HTML.colorPicker.value;
  return hexColor;
}

//Adds the right extension in dataset to get the right harmony
function getUserInput() {
  console.log("userInput");
  let e;
  if (document.querySelector("#analogous").checked) {
    console.log("Analogous");
    let e = "ana";
    setColor(e);
  } else if (document.querySelector("#monochromatic").checked) {
    console.log("Monochromatic");
    let e = "mono";
    setColor(e);
  } else if (document.querySelector("#triad").checked) {
    console.log("Triad");
    let e = "tri";
    setColor(e);
  } else if (document.querySelector("#complementary").checked) {
    console.log("Complementary");
    let e = "compl";
    setColor(e);
  } else if (document.querySelector("#compound").checked) {
    console.log("Compound");
    let e = "compo";
    setColor(e);
  } else if (document.querySelector("#shades").checked) {
    console.log("Shades");
    let e = "sha";
    setColor(e);
  }
  delegation();
}

//Change color dataset depending on the harmony chosen
function setColor(e) {
  console.log("setColor");
  HTML.c1.dataset.color = "c1" + e;
  HTML.c2.dataset.color = "c2" + e;
  HTML.c3.dataset.color = "c3" + e;
  HTML.c4.dataset.color = "c4" + e;
  HTML.c5.dataset.color = "c5" + e;
}

//Find the two characters of r, g and b //Make into object for return of multiple values
function splitHex(hexValue) {
  console.log("splitHex");
  let r = hexValue.substring(1, 3);
  let g = hexValue.substring(3, 5);
  let b = hexValue.substring(5, 6 + 1);
  const rgb = { r, g, b };
  return rgb;
}

//Parses the hex strings into integer numbers from the hexadecimal numerical system to use the for rgb values //Make into object for return of multiple values
function calcRgbValues(r, g, b) {
  console.log("calcRGB");
  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);
  const RGB = { r, g, b };
  return RGB;
}

//Gets the current RGB value from the console //Make into object for return of multiple values
function getCurrRgb() {
  console.log("calcCurrRgb");
  const currRbgC1 = getComputedStyle(HTML.c1);
  const currRbgC2 = getComputedStyle(HTML.c2);
  const currRbgC3 = getComputedStyle(HTML.c3);
  const currRbgC4 = getComputedStyle(HTML.c4);
  const currRbgC5 = getComputedStyle(HTML.c5);
  const rgb1 = currRbgC1.backgroundColor;
  const rgb2 = currRbgC2.backgroundColor;
  const rgb3 = currRbgC3.backgroundColor;
  const rgb4 = currRbgC4.backgroundColor;
  const rgb5 = currRbgC5.backgroundColor;
  const currRbg = { rgb1, rgb2, rgb3, rgb4, rgb5 };
  return currRbg;
}

//Calls a calculation function to convert RGB to Hex (one at a time), gets multiple values in return and makes them into an object for return to delegation()
function preCalcHex(rgb1, rgb2, rgb3, rgb4, rgb5) {
  console.log("preCalcHex");
  const hex1 = calcHexFromRgb(rgb1);
  const hex2 = calcHexFromRgb(rgb2);
  const hex3 = calcHexFromRgb(rgb3);
  const hex4 = calcHexFromRgb(rgb4);
  const hex5 = calcHexFromRgb(rgb5);
  const currHex = { hex1, hex2, hex3, hex4, hex5 };
  return currHex;
}

//Calls a calculation function to convert HEX to HSL (one at a time), gets multiple values in return and makes them into an object for return to delegation()
function preCalcHsl(hex1, hex2, hex3, hex4, hex5) {
  console.log("preCalcHsl");
  const hsl1 = calcHslFromHex(hex1);
  const hsl2 = calcHslFromHex(hex2);
  const hsl3 = calcHslFromHex(hex3);
  const hsl4 = calcHslFromHex(hex4);
  const hsl5 = calcHslFromHex(hex5);
  const currHsl = { hsl1, hsl2, hsl3, hsl4, hsl5 };
  return currHsl;
}

//--------------- DISPLAY FUNCTIONS -------------------//

//Set the hue to current hue
function showColor(h, s, l) {
  console.log("showColor");
  HTML.c1.style.setProperty("--hue", h);
  HTML.c2.style.setProperty("--hue", h);
  HTML.c3.style.setProperty("--hue", h);
  HTML.c4.style.setProperty("--hue", h);
  HTML.c5.style.setProperty("--hue", h);

  HTML.c1.style.setProperty("--sat", s);
  HTML.c2.style.setProperty("--sat", s);
  HTML.c3.style.setProperty("--sat", s);
  HTML.c4.style.setProperty("--sat", s);
  HTML.c5.style.setProperty("--sat", s);

  HTML.c1.style.setProperty("--lum", l);
  HTML.c2.style.setProperty("--lum", l);
  HTML.c3.style.setProperty("--lum", l);
  HTML.c4.style.setProperty("--lum", l);
  HTML.c5.style.setProperty("--lum", l);
}

//Shows HEX color values in p tag for all colorboxes
function showHexCode(hex1, hex2, hex3, hex4, hex5) {
  console.log("showAllHexCode");
  document.querySelector(".hex_code_c1").textContent = `HEX: ${hex1}`;
  document.querySelector(".hex_code_c2").textContent = `HEX: ${hex2}`;
  document.querySelector(".hex_code_c3").textContent = `HEX: ${hex3}`;
  document.querySelector(".hex_code_c4").textContent = `HEX: ${hex4}`;
  document.querySelector(".hex_code_c5").textContent = `HEX: ${hex5}`;
}

//Shows RGB color values in p tag for all colorboxes
function showRgbCode(bg1, bg2, bg3, bg4, bg5) {
  console.log("showRGBCode");
  document.querySelector(".rgb_code_c1").textContent = `RGB: ${bg1}`;
  document.querySelector(".rgb_code_c2").textContent = `RGB: ${bg2}`;
  document.querySelector(".rgb_code_c3").textContent = `RGB: ${bg3}`;
  document.querySelector(".rgb_code_c4").textContent = `RGB: ${bg4}`;
  document.querySelector(".rgb_code_c5").textContent = `RGB: ${bg5}`;
}

//Shows HSL color values in p tag for all colorboxes
function showHslCode(hsl1, hsl2, hsl3, hsl4, hsl5) {
  console.log("showHslCode");
  document.querySelector(".hsl_code_c1").textContent = `HSL: ${hsl1}`;
  document.querySelector(".hsl_code_c2").textContent = `HSL: ${hsl2}`;
  document.querySelector(".hsl_code_c3").textContent = `HSL: ${hsl3}`;
  document.querySelector(".hsl_code_c4").textContent = `HSL: ${hsl4}`;
  document.querySelector(".hsl_code_c5").textContent = `HSL: ${hsl5}`;
}

//------------------ BLACK BOXES (CALCULATIONS) -------------------//

//BLACK BOX FROM ASSIGNMENT
function calcHslFromRgb(r, g, b) {
  console.log("calcHSL");
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

  //Make an object to return multiple values
  const hsl = { h, s, l };

  //return object to delegation
  return hsl;
}

//BLACK BOX CALC FROM: https://css-tricks.com/converting-color-spaces-in-javascript/
function calcHexFromRgb(rgb) {
  console.log("calcHexFromRgb");
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

//BLACK BOX CALC FROM: https://css-tricks.com/converting-color-spaces-in-javascript/
function calcHslFromHex(H) {
  console.log("calcHslFromHex");
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  h = parseInt(h, 10);
  l = parseInt(l, 10);
  s = parseInt(s, 10);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

//
//
//
//
//
//------------------- TEXT -------------------//

//TEXT GLOBAL VARIABLES
function textVariables() {
  HTML.coolText = document.querySelector("#cooltext");
  HTML.characters = [];
  textInit();
}

//TEXT CONTROLLER
function textInit() {
  const text = getHtmlText();
  removeHtmlText();
  const charArray = createArray(text);
  createSpan();
  setAnimation();
}

//TEXT MODEL
function getHtmlText() {
  const text = HTML.coolText.textContent;
  return text;
}
function removeHtmlText() {
  HTML.coolText.textContent = "";
}
function createArray(text) {
  text.split("");
  const char = Array.from(text);
  char.forEach((entry) => {
    HTML.characters.push(entry);
  });
  return HTML.characters;
}

//TEXT DISPLAY
function createSpan() {
  HTML.characters.forEach((letter) => {
    const spans = document.createElement("span");
    spans.textContent = letter;
    HTML.coolText.appendChild(spans);
  });
}
function setAnimation() {
  const fade = document.querySelector("span");
  let counter = 0;
  document.querySelectorAll("span").forEach((e) => {
    e.style.setProperty("--delay", counter + "0ms");
    e.classList.add("fade_in");
    counter++;
  });
  setAnimation = setNoAnimation;
}
function setNoAnimation() {
  console.log("ani slut");
  HTML.coolText.textContent = "Click the box in the middle to change color";
}
