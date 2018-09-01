
$(document).ready(function () {
    function showWeatherData(weatherData) {
        // console.log(weatherData.current_observation.display_location.state)
        // for(const locationData of Object.values(weatherData.current_observation.display_location)) {
        //     console.log(locationData);
        // }
        console.log(weatherData.current_observation.display_location.latitude);

        //******where did weatherCondition come from?
        const weatherCondition = weather
        //not needed for loop for this JSON file if had multiple locations then for loop required
        //for (const weather of Object.values(weatherData)) {
        //console.log('Weather: ', weatherData);

        $("#weather").append(`
        <div>
            <ul>
              <li>City:${weatherData.current_observation.display_location.city} </li>
                <ul>
                  <li>State:${weatherData.current_observation.display_location.state}</li>
                    <ul>
                      <li>ZipCode:${weatherData.current_observation.display_location.zip}</li>
                        <ul>
                          <li>Latitude:${weatherData.current_observation.display_location.latitude}</li>
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
    //loads event
    //$(function () {
        $("#button").click(function () {
            // real base URL http://api.wunderground.com/api/962391fa967f0a1c/conditions/q/
            //"http://localhost:3000/weather/weather.json"
            //get zip code from text box
            const zipCode = $('#zipCode').val();
            console.log('ZipCode', zipCode);
            const url = `http://api.wunderground.com/api/962391fa967f0a1c/conditions/q/${zipCode}.json`
            $.ajax(url, {
                dataType: 'json',
                method: 'GET'
            }).done(function (data, textStatus) {
                console.log('Data:', data);
                console.log('Text Status:', textStatus);
                const weather = data;
                showWeatherData(data);
                $("#zipCode").val("");
                
                })
            })
            /*$("#button").click(function(){
                $("#weather").remove()
            });*/
        })
    //})
   





