import React, { useMemo } from 'react'
import c from 'classnames'

import styles from './LogoBig.scss'

type Props = {
  type?: 'primary' | 'light'
}

const LogoBig: React.FC<Props> = ({ type = 'primary' }) => {
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
      <div className={styles.logo}>
        <img src={logoPath} />
      </div>
      <h1>Mikan</h1>
    </div>
  )
}

export default LogoBig
