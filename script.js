let userInput = document.querySelector(".input-field");
let searchBtn = document.querySelector(".search");
let placeElement = document.querySelector(".place");
getApi(userInput.value);
placeElement.innerHTML = `Tunisia Prayer Times`;
userInput.addEventListener("focus", () => {
  if (userInput.value !== "") {
    document.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        getApi(userInput.value);
        placeElement.innerHTML = `${userInput.value} Prayer Times`;
        userInput.onblur();
      }
    });
  }
});
searchBtn.addEventListener("click", (event) => {
  if (userInput.value === "") {
    return;
  }
  getApi(userInput.value);
  placeElement.innerHTML = `${userInput.value} Prayer Times`;
});
function getApi(place) {
  return new Promise((resolved, rejected) => {
    url = `https://api.aladhan.com/v1/timingsByCity?city=${place}&country=${place}&method=8`;
    fetch(url)
      .then((results) => {
        if (results.ok) {
          return results.json();
        }
      })
      .then((api) => {
        updatePrayersTimes(api.data.timings);
      });
  });
}

function updatePrayersTimes(PrayersTimes) {
  let timeElements = document.querySelectorAll("time");
  timeElements.forEach((timeElement) => {
    for (key in PrayersTimes) {
      if (PrayersTimes.hasOwnProperty(key)) {
        if (timeElement.classList[1] == key) {
          timeElement.innerHTML = PrayersTimes[key];
        }
      }
    }
  });
}
let timings = {
  Fajr: "05:40",
  Sunrise: "07:17",
  Dhuhr: "13:22",
  Asr: "16:48",
  Sunset: "19:27",
  Maghrib: "19:27",
  Isha: "20:57",
  Imsak: "05:30",
  Midnight: "01:22",
  Firstthird: "23:24",
  Lastthird: "03:21",
};
