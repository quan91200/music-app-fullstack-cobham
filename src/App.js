import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { publicRoutes, privateRoutes, protectedRoutes } from './routes/routes'
import Layout from './layouts/Layout'

const App = () => {
  const routes = [...publicRoutes, ...privateRoutes, ...protectedRoutes]
  return (
    <Router future={{
      v7_relativeSplatPath: true, v7_startTransition: true,
    }}>
      <Routes>
        {routes.map(({ path, element, layout }, index) => (
          <Route
            key={index}
            path={path}
            element={layout ? <Layout element={element} layout={layout} /> : element}
          />
        ))}
      </Routes>
    </Router>
  )
}

export default App;
