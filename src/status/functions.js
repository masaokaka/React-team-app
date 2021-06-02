export const timestampToDate = (timestamp) => {
    let dateTime = new Date(timestamp)
  let date = dateTime.toLocaleDateString(); // => 2019/9/4
    let time = dateTime.toLocaleTimeString("ja-JP"); // => 12:03:35
  return date + " " + time;
};
