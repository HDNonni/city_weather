


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
        }
    })

    //$("#button").click(function () {
    $("#button").on("click keypress", function () {
        // real base URL http://api.wunderground.com/api/962391fa967f0a1c/conditions/q/
        //"http://localhost:3000/weather/weather.json"

        const city = $('#cityContent').val();
        console.log('city', city);

        const url = `http://autocomplete.wunderground.com/aq?query=${city}&cb=getCities`

        $.ajax(url, {
            //***why use jsonp because doesn't have CORS enabled
            dataType: 'jsonp',
            method: 'GET'
        }).done(function (data, textStatus) {

            console.log('Data:', data);
            console.log('Text Status:', textStatus);
            //?define data
            const city = data;
            getCities(data);

            //$("#cityContent").val("");
            $("#cityNames").val("");


        })

    })
    /*$("#button").click(function(){
        $("#weather").remove()
    });*/
    function showWeatherData(weatherData) {
        //copied from weather.js
        // console.log(weatherData.current_observation.display_location.state)
        // for(const locationData of Object.values(weatherData.current_observation.display_location)) {
        //     console.log(locationData);
        // }
        console.log(weatherData);

        //******where did weatherCondition come from?
        const weatherCondition = weather
        //not needed for loop for this JSON file if had multiple locations then for loop required
        //for (const weather of Object.values(weatherData)) {
        //console.log('Weather: ', weatherData);

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
        //}

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

        })
    })
});






//.json file used for testing purposes only