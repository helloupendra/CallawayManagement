import React, { useEffect, useRef, useState } from 'react'
import { getCurrentUser, getUserProfile } from '../../../../../slice/UserSlice/UserSlice'
import { useSelector } from 'react-redux'
import { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel'
import { getApparelNote, getApparelProducts, getPreOrderId, getSoftgoodRetailerDetail, getaddSoftGoodManagerDetails, getaddSoftGoodSalesrepDetails } from '../../../../../slice/allProducts/CallawayApparelSlice'
import { Button, Card, Table, type TableColumnsType } from 'antd';
import { useReactToPrint } from 'react-to-print'
import { RetailerModel } from '../../../../model/AccountType/retailer/RetailerModel'
import BrandLogo from "../../../../../../../public/media/logos/logo-white.png"
const SoftGoodsOrderPdf = () => {

  const today = new Date();
  //const formattedDate = today.toLocaleDateString('en-CA'); 
  const formattedDate = today.toLocaleDateString('en-GB');

  const getCurrentUsers = useSelector(getCurrentUser)
  const [salesRepName, setSalesRepName] = useState<string>()
  const getUserProfiles = useSelector(getUserProfile)
  //get sales Rep name

  const [notes, setNotes] = useState<string[]>([])
  const getOgioNotes = useSelector(getApparelNote)
  const managerName =useSelector(getaddSoftGoodManagerDetails)
  const[manaer_Name,setManager_Name] = useState<string>()
  const salesrepName =useSelector(getaddSoftGoodSalesrepDetails)
  const[salesrep_Name,setsalesrep_Name] = useState<string>()

  useEffect(()=>{
    if(getCurrentUsers &&  getCurrentUsers.role=="Admin" && managerName){
      setManager_Name(managerName)
      

    }
    else if(getCurrentUsers && getCurrentUsers.role=="Manager" && getCurrentUsers.name)
{
  setManager_Name(getCurrentUsers.name)
}    


  },[getCurrentUsers,managerName]

  )


  useEffect(() => {
    const check: string[] = [];
    if (getOgioNotes) {
      getOgioNotes.map((item) => {
        if (item.type != "system" && item.message) {
          check.push(item.message)

        }
      })
      setNotes(check)
    }
  }, [getOgioNotes])

  const getPreOrderIds = useSelector(getPreOrderId)



  
  useEffect(()=>{
    if(getCurrentUsers &&  getCurrentUsers.role=="Admin" && salesrepName){
      setsalesrep_Name(salesrepName)
      

    }
    else if(getCurrentUsers && getCurrentUsers.role=="Sales Representative" && getCurrentUsers.name)
{
  setsalesrep_Name(getCurrentUsers.name)
}    


  },[getCurrentUsers,salesrepName]

  )

  // useEffect(() => {
  //   if (getUserProfiles && getUserProfiles.length > 0) {
  //     getUserProfiles.map(item => {
  //       if (item.role === "Sales Representative") {
  //         setSalesRepName(item.name)
  //       }
  //     })
  //   }
  // }, [getUserProfiles])

  // get all discount , net billl amount
  const getSoftGoodsRetailerDetails = useSelector(getSoftgoodRetailerDetail) as RetailerModel;
  const [totalAmount, setTotalAmount] = useState<number>()
  const [discountAmount, setDiscountAmount] = useState<number>()
  const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
  const getSoftGoodsProduct: BasicModelApparel[] = useSelector(getApparelProducts)
  const [allTravisOrders, setGetAllTravisOrders] = useState<BasicModelApparel[]>([])
  useEffect(() => {
    let tAmount: number = 0;
    let totalBillAmount: number = 0;
    const travis: BasicModelApparel[] = [];
    if (getSoftGoodsProduct && getSoftGoodsProduct.length > 0) {
      getSoftGoodsProduct.map((item) => {
        if (item.ordered) {
          travis.push(item)
        }
        if (item.Amount) {

          tAmount = parseFloat((item.Amount + tAmount).toFixed(2))
        }
        if (item.FinalBillValue) {

          totalBillAmount = parseFloat((totalBillAmount + item.FinalBillValue).toFixed(2))
        }
      })


      setGetAllTravisOrders(travis)
      setTotalAmount(tAmount)
      setTotalNetBillAmount(totalBillAmount)
      setDiscountAmount(parseFloat((tAmount - totalBillAmount).toFixed(2)));
    }
  }, [getSoftGoodsProduct]);

  const columns: TableColumnsType<BasicModelApparel> = [

    {
      title: "SKU",
      dataIndex: "sku",
      width: 100,
      fixed: "left",


    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 225,

    },
    // {
    //     title: "Category",
    //     dataIndex: "category",
    //     key: "category",
    //     width: 120,



    //   },


    // {
    //     title: "Season",
    //     dataIndex: "season",
    //     key: "season",
    //     width: 100,


    //   },





    // {
    //   title: "Color",
    //   dataIndex: "color",
    //   key: "color",
    //   width: 85,

    // },
    // {
    //   title: "Style",
    //   dataIndex: "style_id",
    //   key: "style_id",
    //   width: 85,

    // },
    // {
    //   title: "Size",
    //   dataIndex: "size",
    //   key: "size",
    //   width: 85,

    // },
    //   {
    //     title: "Gender",
    //     dataIndex: "gender",
    //     key: "gender",
    //     width: 85,

    //   },	
    //   {
    //     title: "Sleeves",
    //     dataIndex: "sleeves",
    //     key: "sleeves",
    //     width: 85,

    //   },	


    {
      title: " Qty",
      dataIndex: "TotalQty",
      key: "TotalQty",
      width: 20,
      fixed: 'right',





    },
    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
      width: 120,
      fixed: 'right'

    },
    {
      title: "Discount",
      dataIndex: "LessDiscountAmount",
      key: "LessDiscountAmount",
      width: 120,
      fixed: 'right'

    },

    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      width: 60,
      fixed: 'right'

    },
    // {
    //     title: "GST",
    //     dataIndex: "GST",
    //     key: "GST",
    //     width: 70,
    //     fixed: 'right'

    //   },
    //   {
    //     title: "LessGST",
    //     dataIndex:"LessGST",
    //     key:"LessGST",
    //     width: 70,
    //     fixed: 'right'

    //   },

    //   {
    //     title: "Discount",
    //     dataIndex:"Discount",
    //     key:"Discount",
    //     width: 70,
    //     fixed: 'right'

    //   },
    //   {
    //     title: "LessDiscountAmount",
    //     dataIndex:"LessDiscountAmount",
    //     key:"LessDiscountAmount",
    //     width: 70,
    //     fixed: 'right'

    //   },
    //   {
    //     title: "NetBillings",
    //     dataIndex:"NetBillings",
    //     key:"NetBillings",
    //     width: 70,
    //     fixed: 'right'

    //   },
    //   {
    //     title: "FinalBillValue",
    //     dataIndex:"FinalBillValue",
    //     key:"FinalBillValue",
    //     width: 70,
    //     fixed: 'right'

    //   },


  ];

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing .."),


  });

  return (
    <div>
      <Button className="mt-12"
        onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}

      >Download PDF</Button>

      <Card className="padf" style={{ marginTop: "10px", backgroundColor: "#f8f8f8" }}>

        <div className=" ant-card ant-card-bordered gx-card mt-6" ref={contentToPrint}>
          <div className="ant-card-body">

            <div className="bg-black  py-12  row" style={{ borderRadius: "5px" }}>
              <div className="col-7 text-end ">
                <img className="pdf-image" width={200} src={BrandLogo}></img>
              </div>
              <div className="col-5 text-end px-6">
                <h2 className="text-white pdf-title">ORDER PDF</h2>
                <h3 className="text-white pdf-title"><span>#</span>{getPreOrderIds}</h3>
              </div>
            </div>


            <div className="row px-10 mt-8 mb-18" >
              <div className="col-8">
                <h1 className=" d-flex font-gray-900 fw-light my-1 fs-1  fw-bold pt-3 pb-2" >{getSoftGoodsRetailerDetails.name}</h1>

                <div className="d-flex">
                  <span className="gx-mb-0  font-weight-800 fw-semibold fs-5">GSTIN: </span>
                  <p className='text-gray-600 font-weight-800 fw-semibold fs-5 m-0 mx-1'> {getSoftGoodsRetailerDetails.gstin} <i className="bi bi-copy text-gray-600 text-hover-dark cursor-pointer"></i></p>
                </div>

                <div className="user-address pt-3">
                  <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Address:</span>
                  <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5 m-0 mb-3">
                    {getSoftGoodsRetailerDetails.address}
                  </p>
                </div>

                {/* <div className="user-address  d-flex">
            <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Phone:
             </span>

            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5 m-0 mx-1">
           {getTravisRetailerDetails.phone}

            </p>
          </div> */}


              </div>




              <div className="col-4 user-details-pdf" >
                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">Date:</span> {formattedDate} </p>

                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">Company:</span> Callaway Golf India</p>

                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">Brand:</span> Callaway</p>
                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">Manager:</span> {manaer_Name}</p>
                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">Sales Rep:</span>  {salesrep_Name}</p>
              </div>
            </div>




            <Table
              className='cart-table-profile project-table-profile mx-7 product-table-pdf'

              style={{ border: "1px solid #f0f0f0", borderRadius: "8px 8px 0 0px" }}

              columns={columns}
              dataSource={allTravisOrders?.map((item) => ({ ...item, key: item.sku }))}

              size="middle"
              pagination={false} />



            <div className='row'>
              <div className='col-6 mt-6 notes-pdf'>
                {notes &&
                  notes.length > 0 &&
                  <h2 className='fs-4'>NOTES:</h2>
                }
                <ul>
                  {notes &&
                    notes.length > 0 &&
                    notes.map((item) => (
                      <li className='fs-5 text-gray-700 notes-pdf-text'>{item}</li>
                    ))}
                </ul>
              </div>
              <div className='col-6'>
                <div className="mx-7" style={{ width: "260px", float: "right", paddingTop: "20px", backgroundColor: "#fff" }}>



                  <tr className="total-amout-list">
                    <th className="order-pdf-list"> Sub Total: </th>
                    <th className="order-pdf-data"> ₹{totalAmount} </th>
                  </tr>


                  <tr className="total-amout-list pt-1">
                    <th className="order-pdf-list"> Discount: </th>
                    <th className="order-pdf-data"> ₹{discountAmount}</th>
                  </tr>

                  {/* ₹ */}


                  <tr className="total-amout-list" style={{ backgroundColor: "#ddd", paddingTop: "3px" }}>
                    <th className="order-pdf-list"> Total : </th>
                    <th className="order-pdf-data"> ₹{totalNetBillAmount} </th>
                  </tr>





                </div>
              </div>

            </div>

          </div>

        </div>

      </Card>

    </div>
  )
}

export default SoftGoodsOrderPdf