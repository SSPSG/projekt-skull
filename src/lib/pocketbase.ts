import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

let DB_HOST = import.meta.env.VITE_DB_HOST;

export const pb = new PocketBase(DB_HOST);

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => {
    currentUser.set(pb.authStore.model);
})