import React, { useState } from 'react'
// eslint-disable-next-line
import { Button, Modal, Form, FormControl } from 'react-bootstrap'
import Badge from '../../../../models/Badge'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'

type Props = {
  badge: Badge
  refreshBadgesList: () => void
}

const Row: React.FC<Props> = (props) => {
  const { getToastUtils, getApiService } = useDependencies()
  const { token } = useAuth()
  const apiService = getApiService()
  const toastUtils = getToastUtils()
  const [deleted, setDeleted] = useState<boolean>(false)
  const [updated, setUpdated] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editedBadge, setEditedBadge] = useState<Badge>({ ...props.badge })
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    point_threshold: '',
  })
  const [addBadge, setAddBadge] = useState<Badge>({
    id: props.badge.id,
    name: '',
    point_threshold: 0,
    next_badge: null,
    previous_badge: null,
  })

  const deleteBadge = async () => {
    try {
      const badgeService = apiService.getBadge(token)
      await badgeService.deleteBadge(props.badge.id.toString())

      toastUtils.Toast.showToast(
        toastUtils.types.INFO,
        'Odznakę usunięto pomyślnie',
      )

      setDeleted(true)
      props.refreshBadgesList()
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd',
      )
    }
  }

  const validateForm = (data: { name: string, point_threshold: number }) => {
    const errors = {
      name: '',
      point_threshold: '',
    }

    if (!data.name.trim()) {
      errors.name = 'Nazwa odznaki jest wymagana'
    }
    // eslint-disable-next-line
    if (isNaN(data.point_threshold) || data.point_threshold <= 0) {
      errors.point_threshold = 'Punktowy próg jest wymagany i musi być liczbą większą od zera'
    }

    setValidationErrors(errors)
    return errors
  }

  const handleEditBadge = async () => {
    const errors = validateForm(editedBadge)
    if (Object.values(errors).some((error) => error)) {
      return
    }
    try {
      const badgeService = apiService.getBadge(token)
      await badgeService.updateBadge(props.badge.id.toString(), editedBadge)

      toastUtils.Toast.showToast(
        toastUtils.types.INFO,
        'Odznakę zaktualizowano pomyślnie',
      )
      setUpdated(true)
      props.refreshBadgesList()
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd podczas aktualizacji odznaki',
      )
    }
  }

  const handleAddBadge = async () => {
    const errors = validateForm(addBadge)
    if (Object.values(errors).some((error) => error)) {
      return
    }
    try {
      const badgeService = apiService.getBadge(token)
      await badgeService.createBadge({
        name: addBadge.name,
        point_threshold: addBadge.point_threshold,
        next_badge: addBadge.next_badge,
        previous_badge: addBadge.previous_badge,
      })

      toastUtils.Toast.showToast(
        toastUtils.types.INFO,
        'Odznakę dodano pomyślnie',
      )

      setUpdated(true)
      props.refreshBadgesList()
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany błąd podczas dodawania odznaki',
      )
    }
  }

  if (deleted) {
    return <> </>
  }
  if (updated) {
    return <> </>
  }

  return (
    <tr className="align-middle">
      <td>{props.badge.id}</td>
      <td>{props.badge.name}</td>
      <td>{props.badge.point_threshold}</td>
      <td>{props.badge.next_badge}</td>
      <td>{props.badge.previous_badge}</td>
      <td>
        <Button
          variant="success"
          className="mx-2 my-2 float-end"
          onClick={() => setShowAddModal(true)}
        >
          Dodaj odznakę
        </Button>
        <Button
          variant="primary"
          className="mx-2 my-2 float-end"
          onClick={() => setShowEditModal(true)}
        >
          Edytuj odznakę
        </Button>
        <Button
          variant="danger"
          className="mx-2 my-2 float-end"
          onClick={() => setShowDeleteModal(true)}
        >
          Usuń odznakę
        </Button>
      </td>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Potwierdź usunięcie odznaki</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Czy na pewno chcesz usunąć odznakę?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Anuluj
          </Button>
          <Button variant="danger" onClick={deleteBadge}>
            Usuń
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj odznakę</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nazwa odznaki</Form.Label>
              <FormControl
                type="text"
                value={editedBadge.name}
                onChange={(e) => {
                  setEditedBadge({ ...editedBadge, name: e.target.value })
                  setValidationErrors({ ...validationErrors, name: '' })
                }}
              />
              {validationErrors.name && (
                <div className="text-danger">{validationErrors.name}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Punktowy próg</Form.Label>
              <FormControl
                type="number"
                value={editedBadge.point_threshold}
                onChange={(e) => {
                  setEditedBadge({
                    ...editedBadge,
                    point_threshold: +e.target.value,
                  })
                  setValidationErrors({ ...validationErrors, point_threshold: '' })
                }}
              />
              {validationErrors.point_threshold && (
                <div className="text-danger">
                  {validationErrors.point_threshold}
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kod Następnej odznaki</Form.Label>
              <FormControl
                type="text"
                value={editedBadge.next_badge !== null ? editedBadge.next_badge.toString() : ''}
                onChange={(e) => {
                  const nextBadgeValue = e.target.value.trim()
                  setEditedBadge({
                    ...editedBadge,
                    next_badge: nextBadgeValue ? +nextBadgeValue : null,
                  })
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kod poprzedniej odznaki</Form.Label>
              <FormControl
                type="text"
                value={editedBadge.previous_badge !== null ? editedBadge.previous_badge.toString() : ''}
                onChange={(e) => {
                  const previousBadgeValue = e.target.value.trim()
                  setEditedBadge({
                    ...editedBadge,
                    previous_badge: previousBadgeValue ? +previousBadgeValue : null,
                  })
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={handleEditBadge}>
            Zapisz zmiany
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj odznakę</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nazwa odznaki</Form.Label>
              <FormControl
                type="text"
                onChange={(e) => {
                  setAddBadge({ ...addBadge, name: e.target.value })
                  setValidationErrors({ ...validationErrors, name: '' })
                }}
              />
              {validationErrors.name && (
                <div className="text-danger">{validationErrors.name}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Punktowy próg</Form.Label>
              <FormControl
                type="number"
                onChange={(e) => {
                  setAddBadge({
                    ...addBadge,
                    point_threshold: +e.target.value,
                  })
                  setValidationErrors({ ...validationErrors, point_threshold: '' })
                }}
              />
              {validationErrors.point_threshold && (
                <div className="text-danger">
                  {validationErrors.point_threshold}
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kod Następnej odznaki</Form.Label>
              <FormControl
                type="text"
                onChange={(e) => {
                  const nextBadgeValue = e.target.value.trim()
                  setAddBadge({
                    ...addBadge,
                    next_badge: nextBadgeValue ? +nextBadgeValue : null,
                  })
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kod poprzedniej odznaki</Form.Label>
              <FormControl
                type="text"
                onChange={(e) => {
                  const previousBadgeValue = e.target.value.trim()
                  setAddBadge({
                    ...addBadge,
                    previous_badge: previousBadgeValue ? +previousBadgeValue : null,
                  })
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={handleAddBadge}>
            Dodaj
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  )
}
export default Row
