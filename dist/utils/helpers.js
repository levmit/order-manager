"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEvent = void 0;
const validateEvent = (event) => {
    const validEvents = ['CONFIRM', 'SHIP', 'DELIVER', 'CANCEL'];
    return validEvents.includes(event);
};
exports.validateEvent = validateEvent;
