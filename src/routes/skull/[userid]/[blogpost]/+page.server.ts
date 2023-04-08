// ! kinda shit ngl

import { pb } from '$lib/pocketbase';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const { userid, blogpost } = params;
    const blogList = await pb.collection('blogposts').getFullList({
        filter: "author = '"+ userid + "'"
    });
    if (blogList.length === 0) throw error(404, 'User doead not exist')

    const blog = blogList.find((blog) => blog.name === blogpost);
    if (!blog) throw error(404, 'Blogpost not found');

    const json = JSON.parse(JSON.stringify(blog));
    return {
        name: json.name,
        content: json.blogpost,
    }
}
