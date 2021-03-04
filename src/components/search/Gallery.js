import React,{useEffect,useState} from 'react';
import Image from './Image'
import {getTrendingImage} from '../api/api'

const Gallery = () =>{
    const [imgList,setImgList] = useState([]);
    useEffect(() => {
         getTrendingImage().then(data =>setImgList(data));
        
    },[]);

    return (    
        <div>
            {imgList.map((img) => {
                return <Image src={img.urls.thumb}/>
            })}
        </div>
    );
};

export default Gallery;
