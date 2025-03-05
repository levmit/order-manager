import { Context } from "koa";
import {
  orderService,
  initializeOrderState,
} from "../stateMachine/orderMachine";
import { Order } from "../models/Order";

// Initialize the order state on startup
initializeOrderState();

export const getOrderState = async (ctx: Context) => {
  const order = await Order.findOne();
  ctx.body = { state: order?.state || "created" };
};

export const transitionOrderState = async (ctx: Context) => {
  const { event } = ctx.request.body as { event: string };

  // Validate the event
  const validEvents = ["CONFIRM", "SHIP", "DELIVER", "CANCEL"];
  if (!event || !validEvents.includes(event)) {
    ctx.status = 400;
    ctx.body = { error: "Invalid event" };
    return;
  }

  // Send the event to the state machine
  orderService.send(event);
  const order = await Order.findOne();
  ctx.body = { state: order?.state || "created" };
};
