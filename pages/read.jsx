import { useState } from "react";
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
const ReadData = () => {

    const {
        data
      } = useSelector((state) => ({
        data: state.topic.data
      }));

      const [dummyData, setDummyData] = useState(data);
      useEffect(() => {
        setDummyData(data)
      }, [data]);

    return ( 
        <div>
<h1>Read from the persisted store </h1>

<ul>
    {/* {
        dummyData?.map((item,index)=>{
            debugger
            return(
                <li>
                    {item.title}
                </li>
            )
        })
    } */}
</ul>

        </div>
     );
}
 
export default ReadData;