import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './app'
import { setupStore } from './app/store'

const store = setupStore()

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
