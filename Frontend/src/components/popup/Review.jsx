import React, { useEffect, useState } from 'react'
import Icon from '../../assets/img/Icon ionic-ios-close-circle.png'
import Heart from '../../assets/img/Icon awesome-heart.png'
import Heartt from '../../assets/img/Icon awesome-heart.png'
import RedHeart from '../../assets/img/heart.png'
import Thumbs from '../../assets/img/thumbs-down.png'
import API from '../../API'
import { useDispatch } from 'react-redux';
import close  from '../common/Item'

const api= new API();
const Review = props => {
    console.log('reviews', props);
    const [reviews, setReviews] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(props.selectedItemId);
    const dispatch = useDispatch()

    const [likeCount, setLikeCount] = useState(1),
    [name, setName] = useState(''),
    [body, setBody] = useState('');

    let temp = props.selectedItemId;
    const [showReviews, setShowReview] = useState();
    useEffect((selectedItemId, setSelectedItemId) => {
        api.getReviews(temp).then(reviews => {
            setReviews(reviews);
            console.log('useeffect', reviews);
        });
    }, []);

    const getImgReaction=like_count=>{
        switch(like_count){
            case 1:
                return Heart ;
            case 2:
                return Heartt;
            case 3:
                return RedHeart;
            default:
                return Thumbs;

        }
    };
    
  return (
    <div>
      <form className="popup">
        <div className="popup-inner">
   
            <img src={Icon} onClick={props.close} className="close"/>
            <div className="input">
                <h1>Reviews</h1>
           
            <div className="buttons">
                        <button>
                            {likeCount === 1 ? (
                                <img src={Heart} className="selected" onClick={() => setLikeCount(1)} alt="" />
                            ) : (
                                <img src={Heart} onClick={() => setLikeCount(1)} alt="" />
                            )}
                             <p>GOOD</p>
                        </button>
                        <button>
                            {likeCount === 2 ? (
                                <img src={Heartt} className="selected" onClick={() => setLikeCount(2)} alt="" />
                            ) : (
                                <img src={Heartt} onClick={() => setLikeCount(2)} alt="" />
                            )}
                             <p>VERY GOOD</p>
                        </button>
                        <button>
                            {likeCount === 3 ? (
                                <img src={RedHeart} className="selected" onClick={() => setLikeCount(3)} alt="" />
                            ) : (
                                <img src={RedHeart} onClick={() => setLikeCount(3)} alt="" />
                            )}
                             <p>EXCELLENT</p>
                        </button>
                        <button>
                            {likeCount === 4 ? (
                                <img src={Thumbs} className="selected" onClick={() => setLikeCount(4)} alt="" />
                            ) : (
                                <img src={Thumbs} onClick={() => setLikeCount(4)} alt="" />
                            )}
                             <p>NOT GOOD</p>
                        </button>
                    </div>

            <div className="input">
            {reviews && reviews.map(review=>  (
            
                
                    <>
                        <div className="sendd">
                            <div className='rev'>
                                <img src={getImgReaction(review.like_count)} alt=""/>
                                <input type="text" name="name" value={review.name}/><br/>
                            </div>
                            <input type="text" name="textarea" value={review.body}/><br />  
                        </div>
                    </> 
                ))}     
            </div>
        </div>
        </div>
    </form>
    </div>
  )
}

export default Review
