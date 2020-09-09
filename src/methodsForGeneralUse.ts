//convert the publishedAt timestring to be more concrete
export function convertNewsItemPublishedTime(publishString: string): string {
  const newsItemPublishedTime = publishString;
  const dateString = new Date(newsItemPublishedTime);

  let minutes: number | string;
  minutes = dateString.getMinutes();

  //convert for example 7h7 to 7h07
  function convertMinutes(minutes: number | string) {
    return (minutes < 10 ? "0" : "") + minutes;
  }
  if (minutes < 10) {
    minutes = convertMinutes(minutes);
  }

  const hours = dateString.getHours();

  //get the current day in letters
  const day = dateString.getDay();
  let weekDay = "";

  if (day === 0) {
    weekDay = "Sunday";
  }
  if (day === 1) {
    weekDay = "Monday";
  }
  if (day === 2) {
    weekDay = "Tuesday";
  }
  if (day === 3) {
    weekDay = "Wednesday";
  }
  if (day === 4) {
    weekDay = "Thursday";
  }
  if (day === 5) {
    weekDay = "Friday";
  }
  if (day === 6) {
    weekDay = "Saturday";
  }

  //get the day number in month in letters//
  const dateNumber = dateString.getDate();

  //get the month in letters//
  const month = dateString.getMonth();

  let monthName = "";

  if (month === 0) {
    monthName = "January";
  }
  if (month === 1) {
    monthName = "February";
  }
  if (month === 2) {
    monthName = "March";
  }
  if (month === 3) {
    monthName = "April";
  }
  if (month === 4) {
    monthName = "May";
  }
  if (month === 5) {
    monthName = "June";
  }
  if (month === 6) {
    monthName = "July";
  }
  if (month === 7) {
    monthName = "August";
  }
  if (month === 8) {
    monthName = "September";
  }
  if (month === 9) {
    monthName = "Oktober";
  }
  if (month === 10) {
    monthName = "November";
  }
  if (month === 11) {
    monthName = "December";
  }

  //get the year//
  const year = dateString.getFullYear();

  const convertedDateString =
    weekDay +
    " " +
    dateNumber +
    " " +
    monthName +
    " " +
    year +
    " " +
    hours +
    ":" +
    minutes;
  console.log(convertedDateString);

  return convertedDateString;
}
