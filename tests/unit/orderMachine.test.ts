import { orderMachine } from '../../src/stateMachine/orderMachine';

describe('Order State Machine', () => {
    it('should start in the "created" state', () => {
        expect(orderMachine.initialState.value).toBe('created');
    });

    it('should transition to "confirmed" on CONFIRM event', () => {
        const nextState = orderMachine.transition('created', 'CONFIRM');
        expect(nextState.value).toBe('confirmed');
    });

    it('should transition to "shipped" on SHIP event', () => {
        const nextState = orderMachine.transition('confirmed', 'SHIP');
        expect(nextState.value).toBe('shipped');
    });
});