import React from 'react';
import * as Nominatim from 'nominatim-browser';
import { Map, TileLayer, CircleMarker, Popup }  from 'react-leaflet';

class InfectionMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      zoom: 6
    }
  }

  componentDidMount() {
    const { counter } = this.props;
    var infections = [];
    for (var i in counter) {
      infections.push([i, counter[i]])
    };

    infections.map(location => {
      Nominatim.geocode({
        q: location[0] + " Finland",
        addressdetails: true
      })
      .then((results) =>
      {
        var result = results[0];
        
        this.setState(state => {
          const locations = state.locations.concat([{lat: result.lat, lng: result.lon, count: location[1]}]);
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

    const radius = 5

    if (this.state.locations.length > 0) {
      position = this.state.locations;
    }

    return (
      <Map style={{width:"100%", height:"400px"}} center={[countryCenter[0].lat, countryCenter[0].lng]} zoom={this.state.zoom}>
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
          ]} radius={location.count > 0 && radius + location.count} color='red'>
          <Popup>
            Epäiltyjä / vahvistettuja tapauksia: {location.count}
          </Popup>
        </CircleMarker>
        ))}

      </Map>
    );
  }
}

export default InfectionMap;
