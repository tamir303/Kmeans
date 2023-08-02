"use client";

import { useEffect, useState } from "react";
import FileInput from "./components/FileInput";
import { InputFileType } from "../types";
import getFileData from "../actions/getFileData";
import { useRouter } from "next/navigation";
import YouTube from 'react-youtube';

/**@type {JSON} data */

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=4E_DFMt60rc")

  const opts = {
    playerVars: { autoplay: 0 },
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    objectFit: 'cover',
  };

  // Helper function to extract YouTube video ID from the URL
  const getYouTubeVideoId = (url: string) => {
    const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/)([^\s&]+)/);
    return videoIdMatch && videoIdMatch[1];
  }

  async function handleFile(file: InputFileType) {
    if (file !== null) {
      const data = await getFileData(file);
      if (data) {
        setData(data);
        setDataReady(true);
      }
    }
  }

  useEffect(() => {
    if (data !== null && dataReady) {
      router.push(`/graph?query=${encodeURIComponent(JSON.stringify(data))}`);
    }
  }, [data, dataReady, router]);

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        background: '#f8f8f8',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}>
        <FileInput handleFile={handleFile} />
      </div>
      <div style={{
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        position: "sticky",
        paddingBlock:"120px"
      }}>
        {/* {videoUrl.includes('youtube.com') && // Check if the videoUrl is a YouTube URL
          <YouTube videoId={getYouTubeVideoId(videoUrl) || undefined} opts={{...opts}} />} */}
      </div>
    </div>
  );
}
