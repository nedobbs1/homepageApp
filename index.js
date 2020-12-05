//   // Handle writing out Bookmarks
//   function setupBookmarks() {
//     const bookmarkContainer = document.getElementById('bookmark-container');
//     bookmarkContainer.innerHTML = bookmarks
//       .map((b) => {
//         const html = ['<div class='bookmark-set'>'];
//         html.push(`<div class='bookmark-title'>${b.title}</div>`);
//         html.push('<div class='bookmark-inner-container'>');
//         html.push(
//           ...b.links.map(
//             (l) =>
//             `<a class='bookmark' href='${l.url}' target='_blank'>${l.name}</a>`
//           )
//         );
//         html.push('</div></div>');
//         return html.join(');
//       })
//       .join(');
//   }

//   window.onload = () => {
//     setupBookmarks();
//     getWeather();
//   };



//ONLOAD
$(window).on('load', () => {
    $('#clock').text(getTime);
    setInterval(() => {
        $('#clock').text(getTime);
    }, 100);

    getWeather();

});


//WEATHER
//GEOLOCATION WORK IN PROGRESS
// function getCoords() {
//     const getIP = 'http://ip-api.com/json/';
//     $.getJSON(getIP, function (location) {
//         let lat = '&lat=' + location.lat;
//         let lon = '&lon=' + location.lon;
//         console.log(location);
//     });
// }

const apiKey = 'fece7837721b5c411dc5a58133dff145';
const units = 'imperial';
const cityId = '4782167';
const url = 'http://api.openweathermap.org/data/2.5/weather?' + 'units=' + units + '&appid=' + apiKey + '&id=' +
    cityId;

function getWeather() {
    let xhr = new XMLHttpRequest();
    xhr.open(
        'GET',
        url
    );
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
                $('#temp').text(json.main.temp.toFixed(0) + ' F');
                $('#weather-description').text(json.weather[0].description);
            } else {
                console.log('error msg: ' + xhr.status);
            }
        }
    };
    xhr.send();
}



//CLOCK
const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

function getTime() {
    let date = new Date(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        day = days[date.getDay()].toUpperCase(),
        dateNum = date.getDate(),
        month = date.getMonth();
    return (day + ' ' + month + '/' + dateNum + ' - ' + (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec));
}



//SEARCH
const searchUrl = 'https://google.com/search?q='

function search(event) {
    if (event.keyCode == 13) {
        var searched = $('#search-field').val();
        window.open(searchUrl + searched);
    }
}

$(document).keyup(function (event) {
    if (event.keyCode == 32) {
        $('#search').css('display', 'flex');
        $('#search-field').focus();
    } else if (event.keyCode == 27) {
        $('#search-field').value = '';
        $('#search-field').blur();
        $('#search').css('display', 'none');
    }
});