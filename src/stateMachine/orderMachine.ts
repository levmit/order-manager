import { createMachine, interpret } from "xstate";
import { Order } from "../models/Order";

export const orderMachine = createMachine({
  predictableActionArguments: true,
  id: "order",
  initial: "created",
  states: {
    created: {
      on: { CONFIRM: "confirmed" },
    },
    confirmed: {
      on: { SHIP: "shipped", CANCEL: "cancelled" },
    },
    shipped: {
      on: { DELIVER: "delivered" },
    },
    delivered: {},
    cancelled: {},
  },
});

export const orderService = interpret(orderMachine).onTransition(
  async (state) => {
    // Save the current state to MongoDB
    const order = await Order.findOneAndUpdate(
      {}, // Find the first order (or create one if none exists)
      { state: state.value },
      { upsert: true, new: true }
    );
    console.log("Order state saved to MongoDB:", order);
  }
);

// Load the initial state from MongoDB
export const initializeOrderState = async () => {
  const order = await Order.findOne();
  if (order) {
    orderService.start(order.state); // Start the state machine with the saved state
  } else {
    orderService.start(); // Start with the initial state
  }
};
