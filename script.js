"use strict";
window.addEventListener("DOMContentLoaded", globalVariables);

const HTML = {};

function globalVariables() {
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

function init() {
  document.querySelector(".click").addEventListener("click", function() {
    HTML.colorPicker.focus();
    document.querySelector(".clicky").classList.add("hide");
    HTML.colorPicker.click();
  });
  document.querySelector(".color").addEventListener("input", delegation);
}

function delegation() {
  //Call function to get current hex code and store in a variable
  const hexValue = getHexCode();

  //Calls splitHex to devide hex code into r, g and b, stores return in a variable
  const rgb = splitHex(hexValue);
  //Use of object rgb.r + rgb.g + rgb.b (from "rgb" from the cosnt above and "r" as the object name)

  //Call function, store return in object and variable. Use of object RGB.r + RGB.g + RGB.b
  const RGB = calcRGB(rgb.r, rgb.g, rgb.b);
  //Show rgb-code in p tag
  showRGBCode();

  //call function, store return in object and variable. Use of object hsl.h + hsl.l + hsl.s
  const hsl = calcHSL(RGB.r, RGB.g, RGB.b);
  //Show colors
  showColor(hsl.h);

  document.querySelector("form").addEventListener("change", userInput);
}

function getHexCode() {
  console.log("getHexCode");
  //get hex code from color picker
  const hexColor = HTML.colorPicker.value;
  return hexColor;
}

function userInput() {
  console.log("userInput");
  let o;
  if (document.querySelector("#analogous").checked) {
    console.log("Analogous");
    //extension in dataset to get the right hsl value
    let o = "ana";
    color(o);
  } else if (document.querySelector("#monochromatic").checked) {
    console.log("Monochromatic");
    let o = "mono";
    color(o);
  } else if (document.querySelector("#triad").checked) {
    console.log("Triad");
    let o = "tri";
    color(o);
  } else if (document.querySelector("#complementary").checked) {
    console.log("Complementary");
    let o = "compl";
    color(o);
  } else if (document.querySelector("#compound").checked) {
    console.log("Compound");
    let o = "compo";
    color(o);
  } else if (document.querySelector("#shades").checked) {
    console.log("Shades");
    let o = "sha";
    color(o);
  }
  showRGBCode();
}

function color(o) {
  //Change color classes depending on the harmony chosen
  HTML.c1.dataset.color = "c1" + o;
  HTML.c2.dataset.color = "c2" + o;
  HTML.c3.dataset.color = "c3" + o;
  HTML.c4.dataset.color = "c4" + o;
  HTML.c5.dataset.color = "c5" + o;
}

function showColor(h) {
  console.log("showColor");
  //Set the hue to current hue
  HTML.c1.style.setProperty("--hue", h);
  HTML.c2.style.setProperty("--hue", h);
  HTML.c3.style.setProperty("--hue", h);
  HTML.c4.style.setProperty("--hue", h);
  HTML.c5.style.setProperty("--hue", h);
}

function splitHex(hexValue) {
  console.log("splitHex");
  //Find the two characters of r, g and b
  let r = hexValue.substring(1, 3);
  let g = hexValue.substring(3, 5);
  let b = hexValue.substring(5, 6 + 1);
  //Make into object for return of multiple values
  const rgb = { r, g, b };
  //return object to delegation
  return rgb;
}

function calcRGB(r, g, b) {
  console.log("calcRGB");
  //Parse the strings into integer numbers from the hexadecimal numerical system
  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);
  //Make into object for return of multiple values
  const RGB = { r, g, b };
  //return object to delegation
  return RGB;
}
//BLACK BOX FROM ASSIGNMENT
function calcHSL(r, g, b) {
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

function showRGBCode() {
  console.log("showRGBCode");
  //Show color value
  const style1 = getComputedStyle(HTML.c1);
  const bg1 = style1.backgroundColor;
  document.querySelector(".rgb_code_c1").textContent = `RGB: ${bg1}`;

  const style2 = getComputedStyle(HTML.c2);
  const bg2 = style2.backgroundColor;
  document.querySelector(".rgb_code_c2").textContent = `RGB: ${bg2}`;

  const style3 = getComputedStyle(HTML.c3);
  const bg3 = style3.backgroundColor;
  document.querySelector(".rgb_code_c3").textContent = `RGB: ${bg3}`;

  const style4 = getComputedStyle(HTML.c4);
  const bg4 = style4.backgroundColor;
  document.querySelector(".rgb_code_c4").textContent = `RGB: ${bg4}`;

  const style5 = getComputedStyle(HTML.c5);
  const bg5 = style5.backgroundColor;
  document.querySelector(".rgb_code_c5").textContent = `RGB: ${bg5}`;
  showAllHexCode(bg1, bg2, bg3, bg4, bg5);
}
function showAllHexCode(bg1, bg2, bg3, bg4, bg5, hexValue) {
  document.querySelector(".hex_code_c3").textContent = `HEX: ${hexValue}`;
  const hex1 = calcHex(bg1);
  const hex2 = calcHex(bg2);
  const hex3 = calcHex(bg3);
  const hex4 = calcHex(bg4);
  const hex5 = calcHex(bg5);
  document.querySelector(".hex_code_c1").textContent = `HEX: ${hex1}`;
  document.querySelector(".hex_code_c2").textContent = `HEX: ${hex2}`;
  document.querySelector(".hex_code_c3").textContent = `HEX: ${hex3}`;
  document.querySelector(".hex_code_c4").textContent = `HEX: ${hex4}`;
  document.querySelector(".hex_code_c5").textContent = `HEX: ${hex5}`;
  showHslCode(hex1, hex2, hex3, hex4, hex5);
}

//BLACK BOX CALC FROM: https://css-tricks.com/converting-color-spaces-in-javascript/
function calcHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb
    .substr(4)
    .split(")")[0]
    .split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

function showHslCode(hex1, hex2, hex3, hex4, hex5) {
  console.log("showHslCode");
  const hsl1 = calcHsl(hex1);
  const hsl2 = calcHsl(hex2);
  const hsl3 = calcHsl(hex3);
  const hsl4 = calcHsl(hex4);
  const hsl5 = calcHsl(hex5);
  document.querySelector(".hsl_code_c1").textContent = `HSL: ${hsl1}`;
  document.querySelector(".hsl_code_c2").textContent = `HSL: ${hsl2}`;
  document.querySelector(".hsl_code_c3").textContent = `HSL: ${hsl3}`;
  document.querySelector(".hsl_code_c4").textContent = `HSL: ${hsl4}`;
  document.querySelector(".hsl_code_c5").textContent = `HSL: ${hsl5}`;
}
//BLACK BOX CALC FROM: https://css-tricks.com/converting-color-spaces-in-javascript/
function calcHsl(H) {
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
