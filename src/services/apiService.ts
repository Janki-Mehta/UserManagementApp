import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getUsers(limit: number = 10, skip: number = 0) {
    try {
      const response = await this.axiosInstance.get('/users', {
        params: {
          limit,
          skip,
        },
      });
      return {
        data: response.data.users,
        total: response.data.total,
        limit: response.data.limit,
        skip: response.data.skip,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.response) {
      // Server responded with error status
      return new Error(
        error.response.data?.message || 'An error occurred while fetching data'
      );
    } else if (error.request) {
      // Request made but no response
      return new Error('No response from server. Please check your connection.');
    } else {
      // Error in request setup
      return new Error('Error setting up the request');
    }
  }
}

export default new ApiService();
