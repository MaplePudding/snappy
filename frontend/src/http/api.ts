import RequestInstance from './http';
import {
  allUsersRoute,
  loginRoute,
  recieveMessageRoute,
  registerRoute,
  sendMessageRoute,
  setAvatarRoute,
} from '../utils/APIRoutes';

export interface UserInfo {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAvatarImageSet: boolean;
  avatarImage: string;
}

export interface LoginResponse {
  status: boolean;
  user?: UserInfo;
  msg?: string;
}

export interface RegisterResponse {
  status: boolean;
  msg?: string;
  user?: UserInfo;
}

export interface Msg {
  fromSelf: boolean;
  message: string;
}

export const apiLogin = async (data: {
  username: string;
  password: string;
}) => {
  const res = await RequestInstance.request<LoginResponse>({
    url: `${loginRoute}`,
    method: 'POST',
    data,
  });
  return res;
};

export const apiRegister = async (data: {
  username: string;
  password: string;
  email: string;
}) => {
  const res = await RequestInstance.request<RegisterResponse>({
    url: `${registerRoute}`,
    method: 'POST',
    data,
  });
  return res;
};

export const apiGetAllUser = async (userId: string) => {
  const res = await RequestInstance.request<Array<UserInfo>[]>({
    url: `${allUsersRoute}/${userId}`,
    method: 'GET',
  });
  return res;
};

export const apiGetAvatar = async (id: string) => {
  const res = await RequestInstance.request<any>({
    url: `https://api.multiavatar.com/4645646/${id}`,
    method: 'GET',
  });
  return res;
};

export const apiSetAvatar = async (data: { userId: string; image: string }) => {
  const res = await RequestInstance.request<any>({
    url: `${setAvatarRoute}/${data.userId}`,
    method: 'POST',
    data: {
      image: data.image,
    },
  });
  return res;
};

export const apiGetMsg = async (data: { from: string; to: string }) => {
  const res = await RequestInstance.request<Array<Msg>[]>({
    url: `${recieveMessageRoute}`,
    data,
    method: 'POST',
  });
  return res;
};

export const apiAddMsg = async (data: {
  from: string;
  message: string;
  to: string;
}) => {
  const res = await RequestInstance.request<{ msg: string }>({
    url: `${sendMessageRoute}`,
    data,
    method: 'POST',
  });
  return res;
};
