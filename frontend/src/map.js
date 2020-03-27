import React from 'react';
import * as Nominatim from 'nominatim-browser';
import { Map, TileLayer, CircleMarker, Popup }  from 'react-leaflet'

class LMap extends React.Component {
  constructor() {
    super()
    this.state = {
      locations: [
        {
          // Finland location (default)
          lat: 63.2467777,
          lng: 25.9209164,
        },
      ],
      zoom: 6
    }
  }

  componentDidMount() {
    Nominatim.geocode({
      q: "33450 Finland",
      addressdetails: true
    })
    .then((results) =>
    {
      var result = results[0];
      this.setState({ lat: result.lat, lng: result.lon })
      // console.log(result.lat);
      // console.log(result.lon);
      // console.log(result.display_name);

    })
    .catch((error) =>
    {
        console.error(error);
    });
}

  render() { 
    const position = [this.state.lat, this.state.lng];
    var countryCenter = [63.2467777, 25.9209164] // Finland
    return (
      <Map center={countryCenter} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {[position, countryCenter].map(location => (
          <CircleMarker center={[
            location[0],
            location[1]
          ]} radius='10' color='yellow'>
          <Popup>
            Many sick here is...
          </Popup>
        </CircleMarker>
        ))}
        
      </Map>
    );
  }
}

export default LMap;