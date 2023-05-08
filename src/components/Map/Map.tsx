import React, { useEffect, useState } from 'react'
import {
  MapContainer, Marker, Polyline, Popup, TileLayer,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { renderToStaticMarkup } from 'react-dom/server'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'
import { divIcon } from 'leaflet'
import Styles from './Map.module.scss'
import Elements from './Elements'
import TerrainPointService from '../../services/TerrainPointService'

type Props = {
  // @ts-ignore
  points?: Array<Elements.Point>,
  // @ts-ignore
  lines?: Array<Elements.Line>,
}

const Map: React.FC<Props> = (props) => {
  const center = props.points?.[0] ? props.points[0].getPosition() : [50, 20]
  const [, forceUpdate] = useState<any>()

  const iconMarkup = renderToStaticMarkup(
    <FontAwesomeIcon
      icon={faLocationDot}
      className={Styles.marker}
    />,
  )

  // eslint-disable-next-line no-restricted-syntax
  for (const line of props.lines || []) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const fetchData = async () => {
        const terrainPointService = new TerrainPointService()
        line.setPointA(
          await terrainPointService.getTerrainPoint(line.pointAId),
        )

        line.setPointB(
          await terrainPointService.getTerrainPoint(line.pointBId),
        )

        forceUpdate({})
      }
      fetchData()
    }, [line])
  }

  const customMarkerIcon = divIcon({
    html: iconMarkup,
  })

  return (
    <MapContainer
      center={center}
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

      {
        (props.lines || []).filter((line) => line.pointA && line.pointB).map((line) => (
          <>
            <Marker
              icon={customMarkerIcon}
              position={line.pointA.getPosition()}
              key={line.pointA.name}
            >
              <Popup>
                { line.pointA.name }
              </Popup>
            </Marker>

            <Marker
              icon={customMarkerIcon}
              position={line.pointB.getPosition()}
              key={line.pointB.name}
            >
              <Popup>
                { line.pointB.name }
              </Popup>
            </Marker>

            <Polyline
              key={line.name}
              pathOptions={{ color: 'green' }}
              positions={line.getLine()}
            >
              <Popup>
                { line.name }
              </Popup>
            </Polyline>
          </>
        ))
      }
    </MapContainer>
  )
}

Map.defaultProps = {
  points: [],
  lines: [],
}

export default Map
