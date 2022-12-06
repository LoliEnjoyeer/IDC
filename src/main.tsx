import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'
import { store } from './store'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLDivElement
)

root.render(
    <BrowserRouter>
        <ChakraProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ChakraProvider>
    </BrowserRouter>
)
