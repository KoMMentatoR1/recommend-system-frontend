import { publicRoutes, userRoutes } from './routes'
import { Routes, Route } from 'react-router-dom'
import { useTypeSelector } from '../../shared/hooks/useTypeSelector'

const AppRouter = () => {
  const { user } = useTypeSelector(state => state.auth)

  return (
    <Routes>
      {!user.token &&
        publicRoutes.map(route => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      {user.token &&
        userRoutes.map(route => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
    </Routes>
  )
}

export default AppRouter
