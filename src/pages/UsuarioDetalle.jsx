import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Card,
  Typography,
  Button,
  Tag,
  Row,
  Col,
  Avatar,
  Descriptions,
  Divider,
  Spin,
  message
} from 'antd';
import {
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import api from '../services/api';

const { Title, Text } = Typography;

const UsuarioDetalle = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        message.error('No se pudo cargar el usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Spin size="large" tip="Cargando usuario..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>
        Usuario no encontrado.
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card
        style={{
          maxWidth: 880,
          margin: '0 auto',
          borderRadius: 16,
          boxShadow: '0 10px 24px rgba(0,0,0,0.1)',
        }}
        bordered={false}
        bodyStyle={{ padding: '40px' }}
      >
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={8} style={{ textAlign: 'center' }}>
            <Avatar
              size={120}
              icon={<UserOutlined />}
              style={{
                backgroundColor: '#d9d9d9',
                color: '#555',
                marginBottom: 16,
              }}
            />
            <Title level={3} style={{ marginBottom: 4 }}>
              {user.name} {user.lastName}
            </Title>
            <Text type="secondary" style={{ fontSize: 14 }}>
              ID de Usuario: <strong>{user.externalId || user.id}</strong>
            </Text>
            <Divider />
            <Tag icon={<IdcardOutlined />} color={user.role === 'admin' ? 'volcano' : 'blue'}>
              {user.role?.toUpperCase()}
            </Tag>
            <br />
            <Tag
              icon={user.status === 'activo' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              color={user.status === 'activo' ? 'green' : 'red'}
              style={{ marginTop: 8 }}
            >
              {user.status?.toUpperCase() || 'SIN ESTADO'}
            </Tag>
          </Col>

          <Col xs={24} md={16}>
            <Descriptions
              title="Información del Usuario"
              bordered
              column={1}
              labelStyle={{ fontWeight: 600, width: 150 }}
              contentStyle={{ backgroundColor: '#fafafa' }}
            >
              <Descriptions.Item label="Correo electrónico">
                <MailOutlined /> {user.email}
              </Descriptions.Item>
              <Descriptions.Item label="Teléfono">
                <PhoneOutlined /> {user.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Rol">
                {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
              </Descriptions.Item>
              <Descriptions.Item label="Estado">
                {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 30 }}>
              <Link to="/users">
                <Button type="primary" icon={<ArrowLeftOutlined />}>
                  Volver a Usuarios
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UsuarioDetalle;