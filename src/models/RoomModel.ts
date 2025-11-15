export interface RoomModel {
    id: string;
    created_at: string;
    updated_at: string;
    room_number: number;
    type: string;
    price_per_night: number;
    status: string;
    name: string;
    description: string;
    max_users: number;
    num_beds: number;
    hotel_id: number;
}

export interface RoomResponseData {
    id: string,
    created_at: string;
    name: string;
    room_number: number;
    type: string;
    hotel: RoomModel;
    status: string;
}

export interface RoomResponse {
    code: number;
    status: string;
    message: string;
    data: RoomResponseData | null;
}