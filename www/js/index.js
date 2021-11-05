const divTop = `
<div class="col-12 col-md-6">
    <a href="list.html?id=__link__">
    <div class="card bg-info m-3">
    <div class="card-body">
        <h5 class="card-title text-center">__title__</h5>
    </div>
    </div>
    </a>
</div>
`;

const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

function onBatteryStatus(status) {
  const alreadyAlerted = window.localStorage.getItem('alerted');
  if(alreadyAlerted) {
    return;
  }
  const shouldPlug = status.isPlugged ? '' : status.level > 40 ? '' : 'Veuillez mettre en charge l\'appareil';
  alert("Niveau de batterie: " + status.level +'% ' + shouldPlug);
  window.localStorage.setItem('alerted', 'true')
}

function fetchTops() {
  const tops = JSON.parse(window.localStorage.getItem('lists'));
  if(tops) {
    const topsDiv = document.querySelector('#tops');
    tops.forEach((top, i) => {
      const newDivManga = divTop
          .replace("__title__", top.title)
          .replace("__link__", top.title)
      topsDiv.appendChild(htmlToElement(newDivManga));
    });
  } else {
    navigator.vibrate(5000); // Angry navigator
  }
}

let onSuccess = function(position) {
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
    fetchTops();
    window.addEventListener("batterystatus", onBatteryStatus, false);
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  },
};

app.initialize();
