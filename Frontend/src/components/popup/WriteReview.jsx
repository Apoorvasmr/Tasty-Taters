import React from 'react'
import Icon from '../../assets/img/Icon ionic-ios-close-circle.png'
import Heart from '../../assets/img/Icon awesome-heart.png'
import Heartt from '../../assets/img/Icon awesome-heart.png'
import RedHeart from '../../assets/img/heart.png'
import Thumbs from '../../assets/img/thumbs-down.png'
import API from '../../API'
import { useState } from 'react'

const api=new API ();

const WriteReview = ({ selectedItemId, setSelectedItemId, setShowWriteReview }) => {
    const [likeCount, setLikeCount] = useState(1),
        [name, setName] = useState(''),
        [body, setBody] = useState('');

    const inputName = event => {
        setName(event.target.value);
    };

    const inputBody = event => {
        setBody(event.target.value);
    };

    const sendReviewButton = () => {
        api.writeReview(selectedItemId, name, body, likeCount).then((review) => {
          alert("Your review has been sent. Thank you for your review!");
          setName("");
          setBody("");
          setLikeCount(1);
          setSelectedItemId(null);
          setShowWriteReview(false);
        });
      };

  return (
    <div>
          <form className="popup">
        <div className="popup-inner">
            <img src={Icon} onClick={()=>setShowWriteReview(false)} className="close"/>
            <div className="input">
                <h1>Write Review</h1>
                <h3>Choose Your Thoughts</h3>
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
                <div className="send">
                <input onChange={inputName} type="text" name="name" placeholder="Enter your name" required />
            <textarea onChange={inputBody} name="body" placeholder="Enter your review" required></textarea>
            <button onClick={sendReviewButton}>Send Review</button>
                </div>
            </div>
        </div>
    </form>

   
    </div>
  );
};

export default WriteReview
