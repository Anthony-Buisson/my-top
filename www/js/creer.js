let onPositionFetched = function(position) {
  var mymap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGZqc2xkZmtqIiwiYSI6ImNrdmwzaXZ0NjNjYnIydnBnYjRzMTMweHkifQ.IvTOe3XuHO1qgKt-oroTQg'
  }).addTo(mymap);
};

function onError(error) {
  alert('code: '    + error.code    + '\n' +
      'message: ' + error.message + '\n');
}

function create(button) {
  const title = document.querySelector('#title').value;
  const sujets = document.querySelector('#sujets').value.split(',');
  let storedItems = JSON.parse(window.localStorage.getItem('lists'));
  if(storedItems) {
    storedItems.push({title,sujets});
  } else {
    storedItems = [{title,sujets}];
  }

  window.localStorage.setItem('lists', JSON.stringify(storedItems));
  button.innerText = 'Top ajouté, redirection en cours ...'
  setTimeout(() => window.location = 'index.html', 3000);
}

var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
  },

  onDeviceReady: function () {
    navigator.geolocation.getCurrentPosition(onPositionFetched, onError);
  },
};

app.initialize();
