import { ThemeProvider } from '@material-ui/styles'
import { enableBoundaryChecking } from 'number-precision'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'typeface-roboto'
import App from './App'
import { initialize } from './modules/actions'
import store from './store'
import theme from './theme'

enableBoundaryChecking(false)

store.dispatch(initialize())

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
