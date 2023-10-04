export interface IUser {
    authId: string;
    wallet?: number;
}

export interface IBooking {
    bookingId: string;
    authId: string;
    trainerId: string;
    service: string;
    mode: string;
    fee: number;
    date: Date;
    time: Date;
}
