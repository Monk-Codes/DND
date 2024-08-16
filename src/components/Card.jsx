/* eslint-disable react/prop-types */
import { useState } from "react";
import { ResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";

const Card = ({ text, backgroundColor, onDelete }) => {
 const [showMore, setShowMore] = useState(false);

 return (
  <div className={`p-4 shadow-lg border rounded ${backgroundColor} h-full  overflow-y-scroll no-scrollbar`}>
   <ResizableBox width={300} height={200} minConstraints={[100, 100]} className="relative">
    <button onClick={onDelete} className="absolute -top-4 -right-4 bg-transparent rounded-full p-1 shadow-lg hover:bg-red-400 hover:scale-105">
     ❌
    </button>

    <div className="absolute top-3">
     <p className="overflow-hidden ">{showMore ? text : text.substring(0, 250) + "..."}</p>
     <button onClick={() => setShowMore(!showMore)} className="mt-2 text-blue-500">
      {showMore ? "Show Less" : "Show More"}
     </button>
    </div>
   </ResizableBox>
  </div>
 );
};

export default Card;
