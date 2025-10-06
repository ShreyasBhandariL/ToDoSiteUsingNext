"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { FaHome } from 'react-icons/fa';
import Link from "next/link";

export default function Prodcuts() {
    const [flag, setFlag] = useState(0);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        quantity: 0,
        price: 0,
        totalPrice: 0,
    })
    const [updateData, setUpdateData] = useState({name: "",
        quantity: 0,
        price: 0,
        totalPrice: 0,
    });

    useEffect(() => {
            const name = "totalPrice";
            if (flag === 2) {
                const TotalPrice = updateData.price * updateData.quantity;
                setUpdateData(form => ({ ...form, [name]: TotalPrice }))
            } else {
                if (formData.price !== 0 && formData.quantity !== 0) {
                const TotalPrice = formData.price * formData.quantity;
                setFormData(form => ({ ...form, [name]: TotalPrice }))
                }
            }
        if (flag === 0) {
            displayProduct();
        }
    }, [flag,formData.quantity,formData.price,updateData.price,updateData.quantity]);

    const onDataHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (flag === 2) {
            setUpdateData(form => ({ ...form, [name]: value }))
        }else{
            setFormData(form => ({ ...form, [name]: value }))
        }
    }

    const addProduct = (e) => {
        setFlag(1);
    }

    const displayProduct = async () => {
        setFlag(0);
        const response = await axios("http://localhost:3001/api/data");
        setProducts(response.data.result);
    }

    const handleUpdate = async (index) => {
        setFlag(2);
        const response = await axios("http://localhost:3001/api/data");
        setUpdateData({
            name: response.data.result[index].name,
            quantity: response.data.result[index].quantity,
            price: response.data.result[index].price,
            totalPrice: response.data.result[index].totalPrice,
            id:response.data.result[index]._id,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:3001/api/data", formData)
        toast(response.data.msg);
        setFormData({
            name: "",
            quantity: 0,
            price: 0,
            totalPrice: 0,
        })
    }

    const addUpdateData = async (e) => {
        e.preventDefault();
        const id = e.target.name;
        const response = await axios.put("http://localhost:3001/api/data",updateData,{
            params:{
                id:id
            }
        });
        toast(response.data.msg);
        displayProduct();
    }

    return (<><ToastContainer />
        <div className="flex justify-around py-5 align-center text-center m-auto w-[70%]">
            <h1 className="flex justify-start text-lg font-semibold">Products</h1>
            <Link href={'/'}><FaHome size={24} className="text-orange-500" /></Link>
            <ul className="text-sm flex gap-10 cursor-pointer list-style-none">
                <li onClick={addProduct}>Add Product</li>
                <li onClick={displayProduct}>Display Product</li>
            </ul>

            {flag === 1 && (<div className="absolute top-50 border-1 p-10 rounded w-100">
                <label className="flex mb-[20px] font-semibold text-lg">Add Product</label>
                <form className="flex flex-col gap-5">
                    <input type="text" name="name" placeholder="Product Name" value={formData.name} required onChange={onDataHandler} className="border-1 px-2 text-sm py-1" />
                    <input type="number" name="quantity" placeholder="Product Quantity" value={formData.quantity} required onChange={onDataHandler} className="border-1 px-2 text-sm py-1" />
                    <input type="number" name="price" placeholder="Price of 1 prod" required value={formData.price} onChange={onDataHandler} className="border-1 px-2 text-sm py-1" />
                    <input type="number" name="totalPrice" placeholder="Total price" disabled value={formData.totalPrice} onChange={onDataHandler} className="border-1 px-2 text-sm py-1" />
                    <button type="submit" className="flex justify-end bg-green-600 text-white w-[fit-content] px-4 py-1 cursor-pointer" onClick={handleSubmit}>Add</button>
                </form>
            </div>)}


            {flag === 0 && (<>
                <div className="absolute overflow-x-auto w-[50%] mt-24 mx-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Price
                                </th>
                                <th scope="col" className="px-6 py-3">ACtion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((data, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {data.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.price}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {data.totalPrice}
                                    </td>
                                    <td className="px-6 py-4 text-green-500 cursor-pointer font-semibold" onClick={() => handleUpdate(index)}>
                                        Update
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>)}

            {flag === 2 && (<div className="absolute top-50 border-1 p-10 rounded w-100">
                <label className="flex mb-[20px] font-semibold text-lg">Update Product</label>
                <form className="flex flex-col gap-5">
                    <input type="text" name="name" value={updateData.name} onChange={onDataHandler} className="border-1 px-2 text-sm py-1" />
                    <input type="number" name="quantity" value={updateData.quantity} onChange={onDataHandler} className="border-1 px-2 text-sm py-1" />
                    <input type="number" name="price" value={updateData.price} onChange={onDataHandler} className="border-1 px-2 text-sm py-1" />
                    <input type="number" name="totalPrice" disabled value={updateData.totalPrice} onChange={onDataHandler} className="border-1 px-2 text-sm py-1" />
                    <button className="flex justify-end bg-green-600 text-white w-[fit-content] px-4 py-1 cursor-pointer" name={updateData.id} onClick={addUpdateData}>Update</button>
                </form>
            </div>)}


        </div></>)
}