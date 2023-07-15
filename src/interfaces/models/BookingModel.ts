import { Document, Schema, Model, model } from "mongoose";

export interface IBooking extends Document {
    bookingId: string;
    userId: Schema.Types.ObjectId;
    trainerId: Schema.Types.ObjectId;
    service: string;
    mode: string;
    fee: number;
    date: Date;
    time: Date;
}

const bookingSchema = new Schema<IBooking>({
    bookingId: { type: String, require: true },
    userId: { type: Schema.Types.ObjectId, ref: "Auth" },
    trainerId: { type: Schema.Types.ObjectId, ref: "Trainer"},
    service: { type: String, require: true },
    mode: { type: String, require: true },
    fee: { type: Number, require: true },
    date: { type: Date, require: true },
    time: { type: Date, require: true },
}, { timestamps: true });

const BookingModel: Model<IBooking> = model<IBooking>("Booking",bookingSchema);

export default BookingModel;