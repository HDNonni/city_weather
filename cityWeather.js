


function getCities(cityResponse) {
    console.log(cityResponse.city);


    //moved to another place to try
    /*for (const name of cityNames) {
        $(`#${cityResponse.RESULTS.name}`).append(`
            //used select 1st then changed to option
                <option>${name}</option>
            `);
    }*/
    //commented out original code that works to play with jquery auto complete widget
    for (const city of cityResponse.RESULTS) {
        console.log("city: ", city);
        console.log("cityName:", city.name);
        console.log("type:", city.type);
        if (city.type == "city") {
            $("#cityNames").append(`
                <option>${city.name}</option>
            `);
        }
    }


}
$(document).ready(function () {
    //loads event
    $("#cityContent").focus()

    $("#cityContent").keypress(function () {

        if (event.keyCode == 13) {
            console.log("keypress called")
            //this triggers the click event automagically
            //$("#button").trigger("click");
            //another way to have the enter key work
            fetchCities();

        }
    })

    //$("#button").click(function () {
    //this handles the button click
    $("#button").on("click keypress", function () {
        fetchCities();
    })
    //extracting the contents of a function into a new function

    function fetchCities() {
        // real base URL http://api.wunderground.com/api/962391fa967f0a1c/conditions/q/
        //"http://localhost:3000/weather/weather.json"

        const city = $('#cityContent').val();
        console.log('city', city);

        const url = `http://autocomplete.wunderground.com/aq?query=${city}&cb=getCities`

        $.ajax(url, {
            //***why use jsonp: because doesn't have CORS enabled
            dataType: 'jsonp',
            method: 'GET'
        }).done(function (data, textStatus) {

            console.log('Data:', data);
            console.log('Text Status:', textStatus);
            const city = data;
            getCities(data);
            $("#cityNames").val("");


        })

    }
    /*$("#button").click(function(){
        $("#weather").remove()
    });*/
    $("#cityNames").change(function () {
        console.log("cityNames Change")
        $("#getWeather").click();
    })
    function showWeatherData(weatherData) {
        //copied from weather.js
        // console.log(weatherData.current_observation.display_location.state)
        // for(const locationData of Object.values(weatherData.current_observation.display_location)) {
        //     console.log(locationData);
        // }
        console.log("weather Data:", weatherData);

        const weatherCondition = weather
        //not needed for loop for this JSON file if had multiple locations then for loop required
        //for (const weather of Object.values(weatherData)) {
        //console.log('Weather: ', weatherData);
        //tried here to have text be something else if unavailable and works , needs treaking
        if (weatherData.current_observation == undefined) {
            $("#weather").text("Sorry Weather Unavailable!")
            //$("#weather").replaceWith("<li>Sorry Weather Unavailable!</li>")
        } else {
            $("#weather").append(`
        <div> 
            <ul>
              <li>Dewpoint:${weatherData.current_observation.dewpoint_f} </li>
                <ul>
                  <li>Feels Like:${weatherData.current_observation.feelslike_string}</li>
                    <ul>
                      <li>ZipCode:${weatherData.current_observation.display_location.zip}</li>
                        <ul>
                          <li>Forecast:<a href ="${weatherData.current_observation.forecast_url}">Click For Your Weather</a></li>
                            <ul>
                              <li>Longitude:${weatherData.current_observation.display_location.longitude}</li>
                                <ul>
                                  <li>Current Temp:${weatherData.current_observation.temp_f}</li>
                                </ul>
                            </ul>    
                        </ul>
                    </ul>
                </ul>             
            </ul>
        </div>
        `);
       
        if (weatherData.current_observation.temp_f <60){
            $("#snow").show();
        }
        if (weatherData.current_observation.temp_f >=60){
            $("#sun").show();
        }
            //}
            /*if (weatherData.current_observation == undefined) {
                $("#weather").text("<li>Sorry Weather Unavailable!</li>")
                //$("#weather").replaceWith("<li>Sorry Weather Unavailable!</li>")
            } else {*/
        }
    }

    $("#getWeather").click(function () {
        console.log("clicked")
        let weatherCity = $("#cityNames option:selected").val();
        console.log("cityName", $("#cityNames option:selected"));
        console.log("weatherCity : ", weatherCity);
        const url = `http://api.wunderground.com/api/962391fa967f0a1c/conditions/q/${weatherCity}.json`
        $.ajax(url, {
            dataType: 'json',
            method: 'GET'
        }).done(function (data, textStatus) {
            console.log('Data:', data);
            console.log('Text Status:', textStatus);
            const weather = data;
            showWeatherData(data);
            $("#cityContent").val("");
        })
    })
});






//.json file used for testing purposes only