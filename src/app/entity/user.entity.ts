export interface IUser {
    authId: string;
    wallet?: number;
}

export interface IBooking {
    service: string;
    mode: string;
    fee: number;
    date: Date;
    time: Date;
}
