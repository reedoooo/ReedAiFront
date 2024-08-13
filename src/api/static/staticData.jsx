import { apiUtils } from '@/lib/apiUtils';

export const staticDataApi = {
  getProfileImage: async imgWithExt => {
    try {
      const data = await apiUtils.get(
        `http://localhost:3001/static/files/${imgWithExt}`
      );
      return data;
    } catch (error) {
      console.error('Error fetching chat presets:', error);
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
