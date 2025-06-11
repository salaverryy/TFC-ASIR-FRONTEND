import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import UsuariosPage from './pages/UsuariosPage';
import CrearUsuarioPage from './pages/CrearUsuarioPage';
import UsuarioDetalle from './pages/UsuarioDetalle';
import CambiarContrasena from './pages/CambiarContrasena';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  console.log("✅ App.jsx se está montando");

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><UsuariosPage /></PrivateRoute>} />
          <Route path="/usuarios/:id" element={<PrivateRoute><UsuarioDetalle /></PrivateRoute>} />
          <Route path="/cambiar-contrasena" element={<PrivateRoute><CambiarContrasena /></PrivateRoute>} />
          <Route path="/crear-usuario" element={<PrivateRoute><CrearUsuarioPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
