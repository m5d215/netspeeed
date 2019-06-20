import { connect } from 'react-redux'
import Navigation from '../components/Navigation'
import { changeWindow } from '../modules/actions'
import State from '../modules/State'

export default connect(
  (state: State) => {
    const {
      viewport: { resolution }
    } = state
    return { resolution }
  },
  { onChange: changeWindow }
)(Navigation)
