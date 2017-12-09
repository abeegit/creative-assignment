var processDayWeather = day => {
  var obj = {
    date: day.date,
    astronomy: day.astronomy[0],
    hourly: []
  };
  day.hourly.forEach(hour => {
    const { time, tempC, windspeedKmph, weatherDesc, weatherIconUrl, precipMM, chanceofrain, chanceofsunshine } = hour; 
    var timeIn24HourFormat = hour.time.length === 4 ? `${ hour.time.substr(0, 2) }:${ hour.time.substr(2) }` : `${ hour.time.substr(0, 1) }:${ hour.time.substr(1) }`;
    obj.hourly.push({
      time: timeIn24HourFormat,
      temp: tempC,
      wind: windspeedKmph,
      weatherDesc: weatherDesc,
      weatherIcon: weatherIconUrl,
      precipitation: precipMM,
      chanceOfRain: chanceofrain,
      chanceOfSunshine: chanceofsunshine
    });  
  });
  return obj;
};

module.exports = {
  cityWeather: (weatherData, city) => {
    var weather = [];
    weatherData.forEach(day => {
      weather.push(processDayWeather(day));
    });
    return weather;
  }
};