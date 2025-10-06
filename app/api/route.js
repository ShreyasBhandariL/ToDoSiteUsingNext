import { dbconnect } from "@/lib/config/db";
import ToDo from "@/lib/models/todomodel";
import { NextResponse } from "next/server";

const LoadDb = async () => {
    await dbconnect();
}

LoadDb();

export async function GET(request) {
    const result = await ToDo.find({});
    return NextResponse.json({result:result});
}

export async function POST(request) {
    const {title,description} = await request.json();
    const result = await ToDo.create({
        title,
        description
    })
    return NextResponse.json({msg:"Data Added Successfully"})
}


export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get('id')
    await ToDo.findByIdAndDelete(id)
    return NextResponse.json({msg:"The Data Deleted Successfully"})
}

export async function PUT(request) {
    const id = await request.nextUrl.searchParams.get('id')
    await ToDo.findByIdAndUpdate(id,{
        $set:{
            isComplete:true,
        }
    })
    return NextResponse.json({msg:"The Data Updated Successfully"})
}   