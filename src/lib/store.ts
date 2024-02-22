import { writable } from 'svelte/store';
import { getTodayFormatted } from '$lib/utils';

export const selectedDate = writable(getTodayFormatted());