
import { setDummyData } from '../src/store/slices/topicSlice'

import { useDispatch, useSelector } from "react-redux";
import { useEffect ,useState} from 'react'

import store from '../src/store'
// import { mockData } from '../src/mock';


import axios from 'axios'

var config = {
  method: 'get',
  url: 'http://codedistrictem.com:3000',
  headers: { }
};




const mockData = 'hello'

export default function Home() {
  const dispatch = useDispatch()
const [loading, setLoading] = useState(false);
  const start = performance.now();

  const {
    data
  } = useSelector((state) => ({
    data: state.topic.data
  }));

  const end = performance.now();
console.log(`Read Data Execution time: ${end - start} ms`);

var result;
  useEffect( () => {
    setLoading(true)
    async function apiCall() {
       result = await axios(config)
      .then(function (response) {
        dispatch( setDummyData(response.data))
        setLoading(false)
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false)
      });


    }
    apiCall();

    

  }, []);

  

  const setData=()=>{
    const start1 = performance.now();
    dispatch( setDummyData(result))
    const end1 = performance.now();
    console.log(`Store Data Execution time: ${end1 - start1} ms`);
    
  }

  const clearData=()=>{
    dispatch( setDummyData(''))
  }

  return (
  <>


  {
    loading ? <h3>Loading...</h3> :<></>
  }
  <button onClick={()=>setData()} >Set data</button>
  <button onClick={()=>clearData()} >Clear data</button>

  </>
  )
}
