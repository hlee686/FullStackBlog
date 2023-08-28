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
    <div style={{display: "flex", marginTop: "200px"}}>
      {dataList.map((item,idx)=>
      <div key={idx} style={{marginRight: "30px", width: "240px", height: "300px", backgroundColor: "white", border: "1px solid black", borderRadius: "20px"}}>
        <img style={{width: "230px", height: "150px"}} src={item.imgSrc[0]}/>
        <p>{item.title}</p>
        <p>{item.contents}</p>
        <p>{item.timestamp}</p>
      </div>)}
    </div>
  )
}