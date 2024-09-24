import axios from 'axios';
import { TimelineResponse } from '../types';

const API_BASE_URL = 'https://dmsglobal.net/ct-api';
const API_TOKEN = '8U7dPDoiozxF26WNLAdJdo2S9KN7wwg58Dub0v9D';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchTimelinePosts = (page: number) =>
  axiosInstance.get<TimelineResponse>('/timeline', { params: { page } });

export const likePost = (postId: string) => {
  const formData = new FormData();
  formData.append('post_id', postId);
  return axiosInstance.post('/like', formData);
};

export const unlikePost = (postId: string) => {
  const formData = new FormData();
  formData.append('post_id', postId);
  return axiosInstance.post('/unlike', formData);
};
