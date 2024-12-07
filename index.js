const yargs = require("yargs");
const robot = require("@jitsi/robotjs");
const { hideBin } = require("yargs/helpers");

let is_mouse;
let is_keyboard;

const codingCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  " ",
  "-",
  "=",
  "[",
  "]",
  "\\",
  "]",
  ":",
  ";",
  "'",
  '"',
  ",",
  ".",
  "/",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  "{",
  "}",
  "|",
  "<",
  ">",
  "~",
  "`",
  " ́",
  " ̈",
  " ̧",
];

const arg = yargs(hideBin(process.argv))
  .command("$0 [interval]", true, (yargs) => {
    yargs
      .positional("interval", {
        type: "number",
        describe: "the interval in second",
      })
      .default("interval", 5); // 60 seconds default
  })
  .usage("runs a desktop automator to run key your  mmouse move at interval")
  .example(
    "$0 -mk 3",
    "moves the mouse and press the keyboard after three seconds"
  )
  .option("m", {
    description: "enable the mouse",
    type: "boolean",
  })
  .option("k", {
    description: "enable the keyboard",
    type: "boolean",
  })
  .default("m", true)
  .help("h").argv;

let { m, k, interval } = arg;
// multiply seconds by 1000 to get milliseconds
interval = interval * 1000;

if (m) is_mouse = true;
if (k) is_keyboard = true;

function moveMouseBackAndForth() {
  // create two random points between 0 and 800 and 0 and 600
  const x = Math.floor(Math.random() * 800);
  const y = Math.floor(Math.random() * 600);
  robot.moveMouseSmooth(x, y);
}

function pressKeyBoard() {
  const randomCharacter = Math.floor(Math.random() * codingCharacters.length);
  robot.typeString(codingCharacters[randomCharacter]);
}

if (is_keyboard) setInterval(pressKeyBoard, interval);
if (is_mouse) setInterval(moveMouseBackAndForth, interval);
