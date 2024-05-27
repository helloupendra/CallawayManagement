import React, { useEffect, useRef } from 'react';
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { Row, Col, Card, Button } from 'react-bootstrap';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import { BrandModel } from "../../../model/brand/AllBrands"
import { getAllBrands } from "../../../../slice/brand/BrandSlice";
import { Link } from 'react-router-dom';
import "./TravisPdf.css"
import TravisLogo from "../../../../../../public/media/logos/tm-logo.png";
import productimg from "../../../../../../public/media/product/Pro-img (1).png";
import productimg1 from "../../../../../../public/media/product/Pro-img (2).png";
import productimg2 from "../../../../../../public/media/product/Pro-img (3).png";
import productimg3 from "../../../../../../public/media/product/Pro-img (4).png";
import PrimaryImage from "./PrimaryImage"
import SecondaryImage from './SecondaryImage';

type Props = {
  selectedRow: BasicModelTravis[];
  resetSelectedRow: () => void;
};

const TravisPdf: React.FC<Props> = ({ selectedRow, resetSelectedRow }: Props) => {
     
  // const handlePrint = useReactToPrint({
  //   content: () => contentToPrint.current,
  //   documentTitle: 'Print This Document',
  //   onBeforePrint: () => console.log('before printing...'),
  //   onAfterPrint: () => resetSelectedRow(),
  //   removeAfterPrint: true,
  // });

  useEffect(() => {
    if (selectedRow && selectedRow.length > 0) {
      console.log(selectedRow);
      handlePrint(null, () => contentToPrint.current);
    }
  }, [selectedRow]);


  const getAllBrand = useSelector(getAllBrands) as BrandModel[];
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => resetSelectedRow(),
    removeAfterPrint: true,

  });





  return (<div>
    <div className='pdf-info'>
      <Row >
        <Col xs={24} >
        <div style={{ textAlign: "left", marginTop: "40px", marginBottom:"6px" }}>
                      {/* <Button 
                        onClick={() => {
                          handlePrint(null, () => contentToPrint.current);
                        }}
                        >
                          
                        </Button> */}

                      <button onClick={() => {
                        handlePrint(null, () => contentToPrint.current);
                      }} type="button" className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default mx-3 download-prodect"><span>Download Pdf</span></button>

                      {/* <Button 
                        onClick={handleExportToPPT}
                        >
                          
                        </Button> */}

                      <button type="button" className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default mx-3 download-prodect"><span>Download PPT</span></button>

                    </div>

          <Card id="catelog" ref={contentToPrint}>
            <div>
              <div>
                <div className='mb-18' style={{textAlign:'center'}}>

                <div >   
               <img  style={{ width: "230px", paddingTop: "60px" }} src={TravisLogo}></img>
               </div>
               <h2 style={{ paddingTop: "35px", paddingBottom: "10px", fontSize: "28px", color: "#262626",  fontWeight: "500" }}>Travis Mathew</h2>    

               <p style={{ fontSize: "14px",paddingLeft: "20px", paddingRight: "20px",}}>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>
                </div>

                  

                </div>

                {/* prodect two  start*/}
              </div>
          

            {selectedRow &&
              selectedRow.length > 0 &&
              selectedRow.map(
                (callout) => (
                  <>
                    <div
                      style={{
                        borderBottom: "1px solid #ddd",
                        paddingTop: "10px",
                        paddingLeft: "50px",
                      }}
                    >
                      <div
                        className="prodect-pdf-section"
                        style={{ display: "flex", marginBottom:"60px", marginTop: "20px",}}
                      >
                        <div
                          className="gx-product-col gx-product-content1"
                          style={{ order: "0", width: "47%" }}
                        >
                          <h2 style={{
                            fontSize: "20px",
                            //fontweight: "500" 
                          }}>
                             {callout?.name}
                          </h2>
                          <p
                            style={{
                              fontSize: "14px",
                              paddingRight: "10px",
                            }}
                          >
                           {callout?.description}
                          </p>

                          <div>
                            <table
                              style={{
                                border: "1px solid #ddd",
                                width: "280px",
                                marginTop: "10px",
                                marginRight:"50px"
                              }}
                            >
                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <th
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    fontFamily: "'NoirPro',sans-serif",
                                    fontSize: " 16px",
                                    fontWeight: "500",
                                    textAlign: "left",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  SKU
                                </th>
                                <th
                                  style={{
                                    fontFamily: "'NoirPro',sans-serif",
                                    fontSize: " 16px",
                                    fontWeight: "500",
                                    textAlign: "left",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  {" "}
                                  {callout?.sku}
                                </th>
                              </tr>
                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <td
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  Category
                                </td>
                                <td style={{ paddingLeft: "10px" }}>
                                  {callout.category}
                                </td>
                              </tr>

                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <td
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  Season
                                </td>
                                <td style={{ paddingLeft: "10px" }}>
                                  {callout.season}{" "}
                                </td>
                              </tr>

                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <td
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  Color
                                </td>
                                <td style={{ paddingLeft: "10px" }}>
                                  {callout.color}
                                </td>
                              </tr>
                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <td
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  Style Code
                                </td>
                                <td style={{ paddingLeft: "10px" }}>
                                  {callout.style_code}
                                </td>
                              </tr>

                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <td
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  Color code
                                </td>
                                <td style={{ paddingLeft: "10px" }}>
                                  {callout.color_code}
                                </td>
                              </tr>

                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <td
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  MRP
                                </td>
                                <td style={{ paddingLeft: "10px" }}>
                                  1500
                                </td>
                              </tr>

                              
                            </table>
                          </div>
                        </div>

                        <div style={{ width: "45%", borderRadius: "5px", display:"flex" }}>
                          <div className='prodect-images'>
                            {callout.primary_image_url !==null ?(
                              <PrimaryImage
                              record={callout}/>
                            ):(
                               <img
                               alt="Special Edition Party Spas"
                               style={{
                                 backgroundColor: "#eee",
                                 borderRadius: "10px",
                                 width: "225px"
                               }}
                               src={`https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/large_51xntqlp_Sy_L_AC_SL_1500_a17350c6f1_d08da64450.jpg`}
                             />
                            )
                            
                            }
                         
                   </div>

                          <div
                            className="prodect-info-img" >
                            
                                <>
                                  <div
                                    className="prodect-images-pdf"
                                    style={{ marginRight: "10px" }}
                                  >
                                   <SecondaryImage
                                   record={callout}
                                   />
                                     {/* <span style={{ width: "150px" }} className="">
                                      <img
                                        alt="Special Edition Party Spas"
                                        style={{
                                          backgroundColor: "#eee",
                                          borderRadius: "10px",
                                          width: "70px",
                                          border: "1px solid #ddd",
                                          marginBottom: "5px",
                                          height: "70px",
                                        }}

                                        src={productimg1}

                                      />
                                    </span>

                                    <span style={{ width: "150px" }} className="">
                                      <img
                                        alt="Special Edition Party Spas"
                                        style={{
                                          backgroundColor: "#eee",
                                          borderRadius: "10px",
                                          width: "70px",
                                          border: "1px solid #ddd",
                                          marginBottom: "5px",
                                          height: "70px",
                                        }}

                                        src={productimg2}

                                      />
                                    </span>

                                    <span style={{ width: "150px" }} className="">
                                      <img
                                        alt="Special Edition Party Spas"
                                        style={{
                                          backgroundColor: "#eee",
                                          borderRadius: "10px",
                                          width: "70px",
                                          border: "1px solid #ddd",
                                          marginBottom: "5px",
                                          height: "70px",
                                        }}

                                        src={ productimg3}

                                      />
                                    </span>  */}

                                  </div>
                                </>
                              
                          </div>


                        </div>
                      </div>




                    </div>
                  </>
                )
              )}
          </Card>
        </Col>
      </Row>
    </div>

  </div>);
};

export default TravisPdf;
