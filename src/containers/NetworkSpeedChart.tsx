import { connect } from 'react-redux'
import NetworkSpeedChart from '../components/NetworkSpeedChart'
import { smooth } from '../entities/NetworkSpeed'
import State from '../modules/State'
import floorDate from '../utilities/floorDate'

export default connect(
  (state: State) => {
    const {
      records,
      viewport: { resolution }
    } = state
    return {
      records: resolution !== 'day' ? smooth(records, floorDate) : records,
      resolution
    }
  },
  {}
)(NetworkSpeedChart)
