import React, { useContext, useState } from "react";
import { Button, Card, Form, Input, Typography, Modal, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");

  // Estados para nueva contraseña
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [session, setSession] = useState("");
  const [emailTemp, setEmailTemp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFinish = async (values) => {
    setError("");
    const result = await login(values.email, values.password);

    if (result === true) {
      navigate("/dashboard");
    } else if (result?.reason === "NEW_PASSWORD_REQUIRED") {
      setEmailTemp(values.email);
      setSession(result.session);
      setShowPasswordModal(true);
    } else {
      setError("⚠️ Credenciales inválidas. Intenta nuevamente.");
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      message.error("Las contraseñas no coinciden.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/auth/change-password", {
        email: emailTemp,
        newPassword,
        session,
      });

      message.success("✅ Contraseña cambiada correctamente.");
      setShowPasswordModal(false);
      setNewPassword("");
      setConfirmPassword("");
      setSession("");
      setEmailTemp("");
      message.info("Inicia sesión con tu nueva contraseña.");
      // Opcional: recarga la página o redirige
      // window.location.reload();
    } catch (err) {
      console.error(err);
      message.error("❌ Error al cambiar la contraseña.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        overflow: "hidden",
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 1,
        }}
      />

      <Card
        style={{
          zIndex: 2,
          width: "100%",
          maxWidth: 520,
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

          {error && (
            <Typography.Text type="danger" style={{ display: "block", marginBottom: 16 }}>
              {error}
            </Typography.Text>
          )}

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

      <Modal
        open={showPasswordModal}
        title="Es necesario cambiar la contraseña"
        onCancel={() => setShowPasswordModal(false)}
        onOk={handlePasswordChange}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form layout="vertical">
          <Form.Item label="Nueva contraseña" required>
            <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </Form.Item>
          <Form.Item label="Confirmar contraseña" required>
            <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
