import { Context } from 'koa';
import { orderService } from '../stateMachine/orderMachine';

export const getOrderState = (ctx: Context) => {
    ctx.body = { state: orderService.state.value };
};

export const transitionOrderState = (ctx: Context) => {
    const { event } = ctx.request.body as { event: string };

    // Validate the event
    const validEvents = ['CONFIRM', 'SHIP', 'DELIVER', 'CANCEL'];
    if (!event || !validEvents.includes(event)) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid event' };
        return;
    }

    // Send the event to the state machine
    orderService.send(event);
    ctx.body = { state: orderService.state.value };
};