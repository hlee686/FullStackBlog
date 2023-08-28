import {useState} from 'react'

export default function Write(){

  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState('')
  const [upload, setUpload] = useState(false)

  const handleImageChange = (e) => {
    const selectedImage = e.target.files;
    setImage(selectedImage);
  };

  const handleUpload = async () => {
    if (!image) {
      alert('이미지를 선택하세요.');
      return;
    }
  
    try {
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append('image', image[i]);
      }
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('이미지 업로드 성공!');
        console.log('이미지 URL:', data.imageUrls);
        await setImgSrc(data.imageUrls);
        setUpload(true);
      } else {
        alert('이미지 업로드 실패.');
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
  };
  

  const [title, setTitle] = useState('')
  const [keywords, setKeywords] = useState([])
  const [contents, setContents] = useState('')
  const timestamp = new Date().toISOString();

  const sendPost = async() => {
    
    const res = await fetch(`api/newPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, keywords, contents, imgSrc, timestamp }),
    });
    if (res.ok) {
      const json = await res.json();
      console.log("여기다", json)
    }
  }
  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   await setImageUrl(file);
  //   console.log("이미지", file); 
  // };
  
  return (
    <div>
      <div><input type="text" placeholder="제목 입력하세요" onChange={e=>setTitle(e.target.value)}/></div>
      <div><input
        type="text"
        placeholder="키워드를 콤마(,)로 구분하여 입력하세요"
        onChange={(e) => setKeywords(e.target.value.split(',').map(keyword => keyword.trim()))}
      /></div>
      <div><input type="file" onChange={handleImageChange} accept="image/*" multiple /></div>
      <button onClick={handleUpload}>업로드</button>
      <div><textarea name="contents" rows="4" cols="50" onChange={e=>setContents(e.target.value)}></textarea></div>
      <button onClick={sendPost}>출간하기</button>
    </div>
  )
}