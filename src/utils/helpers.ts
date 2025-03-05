export const validateEvent = (event: string): boolean => {
    const validEvents = ['CONFIRM', 'SHIP', 'DELIVER', 'CANCEL'];
    return validEvents.includes(event);
};