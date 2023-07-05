import axios from 'axios';
import queryString from 'query-string';
import { PublicUserInterface, PublicUserGetQueryInterface } from 'interfaces/public-user';
import { GetQueryInterface } from '../../interfaces';

export const getPublicUsers = async (query?: PublicUserGetQueryInterface) => {
  const response = await axios.get(`/api/public-users${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPublicUser = async (publicUser: PublicUserInterface) => {
  const response = await axios.post('/api/public-users', publicUser);
  return response.data;
};

export const updatePublicUserById = async (id: string, publicUser: PublicUserInterface) => {
  const response = await axios.put(`/api/public-users/${id}`, publicUser);
  return response.data;
};

export const getPublicUserById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/public-users/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePublicUserById = async (id: string) => {
  const response = await axios.delete(`/api/public-users/${id}`);
  return response.data;
};
