import React, { useMemo } from 'react'
import { Button } from 'react-bootstrap'

import styles from './ServiceLinks.scss'

type Links = {
  [name: string]: string
}

const ServiceLinks: React.FC = () => {
  const links: Links = useMemo(() => JSON.parse(process.env.SERVICE_LINKS), [])

  return (
    <div className={styles.self}>
      {Object.entries(links).map(([name, url]) => (
        <Button
          key={name}
          className={styles.button}
          variant='outline-primary'
          href={url}
        >
          {name}
        </Button>
      ))}
    </div>
  )
}

export default ServiceLinks
