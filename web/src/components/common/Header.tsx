import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import ContactsIcon from '@material-ui/icons/Contacts';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const Header:React.FC = () => {
    const classes = useStyles();
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={'subtitle1'} className={classes.root}>
                        <ContactsIcon></ContactsIcon>
                        <span>Phone Book</span>
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Header;