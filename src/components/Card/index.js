import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',

    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    promo: {
        textDecorationLine: "line-through"
    },
    fontPreco:{
        fontSize:34
    }
}));

export default function RecipeReviewCard({ imageUrl, caption, username }) {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={imageUrl} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {caption}
                                </Typography>
                                {/* <Typography variant="body2" color="textSecondary" gutterBottom className={classes.promo}>
                                    R$ 40,31
                                </Typography> */}
                                <Typography variant="body2" className={classes.fontPreco}>
                                    R$ 40,31
                                </Typography>
                            </Grid>

                            <Grid item container spacing={1}>
                                <Grid item xs={2}>
                                    <Typography gutterBottom variant="body2" style={{ cursor: 'pointer', color:"#1796d0"}}>
                                        0 Comentários
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="body2" style={{ cursor: 'pointer', border: '1px solid #CCC', color:"#1796d0",borderRadius:3, textAlign:"center"}}>
                                        Ir Para Amazon
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    Usuario
                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}