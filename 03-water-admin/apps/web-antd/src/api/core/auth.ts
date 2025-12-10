import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

import { token } from '#/mock/user-data';

/**
 * 登录
 */
export async function loginApi(_data: AuthApi.LoginParams) {
  return Promise.resolve<AuthApi.LoginResult>({ accessToken: token });
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return Promise.resolve<AuthApi.RefreshTokenResult>({
    data: token,
    status: 0,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return Promise.resolve({});
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return Promise.resolve<string[]>([]);
}
