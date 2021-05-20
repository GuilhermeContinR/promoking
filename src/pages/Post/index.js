import React, {useEffect, useState} from 'react';
import './styles.css'
import { db } from '../../services/firebase';
import firebase from 'firebase';
function Post({ postId,user,username, caption,imageUrl,userComment, text}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    useEffect( () => {
       
        let unsubscribe;

        if(postId){
        
        unsubscribe = db
            .collection("post")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp','desc')
            .onSnapshot( (snapshot) => {
                setComments(snapshot.docs.map( (doc) => doc.data()))
            })
        }

        return () => {
            unsubscribe();
        }
    },[postId])

    const postComment = (e) => {
        e.preventDefault();
        db.collection("post").doc(postId).collection("comments").add({
            text:comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('')
    }

    return (
        <div className="post">

            {/* <div className="post__header"> */}
                {/* <Avatar
                    className="post__avatar"
                    alt='User'
                    src="/static/images/avatar/1.jpg"
                /> */}
                {/* <h3>{username}</h3> */}
            {/* </div> */}
            <img
                src={imageUrl}
                className="post__image"
                alt=""
            ></img>
            <h4 className="post__text"> <strong>{username}</strong> {caption}</h4>
            <div className="post__bottom">
                         {
                comments.map( (value,index) => {
                    return(
                        <p key={index} >
                            <strong className="post__comments">{value.username}</strong> {value.text}
                        </p>
                    )
                })
            }
            </div>  
            {
                user && ( <form className="post__commentBox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Adicionar Comentários..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <button className="post_button" onClick={postComment}
                        type="submit" disabled={!comment}
                    >
                        Enviar
                </button>
                </form>
               
                )}
           
        </div>
    )

}

export default Post