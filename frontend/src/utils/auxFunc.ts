export function createArraySoungs() {
  const ArraySongs = [];
  console.log("test");
  for (let i = 1; i <= 4; i++) {
    let fileSoung = require(`../audio/sound${i}.mp3`) || false;
    if (!fileSoung) {
      break;
    }
    let audio = new Audio(fileSoung);
    ArraySongs.push(audio);
  }

  return ArraySongs;
}

export function checkValue(val: number, min: number) {
  if (val < min) {
    return min;
  } else {
    return val;
  }
}

export const sleep = (seconds: number) => {
  let time = seconds * 1000;
  return new Promise((res) => setTimeout(res, time));
};
