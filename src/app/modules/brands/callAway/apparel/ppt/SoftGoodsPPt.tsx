import React,{useEffect} from 'react'
import { TravisPdfPrint } from '../../../../model/pdf/PdfModel'
import PptxGenJS from 'pptxgenjs';
import Image1 from "../../../../../../public/media/demo/1600x1200/1.png"
import { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel';
type Props={
   // selectedRow:TravisPdfPrint[]
   // selectedRow: BasicModelApparel[];
   selectedRow:BasicModelApparel[]


   resetPPt:()=>void
}



const SoftGoodsPPt = ({ selectedRow, resetPPt }: Props) => {
    useEffect(() => {
        console.log("ppt")
      if (selectedRow && selectedRow.length > 0) {
        console.log("selectedRow",selectedRow)
      
        const pptx = new PptxGenJS();
  
        selectedRow.forEach((item) => {
          const slide = pptx.addSlide();
          // Add image to slide
          // // slide.addImage({
        //   // //   path: `https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/TRAVIS-Images/${item.family}/${item.primary_image_url}`,
          // //   x: 0.5,
          // //   y: 0.5,
          // //   w: 2,
          // //   h: 2,
          // // });

        // if(item.otherInfo){
        //     const tableData2 = [
        //         // [{ text: 'category', options: { bold: true } }, { text: item.otherInfo?.category }],
        //         // [{ text: 'color', options: { bold: true } }, { text: item.otherInfo?.color }],
        //         // [{ text: 'gender', options: { bold: true } }, { text: item.otherInfo?.gender }],
        //         // [{ text: 'season', options: { bold: true } }, { text: item.otherInfo?.season }],
        //         // [{ text: 'style_id', options: { bold: true } }, { text: item.otherInfo.style_code }],
        //         [
        //           { text: 'Category', options: { bold: true } },
        //           { text: 'color', options: { bold: true } },
        //           { text: 'gender', options: { bold: true } },
        //           { text: 'season', options: { bold: true } },
        //           { text: 'style_id', options: { bold: true } }


        //         ],
        //         [
        //           item.otherInfo?.category || '',
        //           item.otherInfo?.color || '',
        //           item.otherInfo?.gender || '',
        //           item.otherInfo?.season || '',
        //           item.otherInfo?.style_code || '',


            
        //         ]
        //       ] as (string | { text: string; options?: { bold?: boolean } })[][];
        //       slide.addTable(tableData2, {
        //         x: 2,
        //         y: 1,
        //         w: 5,
        //         colW: [1,1,1,1,1],
        //         border: { pt: 1, color: '000000' },
        //         fill: 'F1F1F1',
        //         fontSize: 12,
        //       });
        // }
        
  
          // Add table to slide if variation_sku_data is defined
          if (item) {
            //item.variation_sku_data.forEach((data) => {
              const tableData = [
                // [{ text: 'SKU', options: { bold: true } }, { text: data.sku }],
                // [{ text: 'Size', options: { bold: true } }, { text: data.size }],
                // [{ text: 'MRP', options: { bold: true } }, { text: data.mrp }],
                // [{ text: 'QTY', options: { bold: true } }, { text: data.qty }],

                [
                  { text: 'SKU', options: { bold: true } },
                  { text: 'MRP', options: { bold: true } },
                 { text: 'CATEGORY', options: { bold: true } },
                  { text: 'Size', options: { bold: true } }
                ],
                 [
                    item.sku || '',
                    item.mrp || '',
                   item.category || '',
                    item.size || ''
                ]
          //  )
              ] as (string | { text: string; options?: { bold?: boolean } })[][];
             
  
              slide.addTable(tableData, {
                x: 2,
                y: 0.5,
                w: 5,
                colW: [0.5,0.5,0.5,0.5],
                border: { pt: 1, color: '000000' },
                fill: 'F1F1F1',
                fontSize: 12,
              });
           // });
          }
        });
  
        // pptx.writeFile({ fileName: 'SoftGoods_Presentation.pptx' });
        resetPPt();
      }
    }, [selectedRow]);
  
    return null;
  };
  
  

export default SoftGoodsPPt