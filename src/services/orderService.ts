import { orderService } from '../stateMachine/orderMachine';

export const getOrderState = () => {
    return orderService.state.value;
};

export const transitionOrderState = (event: string) => {
    orderService.send(event);
    return orderService.state.value;
};