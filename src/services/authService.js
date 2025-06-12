// src/services/authService.js
import { jwtDecode } from "jwt-decode";
import api from "./api";

const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    const { accessToken } = response.data;

    if (!accessToken) {
      return { success: false, message: "Token no recibido del servidor" };
    }

    const decodedToken = jwtDecode(accessToken);
    const role = decodedToken["cognito:groups"]?.[0] ?? "UNKNOWN";

    localStorage.setItem("token", accessToken);
    localStorage.setItem("role", role);

    return { success: true, token: accessToken, role };
  } catch (error) {
    console.error("🔴 authService error:", error);

    const challenge = error?.response?.data?.challenge; // ✅ este es el path correcto
    const session = error?.response?.data?.session;
    const message = error?.response?.data?.message || "Error inesperado";

    if (challenge === "NEW_PASSWORD_REQUIRED" && session) {
      return { success: false, challenge, session, message };
    }

    return { success: false, message };
  }
};

export default { login };
