import React from 'react'
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import Item from '../components/common/Item'
import Review from '../components/popup/Review'
import WriteReview from '../components/popup/WriteReview'
import { useDispatch,useSelector } from 'react-redux'
import {fetchItems} from "../reducks/items/operations"
import { getItems } from '../reducks/items/selectors'
import { getCarts,getSubtotal} from "../reducks/carts/selectors"
import { fetchFromLocalStorage } from '../reducks/carts/operations'
import queryString from "query-string"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {push} from 'connected-react-router'
const Home = () => {
    const parsed = queryString.parse(window.location.search);
    const [showWriteReview, setShowWriteReview] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [showCartList, setShowCartList] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const items = getItems(selector);
    const carts = getCarts(selector);
    const subtotal = getSubtotal(selector);
    const [temp,  setTemp]=useState('')
    const all =() => {
        dispatch(push('/'))
        setTemp('sdfhgj')
    }
    const hot =() => {
        dispatch(push('/?category=hot'))
        setTemp('dfghj')
    }
    const cold =() => {
        dispatch(push('/?category=cold'))
        setTemp('dfghfgh')
    }
    const bagel =() => {
        dispatch(push('/?category=bagel'))
        setTemp('dfghjkk')
    }

    useEffect(() => {
        dispatch(fetchFromLocalStorage());
        dispatch(fetchItems(parsed.category));
    }, [temp]);

    const showItem = item => {
        let selected_count = 0;
        if (carts[item.id] && carts[item.id].selected_count) {
            selected_count = carts[item.id].selected_count;
        }
        if (showCartList && carts[item.id] === undefined) {
            // if the page is cart page and item is not slected, show nothing.
            return;
        }
        return (
            <div>
                <Item
                    key={item.id}
                    item={item}
                    selected_count={selected_count}
                    setShowWriteReview={setShowWriteReview}
                    setShowReview={setShowReview}
                    setSelectedItemId={selectedItemId}
                />
            </div>
        );
    };
  return (
    <div>
        <Header/>
    <div className="menu">
        {showCartList?(
            <h2 className="title"> Cart</h2>
        ):(

            <>
                    <h2 className="title"> Our Most Popular Recipes</h2>
                    <p>Try Our Most Delicious foods and it usually takes minutes to deliver
                    </p>

                    <div className="btn">


                        <a onClick={all}  className="btn btn-secondary" > ALL</a>
                        <a onClick={hot} className="btn btn-secondary">HOT</a>
                        <a onClick={cold} className="btn btn-secondary">COLD</a>
                        <a onClick={bagel} className="btn btn-secondary">BAGEL</a>
                    </div>
            
                
            </>    
        )} 
        <div className="container">{items && items.map(item=>showItem(item))} </div>
      </div> 
         <Footer price={subtotal} showCartList={showCartList} setShowCartList={setShowCartList} />
         {showWriteReview && (
             <WriteReview
                selectedItemId={selectedItemId} 
                setSelectedItemId={setSelectedItemId}
                setShowWriteReview={setShowWriteReview}
             />

        )} 
    </div>
  );
};

export default Home
