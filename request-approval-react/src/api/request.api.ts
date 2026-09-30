
import { api } from './axios';
import type { CreateRequest,RequestItem } from '../models/request.types';


export async function getRequests(): Promise<RequestItem[]> {
  const response = await api.get<RequestItem[]>('/requests');

  return response.data;
}

export async function createRequest(
  request: CreateRequest
): Promise<RequestItem> {
  const response = await api.post<RequestItem>(
    '/requests',
    request
  );

  return response.data;
}

export async function approveRequest(
  id: string
): Promise<void> {
  await api.post(`/requests/${id}/approve`);
}

export async function rejectRequest(
  id: string
): Promise<void> {
  await api.post(`/requests/${id}/reject`);
}