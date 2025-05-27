"use client";
import {useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface message {
  id: number,
  title: string,
  price: number,
  lastUpdated: string
}

export default function Home() {
  const [search,setSearch] = useState("");
  const [messages, setMessages] = useState<message[]>([]);
  const [filtered, setFiltered] = useState<message[]>([]);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
      setSearch(e.target.value);
  }

  const handleClick = () => {
    console.log(search);
    setFiltered(
      messages.filter((msg)=>
      msg.title.toLowerCase().includes(search.toLowerCase()))
    );
    console.log(filtered);
  }
  const router = useRouter();

  const handleClick1 = () => {
    router.push("/heatmap");
  }

  useEffect(() =>{
    async function fetchPosts(){
      try{
        console.log("Fetching posts...");
        const response = await fetch("/api/posts");
        console.log(response);
        if(!response.ok){
          throw new Error("Failed to fetch data");
        }else{
          const data: message[] = await response.json();;
          setMessages(data);
          setFiltered(data);
        }
      }catch(error){
        console.log(error);
      }
    }

    fetchPosts();
  },[]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center bg-white justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-row items-center gap-3">
      <input type="text" placeholder="Search..." onChange={handleChange} className="h-10 text-black w-[500px] px-4 border-2 border-black rounded-xl"></input>
      <button onClick={handleClick} className="bg-green-500 text-white h-[30px] w-[100px] rounded-xl hover:cursor-pointer bg-green-300">search</button>
      <button onClick={handleClick1} className="bg-red-500 text-white h-[30px] w-[100px] rounded-xl hover:cursor-pointer bg-green-300">HeatMap</button>
      </div>

      <div className="flex flex-row gap-4 text-black flex-wrap justify-center items-center w-full max-w-9xl">
      {filtered.length > 0 ? (
          filtered.map((message) => (
            <div key={message.id} className="flex flex-col gap-2 border-2 border-black rounded-xl p-4 shadow-md">
              <h1 className="text-black text-2xl font-bold">{message.title}</h1>
              <p className="text-black text-lg">{message.title}</p>
              <span className="text-gray-500">User ID: {message.price}</span>
              <p className="text-black text-lg">{message.lastUpdated}</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col text-black gap-2">
            <h1>Nope</h1>
          </div>
        )}  
      </div>
    </div>
  );
}
