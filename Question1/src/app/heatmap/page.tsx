"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface message {
    id: number,
    title: string,
    price: number,
    lastUpdated: string
}

export default function HeatmapPage() {
      const [messages, setMessages] = useState<message[]>([]);
      const [filtered, setFiltered] = useState<message[]>([]);

        const router = useRouter();
      
        const handleClick1 = () => {
          router.push("/");
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

      const calculateAveragePrice = (data: message[]) => {
        if (data.length === 0) return 0;
        const total = data.reduce((sum, item) => sum + item.price, 0);
        return total / data.length;
        };
        const nvidiaAverage = calculateAveragePrice(messages.filter(msg => msg.title.includes("Nvidia")));  
        const alphabetAverage = calculateAveragePrice(messages.filter(msg => msg.title.includes("Alphabet")));
        const amazonAverage = calculateAveragePrice(messages.filter(msg => msg.title.includes("Amazon")));
        console.log("Nvidia Average:", nvidiaAverage);
        console.log("Alphabet Average:", alphabetAverage);
        console.log("Amazon Average:", amazonAverage);
        const heatMapData = [
            ...messages.filter(msg => msg.title.includes("Nvidia")).map(msg => ({ ...msg, color: `hsl(${(msg.price / nvidiaAverage) * 120}, 100%, 50%)` })),
            ...messages.filter(msg => msg.title.includes("Alphabet")).map(msg => ({ ...msg, color: `hsl(${(msg.price / alphabetAverage) * 120}, 100%, 50%)` })),
            ...messages.filter(msg => msg.title.includes("Amazon")).map(msg => ({ ...msg, color: `hsl(${(msg.price / amazonAverage) * 120}, 100%, 50%)` }))
        ];

        const covariance = (data: message[]) => {
            if (data.length === 0) return 0;       
            const avgPrice = calculateAveragePrice(data);  
            const variance = data.reduce((sum, item) => sum + Math.pow(item.price - avgPrice, 2), 0) / data.length;
            return Math.sqrt(variance);
        };
        const nvidiaCovariance = covariance(messages.filter(msg => msg.title.includes("Nvidia")));
        const alphabetCovariance = covariance(messages.filter(msg => msg.title.includes("Alphabet")));
        const amazonCovariance = covariance(messages.filter(msg => msg.title.includes("Amazon")));
        console.log("Nvidia Covariance:", nvidiaCovariance);
        console.log("Alphabet Covariance:", alphabetCovariance);
        console.log("Amazon Covariance:", amazonCovariance);

        const standardDeviation = (data: message[]) => {
            if (data.length === 0) return 0;       
            const avgPrice = calculateAveragePrice(data);
            const variance = data.reduce((sum, item) => sum + Math.pow(item.price - avgPrice, 2), 0) / data.length;
            return Math.sqrt(variance);
        }
        const nvidiaStdDev = standardDeviation(messages.filter(msg => msg.title.includes("Nvidia")));
        const alphabetStdDev = standardDeviation(messages.filter(msg => msg.title.includes("Alphabet")));
        const amazonStdDev = standardDeviation(messages.filter(msg => msg.title.includes("Amazon")));

    



    return (  
        <div className="grid grid-rows-[20px_1fr_20px] items-center bg-white justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"> 
            <div className="flex flex-col gap-2 text-black mb-4">
                <h1 className="text-3xl font-bold">Stock Price Heat Map</h1>
                <p className="text-lg">This is a heat map of stock prices for Nvidia, Alphabet, and Amazon. You can search for specific stock prices using the search bar above.</p>
                <p className="text-lg">The heat map is generated based on the stock prices of the three companies. The higher the stock price, the more intense the color.</p>
                <button onClick={handleClick1} className="bg-gray-900 text-white h-[30px] w-[100px] rounded-xl hover:cursor-pointer bg-green-300">Back</button>
            </div>

            <div className="flex flex-row gap-4 text-black flex-wrap justify-center items-center w-full max-w-9xl">
                {heatMapData.length > 0 ? (
                    heatMapData.map((message) => (
                        <div key={message.id} className="flex flex-col gap-2 border-2 border-black rounded-xl p-4 shadow-md" style={{ backgroundColor: message.color }}>
                            <h1 className="text-black text-2xl font-bold">{message.title}</h1>
                            <p className="text-black text-lg">Price: ${message.price.toFixed(2)}</p>
                            <span className="text-gray-200">Last Updated: {new Date(message.lastUpdated).toLocaleString()}</span>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col text-black gap-2">
                        <h1>No data available</h1>
                    </div>
                )}
            </div>

            
            <div className="flex flex-row gap-4 text-black mt-4">
                <div className="text-black mt-4">
                    <h2 className="text-2xl font-bold">Average Stock Prices</h2>    
                    <div className="m-2 text-black">Current nvida average: {nvidiaAverage}</div>
                    <div className="m-2 text-black">Current alphabet average: {alphabetAverage}</div>
                    <div className="m-2 text-black">Current amazon average: {amazonAverage}</div>
                </div>

                <div className="text-black mt-4">
                    <h2 className="text-2xl font-bold">Covariance of Stock Prices</h2>
                    <div className="m-2 text-black">Nvidia Covariance: {nvidiaCovariance.toFixed(2)}</div>
                    <div className="m-2 text-black">Alphabet Covariance: {alphabetCovariance.toFixed(2)}</div>
                    <div className="m-2 text-black">Amazon Covariance: {amazonCovariance.toFixed(2)}</div> 
                </div>
                
                <div className="text-black mt-4">
                    <h2 className="text-2xl font-bold">Standard Deviation of Stock Prices</h2>
                    <div className="m-2 text-black">Nvidia Standard Deviation: {nvidiaStdDev.toFixed(2)}</div>
                    <div className="m-2 text-black">Alphabet Standard Deviation: {alphabetStdDev.toFixed(2)}</div>
                    <div className="m-2 text-black">Amazon Standard Deviation: {amazonStdDev.toFixed(2)}</div>  
                </div>
            </div>

         </div>
    );
}