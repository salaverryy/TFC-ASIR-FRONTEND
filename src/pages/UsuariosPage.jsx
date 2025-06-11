
import React, { useEffect, useState, useContext } from 'react';
import {
  Table,
  Space,
  Button,
  Layout,
  Menu,
  Typography,
  message,
} from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from "../services/api";

const { Header, Content, Footer } = Layout;

const UsuariosPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await api.get('api/users');
      console.log("Respuesta del backend:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.users || [];

      setUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      message.error('No se pudieron cargar los usuarios.');
    }
  };

  useEffect(() => {
    console.log("🧪 Rol desde AuthContext:", role); // debug
    fetchUsers();
  }, [role]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Apellidos', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Rol', dataIndex: 'role', key: 'role' },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space>
          <Link to={`/usuarios/${record.id}`} style={{ color: '#1890ff' }}>
            <EyeOutlined /> Ver
          </Link>
          {role === 'ADMIN' && (
            <Button
              danger
              size="small"
              onClick={() => message.info('Eliminar no implementado')}
              icon={<DeleteOutlined />}
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header
        style={{
          background: '#001529',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 64,
        }}
      >
        <div style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>
          <UserOutlined style={{ marginRight: 10 }} />
          Panel de Usuarios
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['usuarios']}
          items={[
            {
              key: 'dashboard',
              label: 'Dashboard',
              onClick: () => navigate('/dashboard'),
            },
            {
              key: 'usuarios',
              label: 'Usuarios',
              onClick: () => navigate('/users'),
            },
            {
              key: 'logout',
              label: 'Cerrar sesión',
              onClick: () => navigate('/'),
            },
          ]}
        />
      </Header>

      <Content style={{ padding: '24px 40px' }}>
        <Typography.Title level={2} style={{ color: '#333' }}>
          Administración de Usuarios
        </Typography.Title>

        <div style={{ marginBottom: 16 }}>
          {role === 'ADMIN' && (
            <>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                style={{ marginRight: 8 }}
                onClick={() => navigate('/crear-usuario')}
              >
                Crear Usuario
              </Button>
              <Button
                onClick={() => setSelectedRowKeys(users.map((u) => u.id))}
                style={{ marginRight: 8 }}
              >
                Seleccionar todos
              </Button>
            </>
          )}
          <Button onClick={() => setSelectedRowKeys([])} danger>
            Deseleccionar
          </Button>
          <span style={{ marginLeft: 16 }}>
            {selectedRowKeys.length} seleccionados
          </span>
        </div>

        <Table
          rowSelection={role === 'ADMIN' ? rowSelection : undefined}
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 10 }}
          bordered
          rowKey="id"
          style={{ background: '#fff', borderRadius: 8 }}
        />
      </Content>

      <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff' }}>
        <p>© 2025 Panel IT ASIR - Todos los derechos reservados</p>
      </Footer>
    </Layout>
  );
};

export default UsuariosPage;
