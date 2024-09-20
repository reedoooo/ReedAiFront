import axios from 'axios';
import { apiUtils } from '@/lib/apiUtils';

export const staticDataApi = {
  getProfileImage: async imgWithExt => {
    try {
      const response = await apiUtils.get(
        `http://localhost:3001/api/chat/files/images/${imgWithExt}`,
        {
          responseType: 'blob', // Ensure the response is treated as a file (binary data)
        }
      );

      if (response) {
        return URL.createObjectURL(response);
      } else {
        console.log('Response:', response);
        return URL.createObjectURL(
          'http://localhost:3001/api/chat/files/images/avatar5.png'
        );
      }
    } catch (error) {
      console.error(`Error fetching profile image: ${error}`);
      throw error;
    }
  },
  // getStaticData: {
  //   url: '/api/staticData',
  //   method: 'get',
  // },
  // // 获取��态数据
  // getStaticDataById: {
  //   url: '/api/staticData',
  //   method: 'get',
  // },
  // // 新增��态数据
  // addStaticData: {
  //   url: '/api/staticData',
  //   method: 'post',
  // },
  // // 修改��态数据
  // updateStaticData: {
  //   url: '/api/staticData',
  //   method: 'put',
  // },
  // // 删除��态数据
  // deleteStaticData: {
  //   url: '/api/staticData',
  //   method: 'delete',
  // },
};

export default staticDataApi;
