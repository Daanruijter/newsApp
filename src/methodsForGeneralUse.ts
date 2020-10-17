import NewsItemType from "./interfacesforapp";

//Convert the publishedAt timestring to be more concrete
export function convertNewsItemPublishedTime(publishString: string): string {
  const newsItemPublishedTime = publishString;
  const dateString = new Date(newsItemPublishedTime);

  let minutes: number | string;
  minutes = dateString.getMinutes();

  //Convert for example 7h7 to 7h07
  function convertMinutes(minutes: number | string) {
    return (minutes < 10 ? "0" : "") + minutes;
  }
  if (minutes < 10) {
    minutes = convertMinutes(minutes);
  }

  const hours = dateString.getHours();

  //Get the current day in letters
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

  //Get the day number in month in letters//
  const dateNumber = dateString.getDate();

  //Get the month in letters//
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

  //Get the year//
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

  return convertedDateString;
}

//sitemapCreator
export default function createSitemap(data: NewsItemType[], title?: string) {
  const dynamicData: NewsItemType[] = data;
  const doc = document.implementation.createDocument("", "", null);
  const titleFromDetailPage = title;
  //create the outer tag
  const urlset = doc.createElement("urlset");
  urlset.setAttribute("xmlns", " http://www.sitemaps.org/schemas/sitemap/0.9");

  let url = null;
  let changefreq = null;
  let loc = null;

  //first create static sites (note, that this is a selection)
  const staticSites = ["/", `details/${title}`, "random"];
  for (let i = 0; i < staticSites.length; i++) {
    url = doc.createElement("url");
    loc = doc.createElement("loc");
    loc.innerHTML = "http://localhost:8081/#" + staticSites[i];
    changefreq = doc.createElement("changefreq");
    changefreq.innerHTML = "monthly";
    url.appendChild(loc);
    url.appendChild(changefreq);
    urlset.appendChild(url);
  }
  doc.appendChild(urlset);
  //append dynamic user urls (EXAMPLE)
  for (let i = 0; i < dynamicData.length; i++) {
    url = doc.createElement("url");
    loc = doc.createElement("loc");
    loc.innerHTML = `${dynamicData[i].url}`;
    changefreq = doc.createElement("changefreq");
    changefreq.innerHTML = "weekly";
    url.appendChild(loc);
    url.appendChild(changefreq);
    urlset.appendChild(url);
  }
  alert(dynamicData[0].url);

  //Serialize xml and then download the file
  //Serialize the xml file to txt
  const oSerializer = new XMLSerializer();
  let xmltext = oSerializer.serializeToString(doc);
  xmltext = '<?xml version="1.0" encoding="UTF-8"?>' + xmltext;

  alert(xmltext);

  //Download the file
  let pom = document.createElement("a");
  const filename = "sitemap.xml";
  pom = document.createElement("a");
  const bb = new Blob([xmltext], { type: "text/plain" });
  pom.setAttribute("href", window.URL.createObjectURL(bb));
  pom.setAttribute("download", filename);
  pom.dataset.downloadurl = ["text/plain", pom.download, pom.href].join(":");
  pom.draggable = true;
  pom.classList.add("dragout");
  pom.click();
  console.log(doc);
}
