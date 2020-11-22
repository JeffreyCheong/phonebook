import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import useAxios from 'axios-hooks';
import React, { useState } from 'react';
import CustomButton from '../components/utilities/CustomButton';
import CustomDialog from '../components/utilities/CustomDialog';
import PhoneList from '../components/utilities/PhoneList';
import Search from '../components/utilities/Search';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

const Main:React.FC = () => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);

    const [{ data: contactData, loading: contactLoading}, contactExecute] = useAxios({
        url: 'http://localhost:5000/api/contacts/',
        method: 'POST',
      },
        {manual: true}
    )

    return (
        <>
            <Grid container>
                <Grid item xs={12} className={classes.root}>
                    <Typography variant={'h5'} style={{marginRight: 165}}>Contacts</Typography>
                    <CustomButton content={'Add a contact'} btnFunction={() => {setOpen(true)}} />
                </Grid>
                <Grid item xs={12} className={classes.root}>
                    <Search />
                </Grid>
                <Grid item xs={12} className={classes.root}>
                    <PhoneList contactData={contactData} />
                </Grid>
            </Grid>
            <CustomDialog open={open} setOpen={setOpen} execute={contactExecute} loading={contactLoading} isEdit={false}/>
        </>
    )
}

export default Main;