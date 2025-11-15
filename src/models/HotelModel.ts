import { RoleModel } from './RoleModels';

export interface HotelModel {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    address: string;
    city: string;
    country: string;
    lat: string;
    lng: string;
    status: string;
}

export interface HotelResponseData {
    id: string,
    created_at: string;
    name: string;
    address: number;
    city: RoleModel;
    status: string;
}

export interface HotelResponse {
    code: number;
    status: string;
    message: string;
    data: HotelResponseData | null;
}