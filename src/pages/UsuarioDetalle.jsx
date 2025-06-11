import React from 'react';
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

const { Title, Text } = Typography;

// ✅ Datos simulados con campos realistas
const mockUser = {
  id: 1,
  nombre: 'Juan',
  apellidos: 'Pérez Gómez',
  email: 'juan@example.com',
  rol: 'admin',
  telefono: '600123456',
  estado: 'activo',
};

const UsuarioDetalle = () => {
  const { id } = useParams();
  const user = { ...mockUser, id };

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
          {/* Lado izquierdo: avatar y nombre */}
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
              {user.nombre} {user.apellidos}
            </Title>
            <Text type="secondary" style={{ fontSize: 14 }}>
              ID de Usuario: <strong>{user.id}</strong>
            </Text>
            <Divider />
            <Tag icon={<IdcardOutlined />} color={user.rol === 'admin' ? 'volcano' : 'blue'}>
              {user.rol.toUpperCase()}
            </Tag>
            <br />
            <Tag
              icon={user.estado === 'activo' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              color={user.estado === 'activo' ? 'green' : 'red'}
              style={{ marginTop: 8 }}
            >
              {user.estado.toUpperCase()}
            </Tag>
          </Col>

          {/* Lado derecho: info detallada */}
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
                <PhoneOutlined /> {user.telefono}
              </Descriptions.Item>
              <Descriptions.Item label="Rol">
                {user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}
              </Descriptions.Item>
              <Descriptions.Item label="Estado">
                {user.estado.charAt(0).toUpperCase() + user.estado.slice(1)}
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
