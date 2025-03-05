import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document {
  state: string;
}

const OrderSchema = new Schema<IOrder>({
  state: { type: String, required: true, default: "created" },
});

export const Order = model<IOrder>("Order", OrderSchema);
