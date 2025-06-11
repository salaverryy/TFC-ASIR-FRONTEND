// src/services/authService.js
import api from './api'; // Asegúrate de que esto apunte a axios con baseURL: http://localhost:8080

const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });

    const { accessToken, role } = response.data;

    if (!accessToken || !role) {
      throw new Error('Respuesta inválida del servidor');
    }

    localStorage.setItem('token', accessToken);
    localStorage.setItem('role', role);

    return { success: true, token: accessToken };
  } catch (error) {
    console.error('Error al hacer login:', error);
    throw error;
  }
};

export default { login };
