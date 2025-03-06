import { Context } from "koa";
import { Order } from "../models/Order";
import { orderService } from "../stateMachine/orderMachine";

// 1. Add a new Order
export const createOrder = async (ctx: Context) => {
  const { customerName, product, quantity } = ctx.request.body as {
    customerName: string;
    product: string;
    quantity: number;
  };

  if (!customerName || !product || !quantity) {
    ctx.status = 400;
    ctx.body = { error: "Missing required fields" };
    return;
  }

  const order = await Order.create({
    customerName,
    product,
    quantity,
    state: "created",
  });
  ctx.status = 201;
  ctx.body = order;
};

// 2. Get Order data by Order ID
export const getOrderById = async (ctx: Context) => {
  const { id } = ctx.params;
  const order = await Order.findById(id);

  if (!order) {
    ctx.status = 404;
    ctx.body = { error: "Order not found" };
    return;
  }

  ctx.body = order;
};

// 3. Update Order data by Order ID
export const updateOrderById = async (ctx: Context) => {
  const { id } = ctx.params;
  const { customerName, product, quantity, state } = ctx.request.body as {
    customerName?: string;
    product?: string;
    quantity?: number;
    state?: string;
  };

  const order = await Order.findByIdAndUpdate(
    id,
    { customerName, product, quantity, state },
    { new: true }
  );

  if (!order) {
    ctx.status = 404;
    ctx.body = { error: "Order not found" };
    return;
  }

  ctx.body = order;
};

// 4. Delete Order data by Order ID
export const deleteOrderById = async (ctx: Context) => {
  const { id } = ctx.params;
  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    ctx.status = 404;
    ctx.body = { error: "Order not found" };
    return;
  }

  ctx.status = 204;
};

// 5. Get list of all Orders with their data
export const getAllOrders = async (ctx: Context) => {
  const orders = await Order.find();
  ctx.body = orders;
};

// Transition Order State
export const transitionOrderState = async (ctx: Context) => {
  const { id } = ctx.params;
  const { event } = ctx.request.body as { event: string };

  const order = await Order.findById(id);
  if (!order) {
    ctx.status = 404;
    ctx.body = { error: "Order not found" };
    return;
  }

  // Validate the event
  const validEvents = ["CONFIRM", "SHIP", "DELIVER", "CANCEL"];
  if (!event || !validEvents.includes(event)) {
    ctx.status = 400;
    ctx.body = { error: "Invalid event" };
    return;
  }

  // Send the event to the state machine
  orderService.send(event);

  // Convert the state value to a string
  order.state = String(orderService.state.value);
  await order.save();

  ctx.body = order;
};
