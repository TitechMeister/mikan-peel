import React, { useMemo } from 'react'
import c from 'classnames'

import styles from './LogoMedium.scss'

type Props = {
  type?: 'primary' | 'light'
}

const LogoMedium: React.FC<Props> = ({ type = 'primary' }) => {
  const logoPath = useMemo(() => {
    switch (type) {
      case 'primary':
        return '/images/mikan-logo-orange.png'
      case 'light':
        return '/images/mikan-logo-white.png'
      default:
        return ''
    }
  }, [type])

  return (
    <div
      className={c(styles.self, {
        [styles.primary]: type === 'primary',
        [styles.light]: type === 'light',
      })}
    >
      <img src={logoPath} />
      <h1>Mikan</h1>
    </div>
  )
}

export default LogoMedium
