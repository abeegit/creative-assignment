const https = require("https");
const key = require("config").get("weatherAPI.key");
const q = require("q");

module.exports = {
  getCityWeather: (city) => {
    var deferred = q.defer();

    var processResults = res => {
      var data = "";

      res.on("data", chunk => {
        data += chunk;
      });

      res.on("end", () => {
        data = JSON.parse(data);
        if (data.data !== undefined && data.data.weather !== undefined) {
          deferred.resolve(data.data.weather);
        } else {
          deferred.reject({"reason": "Bad response"});
        }
      });

      res.on("error", () => {
        deferred.reject({"reason": "Bad response"});
      })
    };

    var query = `q=${ city }`;
    https.get(
      `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=f586b735d91b48e0b7665137170712&cc=false&format=json` + 
        `&${ query }`,
      processResults
    );

    return deferred.promise;
  },

  search: () => {
    var deferred = q.defer();

    var processResults = res => {
      var data = "";

      res.on("data", chunk => {
        data += chunk;
      });

      res.on("end", () => {
        deferred.resolve(data);
      });

      res.on("error", () => {
        deferred.reject();
      })
    };    

    var query = `query=${ city }`;
    https.get(
      `https://api.worldweatheronline.com/premium/v1/search.ashx?key=f586b735d91b48e0b7665137170712&format=json` + 
        `&${ query }`,
      processResults
    );

    return deferred.promise;
  }
};