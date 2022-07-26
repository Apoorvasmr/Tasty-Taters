import React from 'react'
import logo from "../../assets/img/TASTY-TATERS--logo.png"
const Footer = ({price, showCartList, setShowCartList}) => {
  return (
    <div>
        <div className="total">
            <p>Total Price:${price}</p>
            {showCartList ?(
                <button onClick={()=>setShowCartList(false)}>
                    Back to Home
                </button>
            ):(
                <button onClick={()=>setShowCartList(true)}>
                    Check Cart
                </button>
            )}
           
        </div>    
   

        <footer>
            <img src={logo} alt=""/> 
            <div className="bottom">
                <h2 className="conclude"> Premium Quality food at the best and most afforable prices.
                    we have a new offer everyday for 365 days
                </h2><br/>
            <p><strong>Contact:</strong></p>
            <p>  Email: quickfood@tastytaters.com|Hotline + 131 138 138 </p><br/><br/>
            <p className="conclude">
                DESIGN BY TASTY TATERS - © 2022. ALL RIGHTS RESERVED.
            </p>
            </div>
        </footer>
    </div>
  )
}

export default Footer
