
import { useAuth } from '../auth/AuthContext';
import { api } from './axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}






export async function login(
  request: LoginRequest
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    '/auth/login',
    request
  );

  return response.data;
}

export async function register(
  request: RegisterRequest
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    '/auth/register',
    request, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}



function jwtDecode<T>(token: string) {
  throw new Error('Function not implemented.');
}

