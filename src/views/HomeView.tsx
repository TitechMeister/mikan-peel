import React from 'react'
import LogoBig from '../components/logo/LogoBig'
import ServiceLinks from '../components/home/ServiceLinks'

const HomeView: React.FC = () => {
  return (
    <div>
      <LogoBig type='primary' />
      <ServiceLinks />
    </div>
  )
}

export default HomeView
