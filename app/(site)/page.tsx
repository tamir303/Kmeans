"use client";

import { useEffect, useState } from "react";
import FileInput from "./components/FileInput";
import { InputFileType } from "../types";
import getFileData from "../actions/getFileData";
import { useRouter } from "next/navigation";

/**@type {JSON} data */

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [dataReady, setDataReady] = useState(false);

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
      <FileInput handleFile={handleFile} />
    </div>
  );
}
