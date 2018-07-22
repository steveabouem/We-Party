import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counterApp from './reducers'
import App from './containers/App'
​
const app = Express()
const port = 3000
​
//Serve static files
app.use('/static', Express.static('static'))
​
// This is fired every time the server side receives a request
app.use(handleRender)
​
// We are going to fill these out in the sections to follow
function handleRender(req, res) {  // Create a new Redux store instance
  const store = createStore(counterApp)
  ​coonsole.log('server active');
  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
    <App />
    </Provider>
  )
  ​
  // Grab the initial state from our Redux store
  const preloadedState = store.getState()
  ​
  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState)) }
  function renderFullPage(html, preloadedState) { `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <link href="https://fonts.googleapis.com/css?family=Josefin+Sans" rel="stylesheet">
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      <title>React App</title>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root"></div>
    </body>
  </html>` }
  ​
  app.listen(port)