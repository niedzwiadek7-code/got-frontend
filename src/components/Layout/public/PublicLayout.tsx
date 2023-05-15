import React, { ReactNode } from 'react'
import Styles from './PublicLayout.module.scss'
import Theme from '../../../assets/images/theme.jpg'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div className={Styles.content}>
    <div className="row h-100">
      <div className="col-6">
        <img
          src={Theme}
          alt=""
          className={Styles.img}
        />
      </div>

      <div className="col-6 p-4">
        { props.children }
      </div>
    </div>
  </div>
)

export default Layout
