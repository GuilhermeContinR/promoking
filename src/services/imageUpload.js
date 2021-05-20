import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { storage, db } from './firebase'
// import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';
import './imageUpload.css';
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[3],
        padding: theme.spacing(2, 4, 3),
    },
    p10: {
        margin: theme.spacing(1),
    },
}));
// 2:44:52

function ImageUpload({username}){

    const classes = useStyles();

    const [image, setImage] = useState([]);
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);


    const handleChange = async (e) =>{
        console.log(e.target.files[0]);
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = async (e) => {

        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                // progress
                 const progress = Math.round(
                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                 );
                 setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then( url => {
                    db.collection("post").add({
                        // firebase.firestore.fieldValue.serverTimeStamp()
                        timestamp: Math.floor(Date.now() / 1000) ,
                       caption:caption,
                       imageUrl: url,
                       username:username,
                    });

                    setProgress(0);
                    setCaption("");
                    setImage(null);

                });
            }
        )
    }

    return(
        <div className="imageUpload">
            <progress className="progress" value={progress} max="100" />
            <TextField
                label="Caption"
                type="text"
                value={caption}
                onChange={e => { setCaption(e.target.value) }}
                variant="outlined"
                m={2}
                className={classes.p10}
            />
            <input
                type="file"
                onChange={handleChange}
                className={classes.p10}
            />
            <Button variant="contained" color="primary" onClick={handleUpload}
                className={classes.p10}
               
            >
                Upload
            </Button>
        </div>
    )


}

export default ImageUpload;