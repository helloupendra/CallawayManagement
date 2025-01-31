import React, { useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { TableColumnsType, UploadProps } from 'antd';
import { message, Upload } from 'antd';
import * as XLSX from "xlsx";
import { ExcelModelTravis } from "../../../../model/travis/TravisExcel"
import type { UploadChangeParam } from "antd/lib/upload";
import { BasicModelTravis } from "../../../../model/travis/TravisMethewModel";
import type { ColumnProps } from 'antd/lib/table';
import { BasicModelApparel } from "../../../../model/apparel/CallawayApparelModel";
// import SampleExcelTravis from "../SampleExcelTravis";

const { Dragger } = Upload;

type Props = {
  onClose: () => void;
  isImport: boolean;
  allApparelData: (allData: BasicModelApparel[]) => void
}

const props: UploadProps = {
  name: 'file',
  multiple: false,

};
const TravisImportExcel = ({ onClose, isImport, allApparelData }: Props) => {
  const [allXData, setAllXData] = useState<BasicModelApparel[]>([])
  const [loading, setLoading] = useState<boolean>(false);


  // handle input xls
  const handleInput = (info: UploadChangeParam) => {

    const file = info.file.originFileObj;
    if (!file || file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      message.error('You can only upload Excel files!');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;


      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<ExcelModelTravis>(worksheet) as ExcelModelTravis[];

      setAllXData(jsonData)
      setLoading(false);
    };
    reader.onerror = () => {
      message.error("File reading failed!");
      setLoading(false);
    };
    reader.readAsBinaryString(file);
    // 
  }

  const handleOk = () => {
    //setIsModalOpen(false);
    allApparelData(allXData)
    // onClose();
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    onClose();
  };

  const columns: TableColumnsType<BasicModelApparel> = [



    {
      title: "sku",
      dataIndex: "sku",
      width: 100,
      fixed: "left",




    },

    {
      title: "description",
      dataIndex: "description",
      key: "description",
      width: 150,

    },


    {
      title: "category",
      dataIndex: "category",
      key: "category",
      width: 110,
    },




    {
      title: "season",
      dataIndex: "season",
      key: "season",
      width: 100,



    },
    {
      title: "color",
      dataIndex: "color",
      key: "color",
      width: 75,


    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      width: 75,


    },


    {
      title: "style_id",
      dataIndex: "style_id",
      key: "style_id",
      width: 85,

    },
    {
      title: "brand_id",
      dataIndex: "brand_id",
      key: "brand_id",
      width: 85,
      fixed: 'right',


    },



    {
      title: "size",
      dataIndex: "size",
      key: "size",
      width: 65,


    },

    {
      title: "gender",
      dataIndex: "gender",
      key: "gender",
      width: 150,
    },
    // {
    //   title: "sleeves",
    //   dataIndex: "sleeves",
    //   key: "sleeves",
    //   width: 150,
    // },

    {
      title: "stock_88",
      dataIndex: "stock_88",
      key: "stock_88",
      width: 150,
      fixed: 'right',

    },
    {
      title: "stock_90",
      dataIndex: "stock_90",
      key: "stock_90",
      width: 150,
      fixed: 'right',

    },

    {
      title: "gst",
      dataIndex: "gst",
      key: "gst",
      width: 80,
      fixed: 'right'
    },

    {
      title: "mrp",
      dataIndex: "mrp",
      key: "mrp",
      width: 80,
      fixed: 'right'
    },
    {
      title: "series",
      dataIndex: "series",
      key: "series",
      width: 80,
      fixed: 'right'
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
      width: 80,
      fixed: 'right'
    },







  ];

  const excelData: BasicModelApparel[] = [
    {

     // brand: "Callaway SoftGoods",
      brand_id:1,
      sku: 'TM001',
      name: 'Cool Belt',
      category: 'Belts',
      season: 'SS22',
      style_id: '4MT044',
      series: 'NA',
     // sleeves: 'In_Line',
      gender: "Mens",
      color: 'Heather_Purple_Velvet',
       type:"Core",
      
      size: 'M',

      description:'This is a cool belt from Travis Mathew.',
      mrp: 50,

      stock_88: 100,
      stock_90: 100,
      gst:10,
      //mrp: 12,
     // Amount: 500,

    },
    {

     // brand: "Callaway SoftGoods",
      brand_id:2,

      sku: 'TM002',
      name: 'Stylish Cap',
      category: 'Headwear',
      season: 'SS22',
      style_id: '4MT045',
      series: 'NA',
      //sleeves: 'NA',
      color: 'Black',
      size: 'L',

      type:"Core",
    
      description: 'A stylish cap from Travis Mathew.',

      mrp: 30,


      gender: "Mens",
      stock_88: 100,
      stock_90: 100,
      gst:10,

      //mrp: 12,
      //Amount: 300,
    },
    {

     // brand: "Callaway SoftGoods",
      brand_id:3,

      sku: 'TM003',
      name: 'Classic Polo',
      category: 'Tops',
      season: 'SS22',
      style_id: '4MT046',
      series: 'NA',
      //sleeves: 'In_Line',
      color: 'Navy Blue',
      size: 'XL',

      type:"Core",
     
      description: 'A classic polo shirt from Travis Mathew.',

      mrp: 70,


      gender: "Mens",
      stock_88: 100,
      stock_90: 100,
      gst:10,

     // mrp: 12,
      //Amount: 700,
    },
  ];

  const handleExportToExcel = () => {
    const headerTitles = columns.map(col => col.title) as string[];
    const ws = XLSX.utils.json_to_sheet(excelData, { header: headerTitles });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const hiddenTable = document.createElement("table");
    hiddenTable.style.visibility = "hidden";

    // Add the table headers
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    columns.forEach((column) => {
      const th = document.createElement("th");
      th.innerText = column.title?.toString() || "";
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    hiddenTable.appendChild(thead);

    // Add the table body (rows)
    const tbody = document.createElement("tbody");
    excelData.forEach((rowData) => {
      const tr = document.createElement("tr");
      columns.forEach((column) => {
        const td = document.createElement("td");
        // td.innerText = String(rowData[column.dataIndex as keyof BasicModelApparel]) ;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    hiddenTable.appendChild(tbody);

    // Append the hidden table to the body
    document.body.appendChild(hiddenTable);

    // Generate and download the Excel file

    XLSX.writeFile(wb, "CallawaySoftgoodsSample.xlsx");


    // Clean up: remove the hidden table
    document.body.removeChild(hiddenTable);

    // Reset the sample state

  };
  return (
    <div>
      <Modal className="updateqty-model"
        // title="Basic Modal"
        open={isImport}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3 className="mb-3">Import Products </h3>
        <Dragger
          multiple={false}
          onChange={(info) => handleInput(info)}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
        <div className="mt-5 downlaod-excel "
        
        >
          <h4 className="fs-5">Click to  Download  Softgoods Sample Excel  <Tooltip  className="py-1 px-2 mx-1" title={"Downlaod"} > <i className="bi bi-download fs-3" onClick={handleExportToExcel}></i></Tooltip> </h4>
         
        </div>
      </Modal>


      {/* <SampleExcelTravis
        isSample={isSample}
        resetIsSample={handleResetIsSample}
      /> */}

    </div>


  )
}


export default TravisImportExcel