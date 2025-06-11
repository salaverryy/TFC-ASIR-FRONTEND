// src/services/authService.js
import { jwtDecode } from 'jwt-decode';
import api from './api'; // Asegúrate de que esto apunte a axios con baseURL: http://localhost:8080

const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });

    const { accessToken } = response.data;

    if (!accessToken) {
      throw new Error('Token no recibido del servidor');
    }

    // Decodificar el token JWT
    const decodedToken = jwtDecode(accessToken);

    // Extraer el rol desde cognito:groups
    const role = decodedToken['cognito:groups']?.[0] ?? 'UNKNOWN';

    // Guardar en localStorage
    localStorage.setItem('token', accessToken);
    localStorage.setItem('role', role);

    console.log(localStorage.getItem('role'));

    return { success: true, token: accessToken };
  } catch (error) {
    console.error('Error al hacer login:', error);
    throw error;
  }
};

export default { login };
