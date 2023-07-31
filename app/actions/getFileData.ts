import * as XLSX from "xlsx";

async function getFileData(file: Blob) {
  return new Promise<any>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      const dataStruct = {
        fields: Object.keys(jsonData[0] as JSON) as string[],
        values: jsonData.map((obj) => Object.values(obj as any)) as string[][],
      };

      resolve(dataStruct);
    };

    reader.onerror = (error: any) => {
      reject(new Error(error));
    };

    reader.readAsBinaryString(file);
  });
}

export default getFileData;
