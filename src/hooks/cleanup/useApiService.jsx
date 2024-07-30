import { create } from 'lodash';
import constants from 'config/constants';

const { API_URL } = constants;
const useApiService = create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default useApiService;
