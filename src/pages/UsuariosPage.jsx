import React, { useEffect, useState, useContext } from 'react';
import {
  Table,
  Space,
  Button,
  Layout,
  Menu,
  Typography,
  message,
  Popconfirm,
  Modal,
  Form,
  Input,
} from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  UserAddOutlined,
  UserOutlined,
  EditOutlined,
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

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    try {
      const response = await api.get('api/users');
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
    fetchUsers();
  }, [role]);

  const showEditModal = (user) => {
    setCurrentUser(user);
    setIsEditModalVisible(true);
    form.setFieldsValue(user);
  };

  const handleEditSubmit = async () => {
    try {
      const updatedUser = await form.validateFields();
      await api.put(`/api/users/${currentUser.externalId}`, updatedUser);
      message.success("Usuario actualizado correctamente");
      setIsEditModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      message.error("No se pudo actualizar el usuario");
    }
  };

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
          <Link to={`/usuarios/${record.externalId}`} style={{ color: '#1890ff' }}>
            <EyeOutlined /> Ver
          </Link>
          {role === 'ADMIN' && (
            <>
              <Button
                icon={<EditOutlined />}
                size="small"
                onClick={() => showEditModal(record)}
              />
              <Popconfirm
                title="¿Estás seguro de que deseas eliminar este usuario?"
                description={`Esta acción no se puede deshacer. Usuario: ${record.email}`}
                okText="Sí"
                cancelText="No"
                onConfirm={async () => {
                  try {
                    await api.delete(`/api/users/${record.externalId}`);
                    message.success('Usuario eliminado correctamente');
                    fetchUsers();
                  } catch (error) {
                    console.error('Error al eliminar usuario:', error);
                    message.error('No se pudo eliminar el usuario');
                  }
                }}
              >
                <Button danger size="small" icon={<DeleteOutlined />} />
              </Popconfirm>
            </>
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

        <Space>
          <Button type="link" style={{ color: '#fff' }} onClick={() => navigate('/users')}>
            Usuarios
          </Button>
          <Button type="link" style={{ color: '#fff' }} onClick={() => navigate('/')}>
            Cerrar sesión
          </Button>
        </Space>
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

      <Modal
        open={isEditModalVisible}
        title="Editar usuario"
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEditSubmit}
        okText="Guardar cambios"
        cancelText="Cancelar"
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Apellidos" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Teléfono" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default UsuariosPage;
