import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import ImageUpload from '../../services/imageUpload';
import '../../services/imageUpload.css';

const useStyles = makeStyles((theme) => ({
  
    p15: {
        margin: theme.spacing(1),
        // marginRight: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    paperModal: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        // boxShadow: theme.shadows[3],
        padding: theme.spacing(2, 4, 3),
    },
    p10: {
        margin: theme.spacing(1),
    },
}));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function ModalPost({ modalPost, username, handleCloseModal = () => {}}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    
    return(
        <Modal
            open={modalPost}
            onClose={handleCloseModal}
        >
            <div style={modalStyle} className={classes.paperModal}>
                <ImageUpload username={username} />
            </div>
        
        </Modal>
    )

}