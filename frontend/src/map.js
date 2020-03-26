import React from 'react';
import { Map, TileLayer, CircleMarker, Popup }  from 'react-leaflet'

class LMap extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 61.9241,
      lng: 25.7482,
      zoom: 6
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <CircleMarker center={position} radius='10' attribution='jotain' color="red">
          <Popup>
            Many sick here is...
          </Popup>
        </CircleMarker>
      </Map>
    );
  }
}

export default LMap;