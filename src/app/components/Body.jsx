import { useEffect,useState } from "react";

export default function Body(){
  const [dataList, setDataList] = useState([])
  useEffect(()=>{
    const showPosts = async() => {
      const res = await fetch(`api/seeList`,{
        method: "GET"
      })
      const json = await res.json()
      setDataList(json)
    }
    showPosts()
  },[])
  return (
    <div>
      {dataList.map((item,idx)=><img src={item.imgSrc} key={idx}/>)}
    </div>
  )
}