"use client"
import Navbar from "@/Components/navbar";
import Todo from "@/Components/Todo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "./globals.css"

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [])

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({ ...form, [name]: value }));

  }

  const fetchData = async () => {
    const response = await fetch("https://todosaver.netlify.app/api");
    await response.json();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://todosaver.netlify.app/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setFormData({
        title: "",
        description: ""
      })
      toast(result.msg)
    } catch (error) {
      console.error("Error :", error)
    } finally {
      router.refresh();
    }
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <form className="flex items-start flex-col gap-2 w-[20%] max-w-[600px] pt-24 mx-auto todoform">
        <input type="text" name="title" placeholder="Title" className="border-1 px-3 py-2 text-sm w-full" value={formData.title} onChange={onChangeHandler} required />
        <textarea type="text" name="description" placeholder="Description" rows={3} className="border-1 px-3 py-2 text-sm w-full" value={formData.description} onChange={onChangeHandler} required />
        <button type="submit" className="bg-orange-600 px-5 py-2 text-white cursor-pointer" onClick={handleSubmit}>Submit</button>
      </form>

      <div className="relative overflow-x-auto w-[50%] mt-24 mx-auto todocard">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <Todo toast={toast} />
          </tbody>
        </table>
      </div>

    </>
  );
}
