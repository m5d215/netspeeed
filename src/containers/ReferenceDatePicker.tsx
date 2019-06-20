import { connect } from 'react-redux'
import ReferenceDatePicker from '../components/ReferenceDatePicker'
import { changeWindow } from '../modules/actions'
import State from '../modules/State'

export default connect(
  (state: State) => {
    const {
      viewport: { timestamp }
    } = state
    return { timestamp }
  },
  { onChange: changeWindow }
)(ReferenceDatePicker)
