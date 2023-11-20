import React, { ReactNode } from 'react'
import Styles from './PublicLayout.module.scss'
import Theme from '../../../assets/images/theme.jpg'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div className={Styles.container}>
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

export default Layout
