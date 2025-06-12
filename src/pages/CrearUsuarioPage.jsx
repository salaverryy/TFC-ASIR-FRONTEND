
import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Layout,
  message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const CrearUsuarioPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await api.post('/api/users', values);
      message.success('Usuario creado correctamente');
      navigate('/users');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      message.error('Hubo un error al crear el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ padding: '40px' }}>
      <Content style={{ background: '#fff', padding: '24px', borderRadius: 8 }}>
        <Title level={2}>Crear Nuevo Usuario</Title>

        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ role: 'user' }}
        >
          <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Apellidos" name="lastName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Teléfono" name="phone">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Crear Usuario
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => navigate('/users')}>
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default CrearUsuarioPage;
