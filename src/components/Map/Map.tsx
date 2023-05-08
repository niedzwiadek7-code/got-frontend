import React from 'react'
import {
  MapContainer, Marker, Popup, TileLayer,
} from 'react-leaflet'
import Elements from './Elements'
import 'leaflet/dist/leaflet.css'

type Props = {
  // @ts-ignore
  points?: Array<Elements.Point>,
}

const Map: React.FC<Props> = (props) => {
  const center = props.points?.[0] ? props.points[0].getPosition() : [0, 0]

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        (props.points || []).map((point) => (
          <Marker
            position={point.position}
            key={point.name}
          >
            <Popup>
              { point.name }
            </Popup>
          </Marker>
        ))
      }
    </MapContainer>
  )
}

Map.defaultProps = {
  points: [],
}

export default Map
