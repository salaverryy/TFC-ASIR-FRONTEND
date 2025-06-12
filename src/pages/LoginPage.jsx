import React, { useContext } from "react";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onFinish = async (values) => {
    const success = await login(values.email, values.password);
    if (success) {
      message.success("Acceso concedido");
      navigate("/dashboard");
    } else {
      message.error("Credenciales inválidas");
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
