export interface UserModel {
    id: string;
    username: string;
    email: string;
    password: string;
    role_id: number;
}

export interface UserResponseData {
    id: number;
    username: string;
    email: string;
    role_id: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserResponse {
    code: number;
    status: string;
    message: string;
    data: UserResponseData | null;
}