import { dbconnect } from "@/lib/config/db";
import Product from "@/lib/models/productModel";
import {  NextResponse } from "next/server";

const LoadDb = async () => {
    await dbconnect();
}

LoadDb();

export async function GET(req) {
    const result = await Product.find({});
    return NextResponse.json({result:result})
}

export async function POST(req){
    const body = await req.json();
    const {name,quantity,price,totalPrice} = body;

    await Product.create({name,quantity,price,totalPrice});
    return NextResponse.json({msg:"Product Added Successfully...."})
   
}

export async function PUT(req) {
    const body = await req.json();
    const {name,quantity,price,totalPrice} = body;
    const id = await req.nextUrl.searchParams.get('id');
    await Product.findByIdAndUpdate(id,{
        $set:{
            name:name,
            quantity,quantity,
            price:price,
            totalPrice:totalPrice
        }
    })
    return NextResponse.json({msg: "Product Updated Successfully..."});
}