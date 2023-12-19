import { writable } from 'svelte/store';

export const receiverReference = writable('-');
export const senderReference = writable('-');
export const letterDate = writable('dd/MM/YYYY');
export const receiverNameAddress = writable('-');
export const receiverTitle = writable('-');
export const letterSubject = writable('-');
export const letterBody = writable('-');
export const letterFooter = writable('-');
