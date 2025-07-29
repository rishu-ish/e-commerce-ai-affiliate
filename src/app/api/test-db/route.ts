import { connectToDB } from "@lib/db/connect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();
        return NextResponse.json({ success: true, message: "MongoDB connected ✅" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "MongoDB connection failed ❌", error });
    }
}
