import { orderService } from "../stateMachine/orderMachine";

export const getOrderState = () => {
  return orderService.getSnapshot().value;
};

export const transitionOrderState = (event: string) => {
  orderService.send(event);
  return orderService.getSnapshot().value;
};
