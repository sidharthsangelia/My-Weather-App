const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "64e3cb82d317a0d6101eca0edb793532";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  // Select data elements
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");
  const image = document.querySelector(".weather-box img");

  // Start fade-out transition for all elements
  temperature.style.opacity = "0";
  temperature.style.transform = "translateY(-20px)";
  description.style.opacity = "0";
  description.style.transform = "translateY(-20px)";
  humidity.style.opacity = "0";
  humidity.style.transform = "translateY(-20px)";
  wind.style.opacity = "0";
  wind.style.transform = "translateY(-20px)";
  image.style.opacity = "0";
  image.style.transform = "translateY(-20px)";

  // Fetch weather data
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then((response) => response.json())
    .then((json) => {
      setTimeout(() => {
        if (json.cod === "404") {
          container.style.height = "410px";
          weatherBox.classList.remove("active");
          weatherDetails.classList.remove("active");
          error404.classList.add("active");
          return;
        }

        container.style.height = "510px";
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        // Update the icon source based on the weather
        switch (json.weather[0].main) {
          case "Clear":
            image.src = "images/clear.png";
            break;
          case "Rain":
            image.src = "images/rain.png";
            break;
          case "Snow":
            image.src = "images/snow.png";
            break;
          case "Clouds":
            image.src = "images/cloud.png";
            break;
          case "Mist":
          case "Haze":
            image.src = "images/mist.png";
            break;
          default:
            image.src = "images/cloud.png";
        }

        // Fade in the icon after changing the source
        setTimeout(() => {
          image.style.opacity = "1"; // Fade in
          image.style.transform = "translateY(0)"; // Slide down
        }, 50); // Short delay for a smooth transition

        // Update temperature, description, humidity, and wind speed
        temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
        description.innerHTML = json.weather[0].description;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;

        // Fade in all data elements
        setTimeout(() => {
          temperature.style.opacity = "1";
          temperature.style.transform = "translateY(0)";
          description.style.opacity = "1";
          description.style.transform = "translateY(0)";
          humidity.style.opacity = "1";
          humidity.style.transform = "translateY(0)";
          wind.style.opacity = "1";
          wind.style.transform = "translateY(0)";
        }, 300); // Wait for fade-out to complete before fading in
      }, 500); // Wait for fade-out to complete
    })
    .catch((error) => {
      console.log("Error fetching weather data:", error);
    });
});
