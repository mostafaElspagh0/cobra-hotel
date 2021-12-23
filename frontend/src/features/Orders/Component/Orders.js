
import {Fragment} from "react";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Nav from "../../../common/components/Nav";
import Search from "../../../common/components/Search";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Paper} from "@material-ui/core";
import man from "../resource/pexels-photo-206359.jpeg";
import man1 from "../resource/pexels-photo-346529.jpeg";
import man2 from "../resource/pexels-photo-417074.jpeg";
import man3 from "../resource/pexels-photo-443446.jpeg";
import man4 from "../resource/pexels-photo-691668.jpeg";
import man5 from "../resource/pexels-photo-1166209.jpeg";
import man6 from "../resource/pexels-photo-1323550.jpeg";
import man7 from "../resource/pexels-photo-2246476.jpeg";
import man8 from "../resource/pexels-photo-210186.jpeg";
import DeleteIcon from '@mui/icons-material/Delete';



function DeleteForeverIcon() {
    return null;
}

const Orders = () => {
    return (
        <Fragment>
            <Container>

                <Grid container direction="row" xl={12} lg={12} md={12} spacing={5}>
                    <Grid item sm={12}></Grid>


                            <Grid container item  xl={4}  lg={3.5} md={12} display="flex" justifyContent="center">
                              <Button variant="contained" sx={{

                                  width:'120px'
                                }}
                              >
                                  Orders

                              </Button>

                            </Grid>
                            <Grid container item xl={8} lg={8} md={12} display="flex" justifyContent="center">
                                <Search />

                            </Grid>
                </Grid>

                <Grid container direction="row"  spacing={5}>

                    <Grid item  sm={12}></Grid>


                    <Grid container item xl={12} lg={12} md={12} xs={12} direction="row">


                            <Grid container item direction="column" xl={4} lg={3} md={11.5} xs={12} spacing={6} display="flex"  alignItems="center">
                                    <Grid item >
                                        <Paper style={{
                                            minWidth:300,
                                            maxWidth:300,
                                            backgroundColor:'#6FCC75',
                                            border:'solid 1px black',
                                            wordBreak:'break-word',
                                            padding:'15px',

                                        }}>
                                            <Grid container sm={12} >
                                                <Grid item sm={11}>
                                                    <Typography gutterBottom variant="p" component="div">
                                                        Reset<br/>sdfssssssssssssssssssssssssssssssssssssssssssssssssssssss

                                                    </Typography>
                                                </Grid>
                                                <Grid item sm={1}>
                                                    <DeleteIcon />
                                                </Grid>

                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item direction="column" >
                                        <Paper style={{
                                            minWidth:300,
                                            maxWidth:300,
                                            backgroundColor:'#6FCC75',
                                            border:'solid 1px black',
                                            wordBreak:'break-word',
                                            padding:'15px',

                                        }}>
                                            <Grid container sm={12} >
                                                <Grid item sm={11}>
                                                    <Typography gutterBottom variant="p" component="div">
                                                        Reset<br/>sdfssssssssssssssssssssssss
                                                    </Typography>
                                                </Grid>
                                                <Grid item sm={1}>
                                                    <DeleteIcon />
                                                </Grid>

                                    </Grid>
                                </Paper>
                                    </Grid>

                            </Grid>

                        <Grid  container  direction="row"   item xl={6} lg={8} md={12} sm={12} xs={12} rowSpacing={3} columnSpacing={10} sx={{ marginLeft:"-15px"
                        }}>

                            <Grid  item xl={4} lg={4} md={3.5}  xs={6} >
                                <Card sx={{ width: 300
                                }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={man}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Mango
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Grid container sm={12} display="flex" alignItems="baseline" >
                                            <Grid item container sm={9} display="flex" justifyContent="space-around">
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Add</Button>
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Custome</Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Typography gutterBottom variant="h5" component="div" >
                                                    23$
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item  xl={4} lg={4} md={3.5}  xs={6}>
                                <Card sx={{ width: 300 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={man1}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Mango
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Grid container sm={12} display="flex" alignItems="baseline" >
                                            <Grid item container sm={9} display="flex" justifyContent="space-around">
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Add</Button>
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Custome</Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Typography gutterBottom variant="h5" component="div" >
                                                    23$
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xl={4} lg={4} md={3.5}   xs={5.5}>
                                <Card sx={{ width: 300 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={man2}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Mango
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Grid container sm={12} display="flex" alignItems="baseline" >
                                            <Grid item container sm={9} display="flex" justifyContent="space-around">
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Add</Button>
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Custome</Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Typography gutterBottom variant="h5" component="div" >
                                                    23$
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xl={4} lg={4} md={3.5}   xs={5.5}>
                                <Card sx={{ width: 300 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={man3}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Mango
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Grid container sm={12} display="flex" alignItems="baseline" >
                                            <Grid item container sm={9} display="flex" justifyContent="space-around">
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Add</Button>
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Custome</Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Typography gutterBottom variant="h5" component="div" >
                                                    23$
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item  xl={4} lg={4} md={3.5}  xs={5.5}>
                                <Card sx={{ width: 300 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={man4}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Mango
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Grid container sm={12} display="flex" alignItems="baseline" >
                                            <Grid item container sm={9} display="flex" justifyContent="space-around">
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Add</Button>
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Custome</Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Typography gutterBottom variant="h5" component="div" >
                                                    23$
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xl={4} lg={4} md={3.5}  xs={5.5}>
                                <Card sx={{ width: 300 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={man5}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Mango
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Grid container sm={12} display="flex" alignItems="baseline" >
                                            <Grid item container sm={9} display="flex" justifyContent="space-around">
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Add</Button>
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Custome</Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Typography gutterBottom variant="h5" component="div" >
                                                    23$
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xl={4} lg={4} md={3.5}  xs={5.5}>
                                <Card sx={{ width: 300 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={man6}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Mango
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Grid container sm={12} display="flex" alignItems="baseline" >
                                            <Grid item container sm={9} display="flex" justifyContent="space-around">
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Add</Button>
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Custome</Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Typography gutterBottom variant="h5" component="div" >
                                                    23$
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xl={4} lg={4} md={3.5}  xs={5.5}>
                                <Card sx={{ width: 300 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={man7}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Mango
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Grid container sm={12} display="flex" alignItems="baseline" >
                                            <Grid item container sm={9} display="flex" justifyContent="space-around">
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Add</Button>
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Custome</Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Typography gutterBottom variant="h5" component="div" >
                                                    23$
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xl={4} lg={4} md={3.5}  xs={5.5}>
                                <Card sx={{ width: 300 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={man8}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Mango
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Grid container sm={12} display="flex" alignItems="baseline" >
                                            <Grid item container sm={9} display="flex" justifyContent="space-around">
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Add</Button>
                                                <Button size="mediam" sx={{backgroundColor:"#6FCC75", color:"white"}}>
                                                    Custome</Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Typography gutterBottom variant="h5" component="div" >
                                                    23$
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>



            </Container>
        </Fragment>
    );

}
export default Orders;