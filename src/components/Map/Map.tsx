import React, { useState } from 'react'
import {
  MapContainer, Marker, Popup, TileLayer, useMapEvents,
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
  points?: Array<Point>,
  center: Point,
  // eslint-disable-next-line no-unused-vars
  onMarkerPositionChange: (position: [number, number] | null) => void,
};

const Map: React.FC<Props> = (props) => {
  const [clickedPosition, setClickedPosition] = useState<[number, number] | null>(null)

  const handleClick = (e: any) => {
    const { lat, lng } = e.latlng
    setClickedPosition([lat, lng])
    // TODO prawdopodobnie po ustawieniu tego w rzeczywistości będą tu dwa markery.
    //  Do naprawienia później, jeżeli wystarczy czasu.
    if (props.points) {
      props.points[0].setLatitude(lat)
      props.points[0].setLongitude(lng)
    }
    props.onMarkerPositionChange([lat, lng])
  }

  const ClickEvent = () => {
    useMapEvents({
      click: handleClick, // Obsługa kliknięcia na mapę
    })
    return null
  }

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

      <ClickEvent />

      {clickedPosition}

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
