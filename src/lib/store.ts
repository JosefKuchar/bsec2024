import { writable } from 'svelte/store';
import { getTodayFormatted } from '$lib/utils.ts';

export const selectedDate = writable(getTodayFormatted());