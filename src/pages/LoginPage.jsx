import React, { useContext, useState } from "react"; // ← IMPORTANTE: useState
import { Button, Card, Form, Input, Typography, message, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api"; // Asegúrate de que este path sea correcto
import { jwtDecode } from "jwt-decode"; // Asegúrate de tener jwt-decode instalado

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formError, setFormError] = useState(null); // ✅ AQUÍ VA
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [challengeSession, setChallengeSession] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const handlePasswordChange = async (values) => {
    console.log("📨 Intentando cambiar contraseña con:", values);

    const { newPassword } = values;

    // Verifica los datos necesarios antes del POST
    console.log("🔍 Email:", userEmail);
    console.log("🔍 Session:", challengeSession);
    console.log("🔍 Nueva contraseña:", newPassword);

    if (!userEmail || !challengeSession || !newPassword) {
      console.error("❌ Faltan datos necesarios para el cambio de contraseña");
      message.error("No se puede enviar la solicitud. Faltan datos.");
      return;
    }

    try {
      console.log("🚀 Enviando POST a /auth/change-password...");
      const response = await api.post("/auth/change-password", {
        email: userEmail,
        session: challengeSession,
        newPassword,
      });

      console.log("✅ Respuesta del backend:", response.data);

      const { accessToken } = response.data;
      const decodedToken = jwtDecode(accessToken);
      const role = decodedToken["cognito:groups"]?.[0] ?? "UNKNOWN";

      console.log("🔑 Role::", role);

      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", role);

      message.success("Contraseña actualizada correctamente");
      setPasswordModalVisible(false);
      navigate("/users");
    } catch (error) {
      const msg = error?.response?.data?.message || "No se pudo cambiar la contraseña";
      console.error("❌ Error en el cambio de contraseña:", msg, error);
      message.error(msg);
    }
  };

  const onFinish = async (values) => {
    try {
      const result = await login(values.email, values.password);
      console.log("🔴 Resultado del login:", result);

      if (result.success) {
        message.success("Acceso concedido");
        navigate("/users");
      } else if (result.challenge === "NEW_PASSWORD_REQUIRED") {
        // Mostrar modal de nueva contraseña
        setUserEmail(values.email);
        setChallengeSession(result.session);
        setPasswordModalVisible(true);
      } else {
        setFormError(result.message || "Credenciales inválidas");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Error inesperado";
      setFormError(msg);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        overflow: "hidden", // 🚫 Bloquea scroll
        backgroundImage: `url(https://images.unsplash.com/photo-1581091012184-7e0cdfbb6795?auto=format&fit=crop&w=1950&q=80)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', monospace",
        position: "relative",
      }}
    >
      {/* Capa oscura para contraste */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 1,
        }}
      />

      {/* Tarjeta de login */}
      <Card
        style={{
          zIndex: 2,
          width: "100%",
          maxWidth: 520, // 📏 Más grande
          padding: 50,
          borderRadius: 20,
          background: "rgba(15, 15, 15, 0.65)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 0 30px rgba(0, 128, 255, 0.3)",
          backdropFilter: "blur(16px)",
          color: "white",
          animation: "fadeIn 1.2s ease",
        }}
        bordered={false}
      >
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Typography.Title level={2} style={{ color: "#00d8ff", fontWeight: 700, marginBottom: 0, fontSize: 32 }}>
            👨‍💻 Centro de Administración de Usuarios
          </Typography.Title>
          <Typography.Text style={{ color: "#aaa", fontSize: 15 }}>
            Acceso restringido para personal autorizado
          </Typography.Text>
        </div>

        <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 30 }}>
          <Form.Item
            label={<span style={{ color: "#eee" }}>Correo electrónico</span>}
            name="email"
            rules={[{ required: true, message: "Ingresa tu correo electrónico" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="admin@sistema.local"
              style={{
                backgroundColor: "#111",
                color: "#0ff",
                borderColor: "#333",
                height: 45,
              }}
            />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#eee" }}>Contraseña</span>}
            name="password"
            rules={[{ required: true, message: "Ingresa tu contraseña" }]}
            help={formError} // ✅ muestra el mensaje de error
            validateStatus={formError ? "error" : ""} // ✅ marca el campo en rojo
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="••••••••"
              style={{
                backgroundColor: "#111",
                color: "#0ff",
                borderColor: "#333",
                height: 45,
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                background: "#00bfff",
                borderColor: "#00bfff",
                height: 48,
                fontWeight: 600,
                fontSize: "16px",
                borderRadius: 10,
              }}
            >
              INGRESAR AL SISTEMA
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* 🔐 Modal para cambio de contraseña */}
      <Modal
        title="Cambio de contraseña requerido"
        open={passwordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handlePasswordChange} layout="vertical">
          <Form.Item
            name="newPassword"
            label="Nueva contraseña"
            rules={[{ required: true, message: "Introduce tu nueva contraseña" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirmar contraseña"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Confirma tu nueva contraseña" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Las contraseñas no coinciden"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* 👇 Este botón debe estar dentro del <Form> */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Cambiar contraseña
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
