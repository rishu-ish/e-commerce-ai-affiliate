import { connectToDB } from "@lib/db/connect";
import { Product } from "@lib/db/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDB();

        const products = await Product.find({})
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            products,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const body = await req.json();

        // Validate required fields
        if (!body.title || !body.price || !body.affiliateLink) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const newProduct = await Product.create(body);
        return NextResponse.json({
            success: true,
            product: newProduct
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { success: false, message: "Failed to add product" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Missing product ID' },
                { status: 400 }
            );
        }

        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete product' },
            { status: 500 }
        );
    }
}
