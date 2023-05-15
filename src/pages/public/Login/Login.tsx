import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Errors, getPath, PathNames } from '../../../utils/defines'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import * as Input from '../../../components/UI/Input'

type Inputs = {
  email: string,
  password: string,
}

type Props = {}

const Login: React.FC<Props> = () => {
  const { getApiService } = useDependencies()
  const apiService = getApiService()
  const { setToken, setLoggedIn } = useAuth()
  const navigate = useNavigate()

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const authService = apiService.getAuth()
    const token = await authService.login(data)
    setToken(token)
    setLoggedIn(true)
    navigate(getPath(PathNames.MOUNTAIN_GROUP))
  }

  const ErrorMessageMap = new Map([
    [Errors.REQUIRED, {
      value: true,
      message: 'To pole jest wymagane',
    }],
  ])

  return (
    <div>
      <h2 className="mb-4"> Zaloguj się </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Input.Component
            label="Adres email"
            type={Input.Type.EMAIL}
            data={register('email', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.email?.message || undefined}
          />

          <Input.Component
            label="Hasło"
            type={Input.Type.PASSWORD}
            data={register('password', { required: ErrorMessageMap.get(Errors.REQUIRED) })}
            errorMessage={errors?.password?.message || undefined}
          />

          <Button
            type="submit"
            variant="success"
          >
            Zaloguj się
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
