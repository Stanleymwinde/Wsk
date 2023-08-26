import React from 'react'
import { Link } from 'react-router-dom'

function CollectionCard({ data }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
       {data.map((item) => (
          <div class="bg-white rounded-lg shadow-md h-48">
            <div class="overflow-hidden rounded-t-lg">
                <img src={item.imageURL} class="object-cover object-top h-28 w-full"/>
            </div>
            <div className='flex'>
                <div class="relative mx-3 w-16 h-16 -mt-8 ">
                  <img src={item.imageURL} class="object-cover rounded-full w-full h-16 "/>
                </div>
           </div>
             <div class="pt-2 space-x-2 flex items-center justify-around">
                 <h5 className="text-gray-700 text-md px-1 lg:px-1.5 border rounded-md">{item.name}</h5>
                 <p className="text-gray-700 text-md px-1 lg:px-1.5 border rounded-md">{item.volume}</p>
            </div>
          </div>
      ))}  
    </div>
 )
}

export default CollectionCard