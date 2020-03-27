import React from 'react';
import * as Nominatim from 'nominatim-browser';
import { Map, TileLayer, CircleMarker, Popup }  from 'react-leaflet';
import symData from './data.json';

class InfectionMap extends React.Component {
  constructor() {
    super()
    this.state = {
      locations: [],
      zoom: 6
    }
  }

  componentDidMount() {
    symData.data.map(location => {
      Nominatim.geocode({
        q: location.postal_code + " Finland",
        addressdetails: true
      })
      .then((results) =>
      {
        var result = results[0];
        this.setState(state => {
          const locations = state.locations.concat([{lat: result.lat, lng: result.lon}]);
          return {
            locations,
            zoom: 6
          }
        });
      })
      .catch((error) =>
      {
        console.error(error);
      });
    });
  }

  render() {
    var countryCenter = [{lat: "63.2467777", lng: "25.9209164"}] // Finland
    var position = countryCenter;

    if (this.state.locations.length > 0) {
      position = this.state.locations;
    }

    return (
      <Map center={[countryCenter[0].lat, countryCenter[0].lng]} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {position.map((location, key) => (
          <CircleMarker
          key={key}
          center={[
            location.lat,
            location.lng
          ]} radius='10' color='yellow'>
          <Popup>
            Epäiltyjä / vahvistettuja tapauksia
          </Popup>
        </CircleMarker>
        ))}

      </Map>
    );
  }
}

export default InfectionMap;
