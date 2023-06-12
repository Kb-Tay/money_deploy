export default function Target() {


  return ( 
    <div className="bg-slate-500 px-4 py-2 rounded-lg">
      <div className="flex flex-col">
        <p className="">Target this month:</p>
        <div className="flex flex-row justify-between"> 
          <span className="font-bold text-3xl">$100</span>  
          <button className="text-white font-medium px-2 bg-gray-900 rounded hover:bg-slate-600">Set Target</button>
          
        </div>
        
      </div>
      
    </div>
  )
}