import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import BadgeAward from '../../../models/BadgeAward'
import GotBook from '../../../models/GotBook'
import * as Modal from '../../../components/UI/Modal'

const GotBookComponent: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [badgeAwards, setBadgeAwards] = useState<BadgeAward[]>([])
  const [previousBadgeAwards, setPreviousBadgeAwards] = useState<BadgeAward[]>([])
  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const { token } = useAuth()
  const badgeAwardService = apiService.getBadgeAward(token)
  const gotBookService = apiService.getGotBook(token)
  const [gotBook, setGotBook] = useState<GotBook | null>(null)
  const [currentBadgeAward, setCurrentBadgeAward] = useState<BadgeAward>()

  const fetchData = async () => {
    setGotBook(
      await gotBookService.getGotBook(),
    )
    setBadgeAwards(await badgeAwardService.getBadgeAwardsForGotBook())
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const foundBadgeAward = badgeAwards.find((award) => award.grant_date === null)
    if (foundBadgeAward) {
      setCurrentBadgeAward(foundBadgeAward)
      setLoading(false)
    }

    const filteredBadgeAwards = badgeAwards.filter((award) => award.grant_date !== null)
    setPreviousBadgeAwards(filteredBadgeAwards)
  }, [badgeAwards])

  const createGotBook = async () => {
    try {
      gotBookService.createGotBook()
        .then(() => {
          toastUtils.Toast.showToast(
            toastUtils.types.SUCCESS,
            'Utworzono książeczkę GOT',
          )
        })
      await fetchData()
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
    }
  }

  if (loading) {
    return (
      <div className="mt-3 text-center">
        <Spinner animation="border" role="status" className="text-center">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div>
      <h3 className="mb-4">
        Książeczka GOT
      </h3>
      { !gotBook ? (
        <div className="alert alert-warning" role="alert">
          <h4>Nie masz jeszcze założonej książeczki GOT</h4>
          <Modal.Component
            title="Załóż książeczkę"
            message="Czy na pewno chcesz założyć książeczkę GOT?"
            action={createGotBook}
            variant="success"
          />
        </div>
      ) : currentBadgeAward && (
        <>
          <h5 className="text-warning">Obecnie zdobywana odznaka</h5>
          <hr className="text-warning" />
          <Table
            responsive
            hover
          >
            <thead>
              <tr className="text-warning">
                <th colSpan={5}>{currentBadgeAward.badge.name}</th>
              </tr>
              <tr>
                <th>Lp.</th>
                <th>Odcinek</th>
                <th>Kierunek</th>
                <th>Data</th>
                <th>Punkty</th>
              </tr>
            </thead>
            {currentBadgeAward.entries.length > 0 ? (
              <>
                <tbody>
                  {currentBadgeAward.entries.map((entry, index) => (
                    <tr key={uuidv4()}>
                      <td>{index + 1}</td>
                      <td>{entry.section.name}</td>
                      <td>
                        {entry.oppositeDirection ? (
                          <FontAwesomeIcon className="ms-4" icon={faArrowLeft} />
                        ) : (
                          <FontAwesomeIcon className="ms-4" icon={faArrowRight} />
                        )}
                      </td>
                      <td>{dayjs(entry.date).format('DD.MM.YYYY')}</td>
                      <td>{entry.points}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={4}>Punkty z poprzedniej odznaki</th>
                    <td>{currentBadgeAward.points_from_previous_badge}</td>
                  </tr>
                  <tr>
                    <th colSpan={4}>Suma</th>
                    <td>{}</td>
                  </tr>
                </tfoot>
              </>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={5} className="bg-warning">Nie masz jeszcze wpisów do tej odznaki</td>
                </tr>
              </tbody>
            )}
          </Table>
          <h5 className="text-success mt-5">Poprzednie odznaki</h5>
          <hr className="text-success" />
          {previousBadgeAwards.map((award) => (
            <Table key={uuidv4()} responsive hover>
              <thead>
                <tr className="text-success">
                  <th colSpan={5}>{award.badge.name}</th>
                </tr>
                <tr>
                  <th>Lp.</th>
                  <th>Odcinek</th>
                  <th>Kierunek</th>
                  <th>Data</th>
                  <th>Punkty</th>
                </tr>
              </thead>
              {award.entries.length > 0 ? (
                <>
                  <tbody>
                    {award.entries.map((entry, index) => (
                      <tr key={uuidv4()}>
                        <td>{index + 1}</td>
                        <td>{entry.section.name}</td>
                        <td>
                          {entry.oppositeDirection ? (
                            <FontAwesomeIcon className="ms-4" icon={faArrowLeft} />
                          ) : (
                            <FontAwesomeIcon className="ms-4" icon={faArrowRight} />
                          )}
                        </td>
                        <td>{dayjs(entry.date).format('DD.MM.YYYY')}</td>
                        <td>{entry.points}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan={4}>Punkty z poprzedniej odznaki</th>
                      <td>{award.points_from_previous_badge}</td>
                    </tr>
                    <tr>
                      <th colSpan={4}>Suma</th>
                      <td>{}</td>
                    </tr>
                  </tfoot>
                </>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5} className="bg-warning">Nie masz jeszcze wpisów do tej odznaki</td>
                  </tr>
                </tbody>
              )}
            </Table>
          ))}
        </>
      )}
    </div>
  )
}

export default GotBookComponent
