// format: [prefix]_mmddyyyy_ hhmmss
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export default function randomText() {
  const date = new Date();
  const hour = addZero(date.getHours());
  const minute = addZero(date.getMinutes());
  const second = addZero(date.getSeconds());
  const text = `${hour}${minute}${second}`;

  return text;
}
