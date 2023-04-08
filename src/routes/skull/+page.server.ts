import { pb } from "$lib/pocketbase";
import { error } from "@sveltejs/kit";

export async function load(){
    let users = await pb.collection('users').getFullList();
    let userList = users.map((user) => {
        return {
            id: user.id,
            username: user.username
        }
    })
    return {
        users: userList
    }
}