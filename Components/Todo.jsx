// "use client"
import axios from "axios";
import { useEffect, useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';

export default function Todo({toast}) {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`);
        let result = await response.json();
        setData(result);
    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleDelete = async (id) => {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api`,{
            params:{
                id:id,
            }
        });
        toast.error(response.data.msg);
        fetchData();
    }

    const handleComplete = async (id) => {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api`,{},{
            params:{
                id:id,
            }
        });
        toast(response.data.msg);
        fetchData();
    }


    return (
        <>
            {data?.result?.map((data, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {index + 1}
                    </th>
                    <td className="px-6 py-4">
                        {data.title}
                    </td>
                    <td className="px-6 py-4">
                        {data.description}
                    </td>
                    <td className="px-6 py-4">
                        {!data.isComplete ? "Pending" : "Completed"}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                        <button className="bg-red-500 px-4 py-1 text-white cursor-pointer" onClick={() => handleDelete(data._id)}>Delete</button>
                        <button className="bg-green-500 px-4 py-1 text-white cursor-pointer" onClick={() => handleComplete(data._id)}>Complete</button>
                    </td>
                </tr>
            )
            )}
        </>
    )
}