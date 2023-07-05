import axios from 'axios';
import queryString from 'query-string';
import { EnvironmentalAnalystInterface, EnvironmentalAnalystGetQueryInterface } from 'interfaces/environmental-analyst';
import { GetQueryInterface } from '../../interfaces';

export const getEnvironmentalAnalysts = async (query?: EnvironmentalAnalystGetQueryInterface) => {
  const response = await axios.get(`/api/environmental-analysts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEnvironmentalAnalyst = async (environmentalAnalyst: EnvironmentalAnalystInterface) => {
  const response = await axios.post('/api/environmental-analysts', environmentalAnalyst);
  return response.data;
};

export const updateEnvironmentalAnalystById = async (
  id: string,
  environmentalAnalyst: EnvironmentalAnalystInterface,
) => {
  const response = await axios.put(`/api/environmental-analysts/${id}`, environmentalAnalyst);
  return response.data;
};

export const getEnvironmentalAnalystById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/environmental-analysts/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteEnvironmentalAnalystById = async (id: string) => {
  const response = await axios.delete(`/api/environmental-analysts/${id}`);
  return response.data;
};
