// src/services/authService.js
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

import { USER_POOL_ID, CLIENT_ID } from '../awsConfig.js';

const userPool = new CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
});

const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const token = result.getIdToken().getJwtToken();

        // ✅ Extraemos el payload del token
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload['custom:role'] || 'usuario';

        // ✅ Guardamos en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        resolve({ success: true, token, role });
      },
      onFailure: (err) => {
        console.error('Login error:', err);
        reject(err);
      },
    });
  });
};

export default { login };
