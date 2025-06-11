
// src/pages/CambiarContrasena.jsx
import React, { useState } from 'react';
import { Card, Form, Input, Button, message, Typography } from 'antd';

const CambiarContrasena = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = ({ currentPassword, newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) {
      message.error('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    // Aquí iría tu lógica de API (simulada)
    setTimeout(() => {
      setLoading(false);
      message.success('Contraseña actualizada correctamente');
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Cambiar Contraseña" style={{ width: 400 }}>
        <Typography.Paragraph>
          Por favor, introduce tu contraseña actual y luego la nueva contraseña.
        </Typography.Paragraph>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="currentPassword"
            label="Contraseña Actual"
            rules={[{ required: true, message: 'Introduce tu contraseña actual' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Nueva Contraseña"
            rules={[{ required: true, message: 'Introduce la nueva contraseña' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirmar Nueva Contraseña"
            rules={[{ required: true, message: 'Confirma la nueva contraseña' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Cambiar Contraseña
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CambiarContrasena;
