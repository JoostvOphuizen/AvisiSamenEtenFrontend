import axios from 'axios';

export async function get(endpoint: string): Promise<any> {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error('Failed to make GET request');
  }
}


export async function post(endpoint: string, data: any): Promise<any> {
  try {
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to make POST request');
  }
}

export async function postWithoutBody(endpoint: string): Promise<any> {
  try {
    const response = await axios.post(endpoint);
    return response.data;
  } catch (error) {
    throw new Error('Failed to make POST request');
  }
}