import React from 'react'
import {
  MapContainer, Marker, Popup, TileLayer,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { renderToStaticMarkup } from 'react-dom/server'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'
import { divIcon } from 'leaflet'
import Styles from './Map.module.scss'
import Point from './Elements/Point'

type Props = {
  // @ts-ignore
  points?: Array<Point>,
  center: Point,
}

const Map: React.FC<Props> = (props) => {
  const iconMarkup = renderToStaticMarkup(
    <FontAwesomeIcon
      icon={faLocationDot}
      className={Styles.marker}
    />,
  )

  const customMarkerIcon = divIcon({
    html: iconMarkup,
  })

  return (
    <MapContainer
      center={props.center.getPosition()}
      zoom={13}
      scrollWheelZoom
      style={{ height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        (props.points || []).map((point) => (
          <Marker
            icon={customMarkerIcon}
            position={point.getPosition()}
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
