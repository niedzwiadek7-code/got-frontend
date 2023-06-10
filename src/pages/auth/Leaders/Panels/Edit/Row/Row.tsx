import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'react-bootstrap'
import dayjs from 'dayjs'
import * as Input from '../../../../../../components/UI/Input'
import { useDependencies } from '../../../../../../context/dependencies'
import { useAuth } from '../../../../../../context/auth'
import * as Modal from '../../../../../../components/UI/Modal'

type Inputs = {
  user_id: number,
  mountain_group_id: number,
  assignment_date: string,
}

type Props = {
  userId: number,
  assignmentDate: string | undefined,
  mountainGroupId: number,
  mountainGroupName: string,
}

const Row: React.FC<Props> = (props) => {
  const { getApiService, getToastUtils } = useDependencies()
  const { token } = useAuth()
  const apiService = getApiService()
  const toastUtils = getToastUtils()
  const [assignmentDate, setAssignmentDate] = useState<string | undefined>(props.assignmentDate)

  const {
    register, watch, formState: { errors },
  } = useForm<Inputs>({
    mode: 'all',
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userService = apiService.getUser(token)
      await userService.assignMountainGroup(data)
      toastUtils.Toast.showToast(
        toastUtils.types.INFO,
        `Nadałeś uprawnienia na grupę: ${props.mountainGroupName}`,
      )
      setAssignmentDate(data.assignment_date)
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany problem',
      )
    }
  }

  const deletePermissions = async () => {
    try {
      const userService = apiService.getUser(token)
      await userService.revokeMountainGroup({
        user_id: props.userId,
        mountain_group_id: props.mountainGroupId,
      })
      toastUtils.Toast.showToast(
        toastUtils.types.INFO,
        `Odebrano uprawnienia na grupę: ${props.mountainGroupName}`,
      )
      setAssignmentDate(undefined)
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystąpił nieoczekiwany problem',
      )
    }
  }

  if (assignmentDate) {
    return (
      <tr style={{ height: '80px' }}>
        <td>
          {props.mountainGroupName}
        </td>

        <td className="text-center">
          Uprawnienia nadano dnia:
          <span className="fw-bold">
            {dayjs(assignmentDate).format('DD-MM-YYYY')}
          </span>
        </td>

        <td>
          <div
            className="text-end"
          >
            <Modal.Component
              title="Odbierz uprawnienia"
              message="Czy napewno chcesz odebrać uprawnienia"
              action={deletePermissions}
              variant="danger"
            />
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr style={{ height: '80px' }}>
      <td>
        {props.mountainGroupName}
      </td>

      <td>
        <input
          type="hidden"
          defaultValue={props.userId}
          {...register('user_id')}
        />

        <input
          type="hidden"
          defaultValue={props.mountainGroupId}
          {...register('mountain_group_id')}
        />

        <div>
          <Input.Component
            label="Data nadania uprawnień"
            type={Input.Type.DATE}
            register={register}
            name="assignment_date"
            default={dayjs().format('YYYY-MM-DD')}
            errorMessage={errors?.assignment_date?.message}
            validation={['required']}
          />
        </div>
      </td>

      <td>
        <div
          className="text-end"
        >
          <Button
            type="submit"
            variant="primary"
            onClick={() => onSubmit(watch())}
          >
            Nadaj uprawnienia
          </Button>
        </div>
      </td>
    </tr>
  )
}

export default Row
