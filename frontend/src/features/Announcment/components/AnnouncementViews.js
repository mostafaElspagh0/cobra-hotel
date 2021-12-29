import React, {useContext, useEffect, useState} from "react";
import {CardActions, Divider, List, ListItem} from "@material-ui/core";
import * as Api from "../api/announcmentApi"
import {CardHeader, Pagination} from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {AuthContext} from "../../auth/context/AuthContext";

export default function AnnouncementViews() {
    let [page, setPage] = useState(1);
    const {getToken} = useContext(AuthContext);
    const [data , setData] = useState({announcements:[],total:0});


    useEffect(
        ()=>{
            console.log(page)
            Api.getAnnouncement(getToken(), page-1).then(res => {
                setData(res.data);
            });
        },
        [page]
    )


    let count = Math.ceil(data.total / 10);


    const handleChange = (e, p) => {
        setPage(p);
    };

    return (
        <Container>
            <Grid container direction={"column"} spacing={3} alignItems={"center"}>
                <Grid item/>
                <Grid item>
                    <Pagination
                        count={count}
                        size={'large'}
                        page={page}
                        onChange={handleChange}
                        variant="outlined"
                        shape="rounded"
                        //onChange={handleChange}
                    />
                </Grid>
                <Grid item>
                    <List p="10" pt="3" spacing={2}>
                        {[data.announcements.map(v => {
                            return (
                                <ListItem key={v.id} >
                                    <Card sx={{ minWidth: "80vw" }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 20 }} gutterBottom>
                                                by {( v.issued_by)?(
                                                        <span>{v.issued_by.name}</span>)
                                                    :"Unknown"}
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                {v.title}
                                            </Typography>

                                            <Typography variant="body2">
                                                {v.body}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </ListItem>
                            );
                        })]}
                    </List>
                </Grid>
                <Grid item>

                    <Pagination
                        count={count}
                        size="large"
                        page={page}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
            <Grid item/>
        </Container>
    );
}
