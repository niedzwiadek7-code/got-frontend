import React, { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import Styles from './PublicLayout.module.scss'
import Theme from '../../../assets/images/theme.jpg'
import { useTheme } from '../../../context/theme'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => {
  const theme = useTheme()

  return (
    <div
      className={Styles.container}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.color,
      }}
    >
      <FontAwesomeIcon
        icon={faSun}
        color={theme.colors.color}
        style={{
          position: 'absolute',
          top: '20px',
          right: '10px',
          cursor: 'pointer',
          fontSize: '1.5em',
        }}
        onClick={() => theme.changeTheme()}
      />

      <div className={`${Styles.content} row`}>
        <div className="col-12 col-lg-6">
          <img
            src={Theme}
            alt=""
            className={Styles.img}
          />
        </div>

        <div className={`${Styles.pageContent} col-12 col-lg-6 p-4`}>
          <div className="w-100">
            { props.children }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
