function suggest() {
  var city = document.getElementById("city").options[document.getElementById("city").selectedIndex].value;
  var from = document.getElementById("from").value.trim();
  var to = document.getElementById("to").value.trim();
  if (city === "" || from === "" || to === "") {
    alert("Please fill all the fields");
    return false;
  }
  var form = {
    city: city,
    from: from,
    to: to
  };
  $.ajax({
    url: "/suggest",
    type: "POST",
    data: form,
    success: data => {
      console.log(data);
      document.getElementById("results").innerHTML = data;
      setTimeout(function() {
        $(".carousel").carousel();
      }, 100);
    },
    error: error => {

    }
  });
};

function fillCarousel(data) {
  var carouselHeadings = [];
  data.forEach(day => {
    carouselHeadings.push(day.date);
  });
};