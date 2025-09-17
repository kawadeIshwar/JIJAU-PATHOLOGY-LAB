import React, {useState, useEffect} from 'react'
import slide1 from '../assets/slide12.jpg'
import slide2 from '../assets/slide13.jpg'
import slide3 from '../assets/slide14.jpg'
import './slider.css'

const slides = [
  {id:1, img:slide1, title:'Reliable diagnostics', subtitle:'Accurate, quick & secure'},
  {id:2, img:slide2, title:'Home sample collection', subtitle:'Book a slot, we collect'},
  {id:3, img:slide3, title:'Easy reports', subtitle:'Downloadable and shareable'}
];

export default function Slider(){
  const [idx, setIdx] = useState(0);
  useEffect(()=>{
    const t = setInterval(()=> setIdx(i=> (i+1)%slides.length), 3500);
    return ()=> clearInterval(t);
  },[]);
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="flex transition-transform duration-700" style={{transform:`translateX(${-idx*100}%)`}}>
        {slides.map(s=>(
          <div key={s.id} className="min-w-full flex items-center p-6 bg-white">
            <img src={s.img} alt={s.title} className="w-1/2 hidden md:block" />
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold">{s.title}</h2>
              <p className="mt-2 text-gray-600">{s.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_,i)=>(
          <button key={i} onClick={()=>setIdx(i)} className={`w-3 h-3 rounded-full ${i===idx? 'bg-indigo-600':'bg-gray-300'}`}></button>
        ))}
      </div>
    </div>
  )
}
