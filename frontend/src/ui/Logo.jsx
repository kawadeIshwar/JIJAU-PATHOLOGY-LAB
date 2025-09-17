import React from 'react'

export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon with Syringe and Blood Drop */}
      <div className="relative">
        {/* Syringe */}
        <div className="relative">
          {/* Syringe Barrel */}
          <div className="w-8 h-12 bg-white rounded-sm relative">
            {/* Syringe Plunger */}
            <div className="absolute top-1 left-1 right-1 h-2 bg-white border border-gray-200 rounded-sm"></div>
            {/* Syringe Body */}
            <div className="absolute top-3 left-1 right-1 bottom-1 bg-white border border-gray-200 rounded-sm"></div>
            {/* Needle */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-white"></div>
          </div>
          
          {/* Blood Drop */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-white rounded-full"></div>
        </div>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <div className="text-white font-bold text-xl leading-tight">
          JIJAU
        </div>
        <div className="text-white text-xs font-medium leading-tight">
          PATHOLOGY LABORATORY
        </div>
      </div>
    </div>
  )
}

// Alternative simpler logo version
export function SimpleLogo({ className = "" }) {
  return (
    <div className={`flex items-center space-x-2 border border-white rounded-lg px-3 py-2 ${className}`}>
      {/* Medical Cross Icon */}
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white rounded-sm relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-white"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-white"></div>
          </div>
        </div>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <div className="text-white font-bold text-lg leading-tight">
          JIJAU
        </div>
        <div className="text-white text-xs font-medium leading-tight">
          PATHOLOGY LABORATORY
        </div>
      </div>
    </div>
  )
}

