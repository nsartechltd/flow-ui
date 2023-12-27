import {
  CognitoUserPool,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';

let userPool: CognitoUserPool;

const CreateUserPool = (): CognitoUserPool => {
  const poolData: ICognitoUserPoolData = {
    UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
  };

  if (!userPool) {
    userPool = new CognitoUserPool(poolData);
  }

  return userPool;
};

export default CreateUserPool;
