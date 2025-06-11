# 🛠️ Proyecto React - Panel de Administración

Este es un proyecto frontend desarrollado en **React + Vite** utilizando **Ant Design**, pensado como parte de un TFC para ASIR. Incluye autenticación, rutas privadas, diseño responsive y componentes simulados.

---

## 🚀 Instrucciones para ejecutar

1. Clona o descarga el proyecto.
2. Abre terminal en la carpeta raíz.
3. Ejecuta:

```bash
npm install
npm run dev
```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 📁 Estructura del proyecto

```
mi-app/
├── public/
│   └── index.html         ← punto de entrada HTML
├── src/
│   ├── pages/             ← LoginPage, Dashboard, UsuariosPage, etc.
│   ├── routes/            ← PrivateRoute
│   ├── context/           ← AuthContext (estado global)
│   ├── services/          ← authService simulado (Cognito listo)
│   ├── App.jsx            ← configuración de rutas
│   └── main.jsx           ← punto de entrada React
├── package.json
└── README.md              ← este archivo
```

---

## 🔐 Autenticación

El login simula la autenticación con `authService.js`. Puedes conectarlo a AWS Cognito fácilmente cambiando las claves del pool:

```js
const poolData = {
  UserPoolId: "tu-user-pool-id",
  ClientId: "tu-app-client-id"
};
```

---

## ✨ Tecnologías usadas

- React 19
- Vite
- Ant Design 5
- React Router DOM v7
- Amazon Cognito Identity JS
- Context API

---

## 👤 Autor

Este proyecto ha sido desarrollado para el Trabajo de Fin de Ciclo ASIR.
