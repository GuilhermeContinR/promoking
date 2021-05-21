import React, { useState, useEffect } from 'react';
import './styles.css';
// import Post from '../Post/index';
import { db, auth } from '../../services/firebase'
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';
import Card from '../../components/Card';
import ModalPost from '../../components/ModalPost';

const useStyles = makeStyles((theme) => ({
    // paper: {
    //     position: 'absolute',
    //     width: 400,
    //     backgroundColor: theme.palette.background.paper,
    //     border: '2px solid #000',
    //     boxShadow: theme.shadows[3],
    //     padding: theme.spacing(2, 4, 3),
    // },
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
        width: 400,
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[3],
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

function App() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [modalPost, setModalPost] = useState(false)
    const [posts, setPosts] = useState([]);

    const [openSignIn, setOpenSignIn] = useState(false)
    const [open, setOpen] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // logado
                setUser(authUser);
            } else {
                // deslogado
                setUser(null)
            }
        })
        return () => {
            unsubscribe();
        }
    }, [user, username]);


    useEffect(() => {
        db.collection('post').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
           
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        });

    }, []);

    const signUp = async (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message));
    }
    const signIn = async (event) => {
        event.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => { alert(error.message); return false })

        setOpenSignIn(false)
    }

    const handleCloseModal = () => {
        setModalPost(false);
    };

    return (
        <div className="App">

            {
                user?.displayName ? 
                    <ModalPost username={user.displayName} modalPost={modalPost} handleCloseModal={handleCloseModal} /> : null
            }
            

            <Modal
                open={open}
                onClose={() => setOpen(false)} 
            >
                <div style={modalStyle} className={classes.paperModal}>
                    <form className="app__signup">
                        <center className="modal__form">

                            <TextField
                                label="Usuário"
                                type="text"
                                value={username}
                                onChange={e => { setUsername(e.target.value) }}
                                variant="outlined"
                                m={2}
                                className={classes.p10}
                            />

                            <TextField
                                label="E-mail"
                                type="text"
                                value={email}
                                onChange={e => { setEmail(e.target.value) }}
                                variant="outlined"
                                className={classes.p10}
                            />

                            <TextField
                                label="Senha"
                                type="password"
                                value={password}
                                onChange={e => { setPassword(e.target.value) }}
                                variant="outlined"
                                className={classes.p10}
                            />

                            <Button variant="contained" color="primary" onClick={signUp}
                                className={classes.p10}
                                type="submitt"
                            >
                                Registrar
                        </Button>
                        </center>
                    </form>
                </div>
            </Modal>
           
            <div className="app__header">

               
                {
                    user ? 
                    <div className="app__loginContainer">
                            <Button onClick={() => auth.signOut()}>Logout</Button>
                            <Button onClick={() => setModalPost(true)}>Nova Promoção</Button>
                        </div>
                        
                        :
                        <div className="app__loginContainer">
                            <Button onClick={() => setOpenSignIn(true)}>Login</Button>
                            <Button onClick={() => setOpen(true)}>Registrar</Button>
                        </div>

                }


            </div>
            {/* <Card/> */}
            <Grid container direction="row"
                justify="center"
                alignItems="center" >
                {
                    posts.map(({ id, post }) => (

                        <Grid item xs={12} sm={12} md={8} lg={8} key={id}>
                                <Card postId={id} user={user} username={post.username} imageUrl={post.imageUrl} caption={post.caption}/>
                        </Grid>

                    ))
                }
            </Grid>
            {/* <div className="app__posts">
                <div className="app_postsLeft">
                    <div >
                        
                    
                    </div>
                </div>
            </div> */}



           

            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)} 
            >
                <div style={modalStyle} className={classes.paperModal}>
                    <form className="app__signup">
                        <center className="modal__form">
                            <h4 className="app__login">Acessar</h4>
                            <TextField
                                label="E-mail"
                                type="text"
                                value={email}
                                onChange={e => { setEmail(e.target.value) }}
                                variant="outlined"
                                className={classes.p10}
                            />

                            <TextField
                                label="Senha"
                                type="password"
                                value={password}
                                onChange={e => { setPassword(e.target.value) }}
                                variant="outlined"
                                className={classes.p10}
                            />

                            <Button variant="contained" color="primary" onClick={signIn}
                                className={classes.p10}
                                type="submitt"
                            >
                                Login
                        </Button>
                        </center>
                    </form>
                </div>
            </Modal>
        </div>

        
    );
}

export default App;
