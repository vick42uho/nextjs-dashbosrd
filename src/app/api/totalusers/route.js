import { NextResponse } from 'next/server'
import User from '../../../../models/user'
import { connectMongoDB } from '../../../../lib/mongodb'

export async function GET() {
    await connectMongoDB();
    const totalUsers = await User.find();
    return NextResponse.json({ totalUsers });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
}