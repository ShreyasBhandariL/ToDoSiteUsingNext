import Link from "next/link";
import Image from "next/image";
import Hamburger from "../public/image.png"
import { useState } from "react";

export default function Navbar(){
    const [nav,setNav] = useState(false);
    return(
        <>
        <div className="flex py-3 flex-wrap justify-around mainPage">
            <h1 className="text-lg font-semibold">Todo App</h1>
            <ul className="flex gap-[40px] text-m navWeb">
                <li>Home</li>
                <li><Link href="/Products">Products</Link> </li>
            </ul>
            <Image src={Hamburger} className="w-[5%] h-[5%] navMobile" onClick={() => nav === true ? setNav(false) : setNav(true)} alt="hamburger"/>
        </div>
        {nav && (
                <ul className="gap-[10px] grid text-right text-white bg-orange-600 w-[25%] px-2 py-2 ml-[70%] absolute justify-end">
                <li>Home</li>
                <li><Link href="/Products">Products</Link> </li>
            </ul>
            )}
        </>
    )
} 
