import React from 'react'
import LogoBig from '../components/logo/LogoBig'
import ServiceLinks from '../components/home/ServiceLinks'
import { Container } from 'react-bootstrap'

const HomeView: React.FC = () => {
  return (
    <Container>
      <LogoBig type='primary' />
      <ServiceLinks />
    </Container>
  )
}

export default HomeView
