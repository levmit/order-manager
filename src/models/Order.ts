import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document {
  customerName: string;
  product: string;
  quantity: number;
  state: string;
}

const OrderSchema = new Schema<IOrder>({
  customerName: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  state: { type: String, required: true, default: "created" },
});

export const Order = model<IOrder>("Order", OrderSchema);
