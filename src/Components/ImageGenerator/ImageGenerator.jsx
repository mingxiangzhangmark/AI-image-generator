import { useState } from 'react';
import './ImageGenerator.css';
import { useRef } from 'react';
import viewPicture from '../../assets/view-picture.webp';

// import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY ,//env variable
    dangerouslyAllowBrowser: true 
});

export default function ImageGenerator() {
    const [image_url, setImage_url] = useState('/');
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    async function imageGenerator() {
        setLoading(true);
        const image = await openai.images.generate({ 
            model: "dall-e-3", 
            prompt: `${inputRef.current.value}`,
        });
      
        // console.log(image.data[0].url);
        setImage_url(image.data[0].url);
        setLoading(false);
      }

  return (
    <div className="ai-image-generator">
        <div className="header">
            AI Image <span>Generator</span>
        </div>

        <div className="image-loading">
            <div className="image"><img src=
            {image_url === '/'? viewPicture :image_url  } alt="" /></div>
        </div>
        <div className='loading'>
            <div className={loading ? "loading-bar-full": "loading-bar"}></div>
            {/* <div className={"loading-bar-full"}></div> */}
            <div className={loading ? "loading-text": "display-none"}>
            {/* <div className={"loading-text"}> */}
                Generating the picture...</div>
        </div>
        <div className="search-box">
            <input ref={inputRef} type="text" className="search-input" placeholder='Describe the Image You Want to Generate...'/>
            <div className="generate-btn" onClick={()=>{imageGenerator()}}>
                Generate
            </div>
        </div>
    </div>
  )
}
