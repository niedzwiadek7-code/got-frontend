/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react'
import {
  MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { renderToStaticMarkup } from 'react-dom/server'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'
import { divIcon } from 'leaflet'
import Styles from './Map.module.scss'
import * as Elements from './Elements'
import { useDependencies } from '../../context/dependencies'
import { useAuth } from '../../context/auth'

type Props = {
  points?: Array<Elements.Point>,
  lines?: Array<Elements.Line>,
  center?: Elements.Point,
  // eslint-disable-next-line no-unused-vars,react/require-default-props
  onMarkerPositionChange?: (position: [number, number] | null) => void,
  zoom?: number
}

const Map: React.FC<Props> = (props) => {
  const [clickedPosition, setClickedPosition] = useState<[number, number] | null>(null)
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { token } = useAuth()
  const [lines, setLines] = useState<Elements.Line[]>([])
  const [terrainPointService] = useState(apiService.mountainData.getTerrainPoint(token))

  const handleClick = (e: any) => {
    if (props.onMarkerPositionChange) {
      const { lat, lng } = e.latlng
      setClickedPosition([lat, lng])
      if (props.points) {
        props.points[0].setLatitude(lat)
        props.points[0].setLongitude(lng)
      }

      props.onMarkerPositionChange([lat, lng])
    }
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

  useEffect(() => {
    const fetchData = async () => {
      for (const line of props.lines || []) {
        line.setPointA(
          await terrainPointService.getTerrainPoint(line.pointAId.toString()),
        )

        line.setPointB(
          await terrainPointService.getTerrainPoint(line.pointBId.toString()),
        )
      }

      setLines(props.lines || [])
    }

    fetchData()
  }, [
    JSON.stringify(
      (props.lines || []).map((line) => ({
        pointAId: line.pointAId,
        pointBId: line.pointBId,
      })),
    ),
    terrainPointService,
  ])

  const customMarkerIcon = divIcon({
    html: iconMarkup,
  })

  return (
    <MapContainer
      center={props.center?.getPosition()}
      zoom={props.zoom}
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

      {
        (lines || []).filter((line) => line.pointA && line.pointB).map((line, index) => (
          <div
            key={`${line.pointAId}-${line.pointBId}-${index}`}
          >
            {
              line.pointA && line.pointB && (
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
                </>
              )
            }

            <Polyline
              key={line.name}
              pathOptions={{ color: 'green' }}
              positions={line.getLine()}
            >
              <Popup>
                { line.name }
              </Popup>
            </Polyline>
          </div>
        ))
      }
    </MapContainer>
  )
}

Map.defaultProps = {
  points: [],
  lines: [],
  center: new Elements.Point(
    '',
    '50.44',
    '18.91',
  ),
  zoom: 6,
}

export default Map
