import React from 'react'
import type { MikanApi } from '../utils/mikanApi'

const MikanApiContext = React.createContext<MikanApi>(null)

export default MikanApiContext
