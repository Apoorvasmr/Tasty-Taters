import React, { useState } from 'react'
import Heart from "../../assets/img/heart.png"
import { useDispatch } from 'react-redux'
import {addCart,increaseCart,decreaseCart} from "../../reducks/carts/operations"
import WriteReview from '../popup/WriteReview'
import Review from '../popup/Review'

const Item = props => {
    const close = () => {
        setSelectedItemId(props.item.id);
        setShowReview(false)
        console.log('asdfghjkll',showReview);
    }
    const[selectedItemId, setSelectedItemId]=useState(props.selectedItemId);
    const[showReview, setShowReview]=useState(props.setReviews);
    const[showWriteReview, setShowWriteReview]=useState(props.setShowWriteReview);

    const dispatch=useDispatch();
    const clickAddCart=()=>{
        dispatch(addCart(props.item));
    };
    const clickPlusCart=()=>{
        dispatch(increaseCart(props.item));
    };
    const clickMinusCart=()=>{
        dispatch(decreaseCart(props.item));
    };
    const clickCheckReview=()=>{
        setSelectedItemId(props.item.id);
        setShowReview(true);
    };
    const clickWriteReview=()=>{
        setSelectedItemId(props.item.id);
        setShowWriteReview(true);
    }; 

       
  return (
      
    <div>
        
            <div className="items">
                <img src={props.item.image} alt=""/>
                <div className="details">
                    <div className="like">
                         <img src={Heart} className="heart" alt=""/>
                        <p>({props.item.total_like_count})</p>
                    </div>
                    <h2>{props.item.name} </h2>  
                    <div className="details-sub">
                        <a onClick={()=>clickWriteReview(true)}>Write Review</a>
                        <a onClick={()=>clickCheckReview(true)}>Check Review</a>
                    </div>
                    <div className="details-price">
                        {props.selected_count===0?(
                            <button onClick={clickAddCart}>Add To Cart</button>   
                        ):(
                            <button>
                                <span onClick={clickMinusCart}>-</span>
                                <span>{props.selected_count}</span>
                                <span onClick={clickPlusCart}>+</span>
                            </button>
                        )
                    }
                        
                        <h3 className="price">${props.item.price}</h3>
                    </div>
                </div>
        
            
        
            
        </div> 
        {showWriteReview && (
            <WriteReview
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
                setShowWriteReview={setShowWriteReview}
            />
        )}
         {showReview && (
            <Review
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
                setShowReview={setShowReview}
                close = {close}
            />
        )}
    </div>
  );
};


export default Item;

