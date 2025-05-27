import { NextResponse } from "next/server";

const Nvidia = [
    {
        "id":1,
        "title": "Nvidia Stock Price",
        "price": 524.14,
        "lastUpdated": "2023-10-01T10:00:00Z",
    },
    {
        "id":2,
        "title": "Nvidia Stock Price",
        "price": 123.45,
        "lastUpdated": "2023-10-01T11:00:00Z",
    },
    {
        "id":3,
        "title": "Nvidia Stock Price",
        "price": 678.90,
        "lastUpdated": "2023-10-01T12:00:00Z",
    },
    {
        "id":4,
        "title": "Nvidia Stock Price",
        "price": 345.67,
        "lastUpdated": "2023-10-01T13:00:00Z",
    },
    {
        "id":5,
        "title": "Nvidia Stock Price",
        "price": 890.12,
        "lastUpdated": "2023-10-01T13:00:00Z",
    },
    {
        "id":6,
        "title": "Nvidia Stock Price",
        "price": 456.78,
        "lastUpdated": "2023-10-01T14:00:00Z",
    },          
]

const Alphabet = [
    {
        "id":7,
        "title": "Alphabet Stock Price",
        "price": 224.14,
        "lastUpdated": "2023-10-01T10:01:00Z",
    },
    {
        "id":8,
        "title": "Alphabet Stock Price",
        "price": 234.45,
        "lastUpdated": "2023-10-01T11:10:00Z",
    },
    {
        "id":9,
        "title": "Alphabet Stock Price",
        "price": 682.90,
        "lastUpdated": "2023-10-01T12:10:00Z",
    },
    {
        "id":10,
        "title": "Alphabet Stock Price",
        "price": 45.67,
        "lastUpdated": "2023-10-01T13:00:10Z",
    },
    {
        "id":11,
        "title": "Alphabet Stock Price",
        "price": 83.12,
        "lastUpdated": "2023-10-01T13:11:00Z",
    },
    {
        "id":12,
        "title": "Alphabet Stock Price",
        "price": 46.78,
        "lastUpdated": "2023-10-01T14:12:00Z",
    },          
]

const Amazon = [
    {
        "id":13,
        "title": "Amazon Stock Price",
        "price": 924.14,
        "lastUpdated": "2023-10-01T10:01:00Z",
    },
    {
        "id":14,
        "title": "Amazon Stock Price",
        "price": 34.45,
        "lastUpdated": "2023-10-01T11:10:00Z",
    },
    {
        "id":15,
        "title": "Amazon Stock Price",
        "price": 62.90,
        "lastUpdated": "2023-10-01T12:10:00Z",
    },
    {
        "id":16,
        "title": "Amazon Stock Price",
        "price": 451.67,
        "lastUpdated": "2023-10-01T13:00:10Z",
    },
    {
        "id":17,
        "title": "Amazon Stock Price",
        "price": 823.12,
        "lastUpdated": "2023-10-01T13:11:00Z",
    },
    {
        "id":18,
        "title": "Amazon Stock Price",
        "price": 146.78,
        "lastUpdated": "2023-10-01T14:12:00Z",
    },          
]

export async function GET(){
    try{
        console.error(Nvidia);
        const arr = [...Nvidia, ...Alphabet,...Amazon];
        arr.sort((a, b) => a.price - b.price);
        return NextResponse.json(arr, {status:200});
    } catch (error){
        return NextResponse.json({error: "Internal Server Error"}, {status:500});
    }
}