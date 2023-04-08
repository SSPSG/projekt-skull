import { pb } from "$lib/pocketbase";
import { error } from "@sveltejs/kit";

export async function load({ params }){
    const blogList = await pb.collection('blogposts').getFullList({
        filter: "author = '"+ params.userid + "'"
    });

    let user = await pb.collection('users').getOne(params.userid);
    if (!user) throw error(404, 'User does not exist');

    let blogs = blogList.map((blog) => {
        return {
            name: blog.name,
            content: blog.blogpost.split('</p>')[0],
            author: blog.author
        }
    })
    return {
        username: user.username,
        blogs: blogs
    }
}