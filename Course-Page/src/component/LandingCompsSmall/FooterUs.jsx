import React from 'react'
import Call from "../../assets/landPagePic/Call.png";
import Message from "../../assets/landPagePic/Message.png";
import Location from "../../assets/landPagePic/Location.png";

const footerUs = () => {
  return (
     <div className="text-center flex flex-col mr-20 cursor-pointer z-20" dir='ltr' >
            <h3 className="font-semibold mb-3 text-lg -mr-35">ارتباط با ما</h3>
            <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-end gap-2">
                    09115565987 <img src={Call} alt="" />
                  </li>
                  <li className="flex items-center justify-end gap-2">
                    example@gmail.com <img src={Message} alt="" />
                  </li>
                  <li className="flex items-center justify-end gap-2 mr-2">
                    مازندران، ساری، بهترین مکان برای ... <img src={Location} alt="" />
                  </li>
            </ul>
            </div>
  )
}

export default footerUs