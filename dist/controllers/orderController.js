"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transitionOrderState = exports.getOrderState = void 0;
const orderMachine_1 = require("../stateMachine/orderMachine");
const getOrderState = (ctx) => {
    ctx.body = { state: orderMachine_1.orderService.state.value };
};
exports.getOrderState = getOrderState;
const transitionOrderState = (ctx) => {
    const { event } = ctx.request.body;
    // Validate the event
    const validEvents = ['CONFIRM', 'SHIP', 'DELIVER', 'CANCEL'];
    if (!event || !validEvents.includes(event)) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid event' };
        return;
    }
    // Send the event to the state machine
    orderMachine_1.orderService.send(event);
    ctx.body = { state: orderMachine_1.orderService.state.value };
};
exports.transitionOrderState = transitionOrderState;
