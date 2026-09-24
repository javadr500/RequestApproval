export enum RequestStatus {
  Pending = 1,
  Approved = 2,
  Rejected = 3
}

export interface RequestItem {
  id: string;
  title: string;
  amount: number;
  description?: string;
  status: RequestStatus;
  createdByUserId: string;
  assignedRole: string;
  createdAt: string;
}

export interface CreateRequest {
  title: string;
  amount: number;
  description?: string;
}

