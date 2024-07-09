import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
    const { id } = params
    await connectMongoDB()
    const post = await Post.findOne({ _id: id })
    return NextResponse.json({ post }, { status: 200 })
}

// export async function PUT(req, { params }) {
//     const { id } = params
//     const { newTitle: title, newImg: img, newContent: content } = await req.json()
//     await connectMongoDB()
//     await Post.findByIdAndUpdate(id, { title, img, content })
//     return NextResponse.json({ message: "Post Updated" }, { status: 200 })

// }


export async function PUT(req, { params }) {
    const { id } = params;
    const { title, img, content } = await req.json();

    await connectMongoDB();

    // Fetch the current user data
    const currentPost = await Post.findById(id);

    // Update only the provided fields
    currentPost.title = title || currentPost.title;
    currentPost.img = img || currentPost.img;
    currentPost.content = content || currentPost.content;

    await currentPost.save();

    return NextResponse.json({ message: "Post Updated" }, { status: 200 });
}



