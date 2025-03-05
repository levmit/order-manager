"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transitionOrderState = exports.getOrderState = void 0;
const orderMachine_1 = require("../stateMachine/orderMachine");
const getOrderState = () => {
    return orderMachine_1.orderService.state.value;
};
exports.getOrderState = getOrderState;
const transitionOrderState = (event) => {
    orderMachine_1.orderService.send(event);
    return orderMachine_1.orderService.state.value;
};
exports.transitionOrderState = transitionOrderState;
