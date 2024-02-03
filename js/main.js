// const { default: axios } = require("axios");
let cities = ["مكة", "صنعاء", "إب", "الرياض"];
let engCities = ["Makkah al Mukarramah", "Sanaa", "Ibb", "Ar Riyad"];

let selction = document.querySelector("select");

let city = document.getElementById("city");
let params = {
  country: "YEMEN",
  city: "Ibb",
};
//events
selction.addEventListener("change", getCountryInfo);
//function
function getRequestPRAYERAPI(cityName) {
  params.city = cityName;
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      const timings = {
        Alfager: response.data.data.timings.Fajr,
        Ashrook: response.data.data.timings.Sunrise,
        Aldhur: response.data.data.timings.Dhuhr,
        AlAsr: response.data.data.timings.Asr,
        AlMaghrib: response.data.data.timings.Maghrib,
        AlIsha: response.data.data.timings.Isha,
      };
      const date = {
        weekday: response.data.data.date.hijri.weekday.ar,
        day: response.data.data.date.hijri.day,
        month: response.data.data.date.hijri.month.ar,
        weekDay: response.data.data.date.hijri.weekday.ar,
        year: response.data.data.date.hijri.year,
      };
      setAllPrayerTiming(timings);
      setDate(date);
      //   console.log(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getElementFromPage(name) {
  return document.getElementById(name);
}
function setAllPrayerTiming(allPrayerTimes) {
  getElementFromPage("fajir").innerHTML = allPrayerTimes.Alfager;
  getElementFromPage("shoorok").innerHTML = allPrayerTimes.Ashrook;
  getElementFromPage("duher").innerHTML = allPrayerTimes.Aldhur;
  getElementFromPage("aser").innerHTML = allPrayerTimes.AlAsr;
  getElementFromPage("magreb").innerHTML = allPrayerTimes.AlMaghrib;
  getElementFromPage("aleshaa").innerHTML = allPrayerTimes.AlIsha;
}

function setDate(date) {
  getElementFromPage("weekday").innerHTML = date.weekday;
  getElementFromPage("day").innerHTML = date.day;
  getElementFromPage("Month").innerHTML = date.month;
  getElementFromPage("year").innerHTML = date.year;
}
// getRequestPRAYERAPI("Makkah al Mukarramah");
getRequestPRAYERAPI("Ibb");
function getCountryInfo() {
  city.innerHTML = selction.value;

  getRequestPRAYERAPI(engCities[cities.indexOf(selction.value)]);
}
