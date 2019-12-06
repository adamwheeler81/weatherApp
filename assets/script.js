

$(document).ready(function () {

    //hook the btn
    $("#btnCitySearch").on("click", function () { 
        var cityName = $("#cityName").val();
        GetCityWeather(cityName);
        GetFiveDay(cityName);
    });

    $(".cityHistory").on("click", function () { 
        var linkCity = $(this).html();
        GetCityWeather(linkCity);
        GetFiveDay(linkCity);
    });


    function GetCityWeather(cityName) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" 
                                    + cityName
                                    + ",us,&APPID=bf4c90653567084d19a1c90b279b464c&units=imperial";

        $.ajax({
                url: queryURL,
                type: 'GET',
                success: function (returnData) {
                    //alert("the json = " + JSON.stringify(returnData));
                    //alert("the latitude = " + returnData.coord.lat);
                    //alert("the humidity = " + returnData.main.humidity);
                    //alert('now it updates the page');
                    var today = new Date();
                    var currentDate = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
                    var weatherImage = '<img alt="weather" src="http://openweathermap.org/img/wn/' + returnData.weather[0].icon + '@2x.png" />';


                    $("#city").html(returnData.name + "  (" + currentDate + ")  " + weatherImage );
                    $("#cityTemp").html(returnData.main.temp);
                    $("#cityHumid").html(returnData.main.humidity);
                    $("#cityWindSpeed").html(returnData.wind.speed);
                    $("#cityPressure").html(returnData.main.pressure);
                },


                error: function (xhr, ajaxOptions, thrownError) {
                    alert("The server returned an error. " + xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
                }
            });
    }


    function GetFiveDay(cityName) {
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" 
                                    + cityName
                                    + ",us,&APPID=bf4c90653567084d19a1c90b279b464c&units=imperial";

        $.ajax({
                url: queryURL,
                type: 'GET',
                success: function (returnData) {
					for(i = 0; i < 5; i++){
						var today = new Date();
						var currentDate = (today.getMonth() + 1) + '/'+ (today.getDate() + i) + '/' + today.getFullYear();
						
						var prefixSelect = "#day" + (i + 1);
						var dateSelector = prefixSelect + "Date";
						var weatherSelector = prefixSelect + "Weather";
						var tempSelector = prefixSelect + "Temp";
						var humidSelector = prefixSelect + "Humid";
						
						var indexResponse = (i*8);
						
						var weatherImage = '<img alt="weather" src="http://openweathermap.org/img/wn/' + returnData.list[indexResponse].weather[0].icon + '.png" />';

						$(dateSelector).html(currentDate);
						$(weatherSelector).html(weatherImage);
						$(tempSelector).html("Temp: " + returnData.list[indexResponse].main.temp);
						$(humidSelector).html("Humidity: " + returnData.list[indexResponse].main.humidity); 
					}
                                       
                },

                error: function (xhr, ajaxOptions, thrownError) {
                    alert("The server returned an error. " + xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
                }
            });
    }

});
if ("geolocation" in navigator) {
    /* geolocation is available */
  } else {
    /* geolocation IS NOT available */
  }