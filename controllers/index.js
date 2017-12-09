const weatherModel = require("./../models/weather");
const weatherService = require("./../services/weather");

module.exports = {
  index: (req, res) => {
    res.render("index/index");
  },

  search: (req, res) => {
    const { body } = req;
    var promiseCount = 0;

    var promiseIncrement = () => {
      promiseCount++;
      if (promiseCount === 1) {
        res.send({"status": "success"});
      }
    };
    weatherService.getCityWeather(body.city)
      .then(results => { 
        res.render("index/inner", { weather: weatherModel.cityWeather(results, body.city) });
      })
      .catch(e => { 
        console.log(e);
        res.statusCode = 400;
        res.send(e);
      });
  }
};