/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


function onBatteryStatus(status) {
  const shouldPlug = status.isPlugged ? '' : status.level > 40 ? '' : 'Veuillez mettre en charge l\'appareil';
  alert("Niveau de batterie: " + status.level +'% ' + shouldPlug);
}

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
    window.addEventListener("batterystatus", onBatteryStatus, false);
    navigator.geolocation.getCurrentPosition(onPositionFetched, onError);
  },
};

app.initialize();
