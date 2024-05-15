import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio, InputNumber, Button } from "antd";
import type { TableColumnsType } from 'antd';
import { BasicModelTravis, ImageType } from "../../../model/travis/TravisMethewModel"
import { useDispatch, useSelector } from "react-redux"
import { getTravisProducts } from "../../../../slice/allProducts/TravisMethewSlice"
import SampleExcelTravis from '../goods/excel/SampleExcel';
import SliderApprel from './SliderApprel';
import { number } from 'yup';
import TravisImportExcel from '../../travisMethew/excel/importExcel/TravisImportExcel';
import { ExcelModelTravis } from "../../../model/travis/TravisExcel"
import "./CallAwayApprelProducts.css";
import TravisExcelUploadDB from '../../travisMethew/excel/importExcel/TravisExcelUploadDB';
import * as XLSX from 'xlsx';
import { updateQuantity90, updateQuantity88 } from "../../../../slice/allProducts/TravisMethewSlice"
import { Cascader, Select, Space } from 'antd';
import { addTravisOrder } from "../../../../slice/orderSlice/travis/CartOrder"
import { message } from "antd";
import { Key } from 'antd/lib/table/interface';
import { useTable } from 'react-table';
import "./TravisTable.css"
import type { RadioChangeEvent, SelectProps } from 'antd';
import Slider from '../../../model/slider/Slider';

type SelectCommonPlacement = SelectProps['placement'];
const OPTIONS = ['Denim',];
const OPTIONS1 = ['SS19', 'SS20	'];
const OPTIONS2 = ['1MR410', '1MO479', '1MR410',];


const CallAwayApprelProducts = () => {
  const placement: SelectCommonPlacement = 'topLeft';
  const tableRef = useRef(null);
  const [isImport, setIsImport] = useState(false);

  const dispatch = useDispatch()

  const getProduct: BasicModelTravis[] = useSelector(getTravisProducts)
  const [amount, setAmount] = useState<number>()


  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const filteredOptionsOne = OPTIONS1.filter((o) => !selectedItems.includes(o));
  const filteredOptionsTwo = OPTIONS2.filter((o) => !selectedItems.includes(o));

  //console.log(" travis Product",getProduct)
  const columns: TableColumnsType<BasicModelTravis> = [
    {
      // title: "Image",
      dataIndex: "Gallery",
      // fixed: "left",
      width: 50,
      render: (value) => {
        // Check if value and value.data[0] exist before accessing properties
        if (value && value.data[0] && value.data[0].attributes && value.data[0].attributes.formats && value.data[0].attributes.formats.thumbnail && value.data[0].attributes.formats.thumbnail.url) {
          console.log("image: " + value.data[0].attributes.formats.thumbnail.url);
          return (
            <span>
              <img
                src={`https://admin.callawayindiaoms.com${value.data[0].attributes.formats.thumbnail.url}`}
                alt="Primary Image"
                style={{ maxWidth: "30px", marginRight: "5px" }}
              />
            </span>
          );
        } else {
          return (
            <span>
              <img
                src="/media/icons/icon-callway.png"
                alt="Primary Image"
                style={{ maxWidth: "30px", marginRight: "5px" }}
              />
            </span>
          ); // Return a placeholder image if thumbnail url is null or undefined
        }
      },


    },




    {
      title: "SKU",
      dataIndex: "SKU",
      width: 100,
      fixed: "left",

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8, width: "300px", position: "absolute", top: -90,  zIndex: 1, }}>
          <Input
            placeholder="Search SKU"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onKeyUp={(e) => {

              console.log("enter", e)
              if (e.key === 'Enter') {
                confirm();
              }
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
        </div>
      ),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            // Trigger the search input to focus when the filter dropdown is opened
          });
        }
      },
      onFilter: (value, record) => {
        const sku =
          record &&
          record.SKU;

        console.log("Filtering:", value, "sku:", sku);
        return sku === value;
      },
      filterSearch: true,


    },

    {
      title: "Description ",
      dataIndex: "Description",
      key: "Description",
      width: 150,

    },



    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      width: 90,
      fixed: "left",
      filterMode: 'tree',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8, width: "300px", position: "absolute", top: -90,  zIndex: 1, }}>
          <Input
            placeholder="Search Name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
        </div>
      ),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            // Trigger the search input to focus when the filter dropdown is opened
          });
        }
      },
      onFilter: (value, record) => {
        const name =
          record &&
          record.Name;

        console.log("Filtering:", value, "sku:", name);
        return name === value;
      },
      filterSearch: true,

    },



    {
      title: "Category",
      dataIndex: "TravisAttributes",
      key: "Category",
      width: 110,
      render: (value) => <span>{value && value[0] && value[0].Category}</span>,
      sorter: (a, b) => {
        const categoryA = a.TravisAttributes?.[0]?.Category ?? "";
        const categoryB = b.TravisAttributes?.[0]?.Category ?? "";

        return categoryA.localeCompare(categoryB);
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8, width: "300px", position: "absolute", top: -90,  zIndex: 1, }}>
          <Select
            mode="multiple"
            placeholder="Select Category"
            value={selectedKeys}
      
            onChange={setSelectedKeys}
            style={{ width: '100%'  }}
            placement={placement}
          >
            {/* Render options based on available categories */}
            {filteredOptions.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>

        </div>
      ),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            // Trigger the search input to focus when the filter dropdown is opened
          });
        }
      },
      onFilter: (value, record) => {
        const category = record?.TravisAttributes?.[0]?.Category;

        console.log("Filtering:", value, "Category:", category);
        return category === value;
      },
      filterSearch: true,
    },




    {
      title: "Season",
      dataIndex: "TravisAttributes",
      key: "Season",
      width: 100,
      render: (value) => <span>{value && value[0] && value[0].Season}</span>,
      sorter: (a, b) => {
        // Extract and compare Season values, handling null or undefined cases
        const seasonA = a.TravisAttributes?.[0]?.Season ?? "";
        const seasonB = b.TravisAttributes?.[0]?.Season ?? "";

        return seasonA.localeCompare(seasonB);
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 ,width: "300px", position: "absolute", top: -90,  zIndex: 1, }}>
          <Select
            mode="multiple"
            placeholder="Select Season"
            value={selectedKeys}
            onChange={setSelectedKeys}
            style={{ width: '100%' }}
            placement={placement}
          >
            {/* Render options based on available seasons */}
            {filteredOptionsOne.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>

        </div>
      ),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            // Trigger the search input to focus when the filter dropdown is opened
          });
        }
      },
      onFilter: (value, record) => {
        const Season = record?.TravisAttributes?.[0]?.Season;

        console.log("Filtering:", value, "season:", Season);
        return Season === value;
      },
      filterSearch: true,
    },



    {
      title: "Style",
      dataIndex: "TravisAttributes",
      key: "StyleCode",
      width: 85,
      render: (value) => <span>{value && value[0] && value[0].StyleCode}</span>,
      sorter: (a, b) => {
        // Extract and compare StyleCode values, handling null or undefined cases
        const styleCodeA = a.TravisAttributes?.[0]?.StyleCode ?? "";
        const styleCodeB = b.TravisAttributes?.[0]?.StyleCode ?? "";

        return styleCodeA.localeCompare(styleCodeB);
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8, width: "300px", position: "absolute", top: -90,  zIndex: 1, }}>
          <Select
            mode="multiple"
            placeholder="Select Style"
            value={selectedKeys}
            onChange={setSelectedKeys}
            style={{ width: '100%' }}
            placement={placement}
          >
            {/* Render options based on available style codes */}
            {filteredOptionsTwo.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>

        </div>
      ),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            // Trigger the search input to focus when the filter dropdown is opened
          });
        }
      },
      onFilter: (value, record) => {
        const StyleCode = record?.TravisAttributes?.[0]?.StyleCode;

        console.log("Filtering:", value, "Style Code:", StyleCode);
        return StyleCode === value;
      },
      filterSearch: true,
    },




    {
      title: "Color",
      dataIndex: "TravisAttributes",
      key: "Color",
      width: 75,
      render: (value) => <span>{value && value[0] && value[0].Color}</span>,
      sorter: (a, b) => {
        // Extract and compare StyleCode values, handling null or undefined cases
        const styleCodeA = a.TravisAttributes?.[0]?.Color ?? "";
        const styleCodeB = b.TravisAttributes?.[0]?.Color ?? "";

        return styleCodeA.localeCompare(styleCodeB);
      },
    },
    {
      title: "Size",
      dataIndex: "TravisAttributes",
      key: "Size",
      width: 65,
      render: (value) => <span>{value && value[0] && value[0].Size}</span>,
      sorter: (a, b) => {
        // Extract and compare StyleCode values, handling null or undefined cases
        const styleCodeA = a.TravisAttributes?.[0]?.Size ?? "";
        const styleCodeB = b.TravisAttributes?.[0]?.Size ?? "";

        return styleCodeA.localeCompare(styleCodeB);
      },
    },



    {
      title: "Qty88",
      dataIndex: "TravisAttributes",
      key: "Stock88",
      width: 100,
      fixed: 'right',
      render: (value, record) => (
        <Input
          addonBefore={value[0]?.Stock88}
          type='number'

          value={record.Quantity88?.toString()}
          onChange={(e) => handleQuantity88(e.target.value, record)}
          disabled={value[0]?.Stock88 === 0}
        />

      ),
    },
    {
      title: "Qty90",
      dataIndex: "TravisAttributes",
      key: "Stock88",
      width: 100,
      fixed: 'right',
      render: (value, record) => (
        <Input addonBefore={value[0]?.Stock90 || 0}
          type='number'

          value={record.Quantity90?.toString()}
          onChange={(e) => handleQuantity90(e.target.value, record)}
          disabled={value[0]?.Stock90 === 0}
        />

      ),
    },


    // {
    //   title:"Quantity",
    //   children:[
    //     {
    //       title: "88",
    //       dataIndex: "quantity88",
    //       key: "quantity88", 
    //       width: 100, 
    //       fixed:'right',
    //       render: (text, record) => (
    //         <Input 
    //          type='number'
    //          value={record.Quantity88?.toString()}
    //           onChange={(e) => handleQuantity88(e.target.value, record)}
    //         />

    //       ),

    //     },
    //     { title: "90",
    //     dataIndex: "quantity90",
    //     key: "quantity90", 
    //     width: 100,
    //     fixed:'right',
    //     render: (text, record) => (
    //       <Input 
    //        type='number'
    //        value={record.Quantity90?.toString()}
    //         onChange={(e) => handleQuantity90(e.target.value, record)}
    //       />
    //     ),
    //    }
    //   ],



    // },
    {
      title: "Qty",
      dataIndex: "TotalQty",
      key: "TotalQty",
      width: 50,
      fixed: 'right'
    },
    {
      title: "MRP",
      dataIndex: "MRP",
      key: "MRP",
      width: 80,
      fixed: 'right'
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      width: 100,
      fixed: 'right'
    },


  ];


  const subColumns: TableColumnsType<BasicModelTravis> = [
    { title: 'SKU', dataIndex: 'SKU', key: 'SKU' },
    { title: 'StyleCode', dataIndex: 'StyleCode', key: 'StyleCode' },
    { title: 'Size', dataIndex: 'Size', key: 'Size' },

  ];
  const [expandedRowKeys, setExpandedRowKeys] = useState<BasicModelTravis>();

  const handleExpand = (expanded: boolean, record: BasicModelTravis) => {


    if (expanded && record.SKU !== undefined) {
      // Expand only the clicked row
      setExpandedRowKeys(record);  // Assuming SKU is a string
    } else {
      setExpandedRowKeys(undefined)
    }
  };


  const expandedRowRender = (record: BasicModelTravis) => {

    console.log("record expanded", record)
    if (record.TravisAttributes && record.TravisAttributes.length > 0) {
      const subcolumns: TableColumnsType<BasicModelTravis> = [
        {
          title: "SKU",
          dataIndex: "SKU",
          key: "SKU",
          width: 130,
          fixed: "left",


        },


        {
          title: "StyleCode",
          dataIndex: "TravisAttributes",
          key: "StyleCode",
          width: 85,
          render: (value) => <span>{value && value[0] && value[0].StyleCode}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.StyleCode ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.StyleCode ?? "";

            return styleCodeA.localeCompare(styleCodeB);
          }
        },
        {
          title: "Size",
          dataIndex: "TravisAttributes",
          key: "Size",
          width: 85,
          render: (value) => <span>{value && value[0] && value[0].Size}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.Size ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.Size ?? "";

            return styleCodeA.localeCompare(styleCodeB);
          },
        },


        {
          title: "88    QTY",
          dataIndex: "TravisAttributes",
          key: "Stock88",
          width: 50,
          fixed: 'right',
          render: (value, record: BasicModelTravis) => (
            <Input addonBefore={value[0].Stock88}
              type='number'

              value={record.Quantity88?.toString()}
              onChange={(e) => handleQuantity88(e.target.value, record)} />

          ),
        },
        {
          title: "90  QTY",
          dataIndex: "TravisAttributes",
          key: "Stock88",
          width: 50,
          fixed: 'right',
          render: (value, record) => (
            <Input addonBefore={value[0].Stock90}
              type='number'

              value={record.Quantity90?.toString()}
              onChange={(e) => handleQuantity90(e.target.value, record)} />

          ),
        }
        ,
        {
          title: "Total Qty",
          dataIndex: "TotalQty",
          key: "TotalQty",
          width: 90,
          fixed: 'right'
        },
        {
          title: "MRP",
          dataIndex: "MRP",
          key: "MRP",
          width: 80,
          fixed: 'right'
        },
        {
          title: "Amount",
          dataIndex: "Amount",
          key: "Amount",
          width: 100,
          fixed: 'right'
        },

      ]

      if (expandedRowKeys && record.SKU === expandedRowKeys.SKU) {
        return (


          // <div className="card card-custom">



          <Table className='table-travis'
            columns={subcolumns}
            dataSource={[record]}
            pagination={false}

            size="middle"
          />


        );
      }
      else
        return null

    }
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState<BasicModelTravis[]>([]);

  const onSelectChange = (newSelectedRowKeys: Key[], record: BasicModelTravis) => {



    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    // Check if the record is selected by checking if its key is included in newSelectedRowKeys
    //const isSelected = newSelectedRowKeys.includes(record.SKU);
    // Update the selectedRowKeys state based on the toggle state
    // setSelectedRowKeys(isSelected ? [record.SKU] : []);
  };



  const handleQuantity90 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);
    if (intValue >= 0) {
      if (record?.TravisAttributes && record?.TravisAttributes[0]?.Stock90 && record.TravisAttributes[0].Stock90 >= intValue) {

        // Dispatch an action to update the quantity for the SKU

        dispatch(updateQuantity90({
          sku: record.SKU,
          qty90: intValue,
          MRP: record.MRP,

        }));
        record.Quantity90 = intValue;
        dispatch(addTravisOrder({
          travisOrder: record,
          qty90: intValue,
          qty88: record.Quantity88
        }))
      }
      else {
        alert("Quantity is not available")
        //setQuantity90(0)
        dispatch(updateQuantity90({
          sku: record.SKU,
          qty90: 0,


        }));
        record.Quantity90 = 0;

      }
    } else {
      alert("Quantity cannot be negative")
    }



    // Log the record for debugging or tracking purposes
    console.log(record);
  };
  const handleQuantity88 = (value: string, record: BasicModelTravis) => {
    console.log("record", record)
    const intValue = parseInt(value, 10);
    if (intValue >= 0) {

      if (record?.TravisAttributes && record?.TravisAttributes[0].Stock88 && record.TravisAttributes[0].Stock88 >= intValue) {


        dispatch(updateQuantity88({
          sku: record.SKU,
          qty88: intValue,
          MRP: record.MRP,
        }));
        record.Quantity88 = intValue;
        // setQuantity88(intValue)
        dispatch(addTravisOrder({
          travisOrder: record,
          qty88: intValue,
          qty90: record.Quantity90

        }))
      }
      else if (record?.TravisAttributes && record?.TravisAttributes[0].Stock88 && record?.TravisAttributes[0].Stock88 < intValue && intValue !== 0) {
        alert("Quantity is not available")
        // setQuantity88(0)
        dispatch(updateQuantity88({
          sku: record.SKU,
          qty88: 0,
        }));
        record.Quantity90 = 0;
      }
    } else {
      alert("Quantity cannot be negative")
    }

  };
  // sample xls
  const [isSample, setIsSample] = useState<boolean>(false)
  const handleSampleExcel = () => {
    setIsSample(true)
  }



  const handleResetIsSample = () => {
    setIsSample(false)
  }

  // handle Excels Data
  const handleImport = () => {
    setIsImport(true);
  };
  const handleCloseImport = () => {
    setIsImport(false);
  };

  const [allXlxData, setAllXlxData] = useState<ExcelModelTravis[]>([])
  const handleTravisData = (allDatat: ExcelModelTravis[]) => {
    const table = tableRef.current;
    handleCloseImport()
    console.log("all travis data", allDatat)
    setAllXlxData(allDatat)
  }

  //reset excel datta
  const handleResetXlData = () => {
    setAllXlxData([])
  }

  //exportto excel
  const handleExportToExcel = () => {
    try {
      console.log("Exporting to Excel...");

      const table = tableRef.current as HTMLTableElement | null;

      if (!table) {
        console.error("Table element not found.");
        return;
      }

      // Get the table's outerHTML
      const tableHtml = table.outerHTML;

      // Create a Blob object representing the data as an XLSX file
      const blob = new Blob([tableHtml], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      // Create a temporary anchor element to download the Blob
      const anchor = document.createElement('a');
      const url = URL.createObjectURL(blob);

      anchor.href = url;
      anchor.download = `TravisMathewProducts_${Date.now()}.xlsx`;
      anchor.click();

      // Release the object URL
      URL.revokeObjectURL(url);

      console.log("Excel exported successfully.");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };




  const handleShowOrder = () => {

  }




  const handleSelctRow = (record: BasicModelTravis) => {
    console.log("record", record)
    setSelectedRowKeys([record])
  }

  return (
    <>
    <Slider/>  



    <div className='container content-pro'>

    
      <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className=" d-flex flex-stack">
          <div className="page-title d-flex flex-column">
            <h1 className="d-flex text-white fw-bold my-1 fs-3">
              Callaway Apparel
            </h1>
          </div>

        </div>
      </div>


      {/* <SliderApprel /> */}

      <Card className='travish-mat-section' style={{ marginTop: '80px', padding: "10px", }}
        title="CALLAWAY APPAREL"
        extra={
          <div >
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <span className="gx-link">Home</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="gx-link">Products</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Callaway Apparel</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        }

      >

        <div style={{ float: "right", marginBottom: "12px" }}>
          <Button className='mx-3 select-btn-detail'
          // onClick={handleImport}
          > <i className="bi bi-bag-check"></i> View cart</Button>

          <Button className='mx-3 select-btn-detail'
            onClick={handleImport}
          > <i className="bi bi-file-earmark-arrow-up"></i> Import Products</Button>
          <Button className='mx-3 select-btn-detail'
          // onClick={handleExportToPDF} 
          > <i className="bi bi-file-earmark-pdf"></i>  Export to PDF</Button>
          <Button className='mx-3 select-btn-detail'
            onClick={handleExportToExcel}
          > <i className="bi bi-file-earmark-spreadsheet"></i> Export to Excel</Button>
          <Button className='mx-3 select-btn-detail'
            onClick={handleSampleExcel}
          > <i className="bi bi-file-spreadsheet"></i> Sample Excel</Button>
        </div>


        <Table className='card-table-travis'
          ref={tableRef}
          columns={columns}
          dataSource={getProduct?.map((item) => ({ ...item, key: item?.SKU }))}
          rowSelection={{
            onSelect: (record) => { handleSelctRow(record) }
          }}
          expandable={{
            expandedRowRender,

            onExpand: (expanded, record) => handleExpand(expanded, record),

          }}
          bordered
          size="middle"
          scroll={{ x: "100%", y: "auto" }}
          
          pagination={{
            position: ['topRight', 'bottomRight'], // Positions pagination at the top and bottom
            defaultPageSize: 20
          }}
        />


      </Card>


      <SampleExcelTravis
        isSample={isSample}
        resetIsSample={handleResetIsSample}
      />

      <TravisImportExcel
        isImport={isImport}
        onClose={handleCloseImport}
        allGoodsData={handleTravisData}
      />

      <TravisExcelUploadDB
        xlData={allXlxData}
        resetXls={handleResetXlData}
      />

    </div>

    </>
  )
}

export default CallAwayApprelProducts