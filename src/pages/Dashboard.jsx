import React, { useContext } from "react";
import { Layout, Card, Typography, Menu, Button } from "antd";
import {
  UserOutlined,
  DatabaseOutlined,
  PoweroffOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const { role, logout } = useContext(AuthContext);

  const adminView = (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <Card
        style={{
          backgroundColor: "#001529",
          color: "white",
          flex: 1,
          minWidth: 280,
          borderRadius: 12,
        }}
      >
        <UserOutlined style={{ fontSize: 30, color: "#1890ff" }} />
        <Typography.Text style={{ display: "block", color: "#ccc", marginTop: 8 }}>
          Usuarios activos
        </Typography.Text>
        <Typography.Title level={3} style={{ color: "#fff" }}>
          138
        </Typography.Title>
      </Card>

      <Card
        style={{
          backgroundColor: "#002140",
          color: "white",
          flex: 1,
          minWidth: 280,
          borderRadius: 12,
        }}
      >
        <DatabaseOutlined style={{ fontSize: 30, color: "#52c41a" }} />
        <Typography.Text style={{ display: "block", color: "#ccc", marginTop: 8 }}>
          Servidores
        </Typography.Text>
        <Typography.Title level={3} style={{ color: "#fff" }}>
          12
        </Typography.Title>
      </Card>

      <Card
        style={{
          backgroundColor: "#003a8c",
          color: "white",
          flex: 1,
          minWidth: 280,
          borderRadius: 12,
        }}
      >
        <PoweroffOutlined style={{ fontSize: 30, color: "#faad14" }} />
        <Typography.Text style={{ display: "block", color: "#ccc", marginTop: 8 }}>
          Sesiones activas
        </Typography.Text>
        <Typography.Title level={3} style={{ color: "#fff" }}>
          27
        </Typography.Title>
      </Card>
    </div>
  );

  const userView = (
    <Card
      style={{
        backgroundColor: "#001529",
        color: "white",
        borderRadius: 12,
        padding: 40,
        textAlign: "center",
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <SmileOutlined style={{ fontSize: 40, color: "#00bfff" }} />
      <Typography.Title level={3} style={{ color: "#fff", marginTop: 16 }}>
        Bienvenido al sistema
      </Typography.Title>
      <Typography.Text style={{ color: "#aaa" }}>
        Acceso como usuario. Contacta con tu administrador si necesitas permisos avanzados.
      </Typography.Text>
      <div style={{ marginTop: 24 }}>
        <Button type="primary" onClick={() => navigate("/users")}>
          Ver usuarios
        </Button>
      </div>
    </Card>
  );

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#0e1117" }}>
      <Header
        style={{
          background: "#001529",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 64,
        }}
      >
        <div style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
          🧭 Dashboard
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["dashboard"]}>
          <Menu.Item key="dashboard" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="users" onClick={() => navigate("/users")}>
            Usuarios
          </Menu.Item>
          <Menu.Item key="logout" onClick={logout}>
            Cerrar sesión
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "40px" }}>
        <Typography.Title level={2} style={{ color: "#fff", marginBottom: 30 }}>
          {role === "admin"
            ? "Panel de administración ASIR"
            : "Panel de usuario"}
        </Typography.Title>

        {role === "admin" ? adminView : userView}
      </Content>

      <Footer style={{ textAlign: "center", backgroundColor: "#001529", color: "#fff" }}>
        © 2025 ASIR Dashboard - Todos los derechos reservados
      </Footer>
    </Layout>
  );
};

export default Dashboard;
