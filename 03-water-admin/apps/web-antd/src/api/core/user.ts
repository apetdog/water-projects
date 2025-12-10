import type { UserInfo } from '@vben/types';
import { userInfo } from '#/mock/user-data';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return Promise.resolve<UserInfo>(userInfo as unknown as UserInfo);
}
