import React from 'react'
import CartHome from '../../modules/cartOrder/CartHome'
import { useState,  } from 'react';
import { Input } from 'antd';
import CartTable from './CartTable';
import { NoProdect } from '../../modules/cartOrder/NoProdect';
import Slider from '../../modules/model/slider/Slider';
const Cart = () => {
  
  return (
    <div>
       
       <Slider/>


<div className='content-dashboard'>
        <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container d-flex flex-stack">
          <div className="page-title d-flex flex-column">
            <h1 className="d-flex text-white fw-bold my-1 fs-3"> Cart</h1>
          
          </div>




         
        </div>
         </div>

      <CartHome/>
      {/* <CartTable/> */}

      </div>
    </div>

  )
}

export default Cart