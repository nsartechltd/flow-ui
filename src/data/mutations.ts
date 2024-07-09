import { CreateUserData, CreateUserResponse } from './types';
import { apiUrls } from '@utils/urls';

import axios from 'axios';

const fetchers = {
  // Users
  CREATE_USER: (data: CreateUserData): Promise<CreateUserResponse> =>
    axios({
      url: `${import.meta.env.VITE_FLOW_API_URL}/${apiUrls.createUser}`,
      method: 'POST',
      data,
    }),
};

export const mutations = {
  // Users
  CREATE_USER: {
    mutationFn: (data: CreateUserData) => fetchers.CREATE_USER(data),
  },
};
