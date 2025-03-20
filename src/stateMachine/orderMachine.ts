import { createMachine, interpret } from "xstate";

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

export const orderService = interpret(orderMachine)
  .onTransition((state) => {
    console.log(">>>>>>>>>> State transition:", state.value);
  })
  .start();
