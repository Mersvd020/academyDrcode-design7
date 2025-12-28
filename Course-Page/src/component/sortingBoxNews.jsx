import {useState} from "react"

const SortingNews = ({filters,filterBt,setFilters, updateActiveFilters})=>{
   const[showSort,setShowSort] = useState(false);

     const sorts = [
        {id:1 , name : "جدید ترین"},
        {id:2 , name : "محبوب ترین"},
     ]

       const handleSortChange = (Srtt) => {
         const newSort = filters.sortBy === Srtt ? '' : Srtt;
         setFilters({...filters, sortBy :newSort});
         updateActiveFilters({ ...filters, sortBy: newSort });
      };
    return(
        <div className={`sort relative lg:block ${filterBt ? "":"hidden"}`}>
         <div
          className="border border-gray-300 rounded-lg p-2 text-sm text-gray-700 cursor-pointer flex justify-between items-center hover:bg-gray-50"
           onClick={() => setShowSort(!showSort)}
           
         >
           <span>{  filters.sortBy || 'مرتب سازی بر اساس'}</span>
           <span className="text-xs">▼</span>
         </div>
         
         {showSort && (
           <ul className="absolute top-full left-0 w-full mt-1 bg-white shadow-lg rounded-b-lg z-50 border border-gray-200">
             {sorts.map((Srt) => (
               <li key={Srt.id}>
                 <label
                   className={`block rounded-[5px] px-4 py-2 text-sm cursor-pointer hover:bg-teal-500 hover:text-white ${
                      filters.sortBy === Srt.name ? '!bg-orange-500 !text-white' : ''
                   }`}
                   onClick={() => {
                     handleSortChange(Srt.name);
                     setShowSort(false);
                   }}
                 >
                   {Srt.name}
                 </label>
               </li>
             ))}
           </ul>
         )}
         
       </div>
    )
}
export default SortingNews