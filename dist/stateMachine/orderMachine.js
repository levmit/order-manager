"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = exports.orderMachine = void 0;
const xstate_1 = require("xstate");
exports.orderMachine = (0, xstate_1.createMachine)({
    predictableActionArguments: true,
    id: 'order',
    initial: 'created',
    states: {
        created: {
            on: { CONFIRM: 'confirmed' },
        },
        confirmed: {
            on: { SHIP: 'shipped', CANCEL: 'cancelled' },
        },
        shipped: {
            on: { DELIVER: 'delivered' },
        },
        delivered: {},
        cancelled: {},
    },
});
exports.orderService = (0, xstate_1.interpret)(exports.orderMachine).start();
