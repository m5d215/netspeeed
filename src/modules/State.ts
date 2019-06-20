import NetworkSpeed from '../entities/NetworkSpeed'
import Settings from '../entities/Settings'
import Viewport from '../entities/Viewport'

export default interface State {
  settings: Settings
  status: 'none' | 'fetching' | Error
  records: NetworkSpeed[]
  viewport: Viewport
}
