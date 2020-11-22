import { Grid, IconButton, ListItem, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import useAxios from 'axios-hooks';
import React, { useContext, useEffect, useState } from 'react';
// import { ListChildComponentProps } from 'react-window';
import { searchContext } from '../../providers/SearchProvider';
import DeleteIcon from '@material-ui/icons/Delete';
import PhoneIcon from '@material-ui/icons/Phone';
import EditIcon from '@material-ui/icons/Edit';
import CustomDialog from './CustomDialog';

interface PhoneListProps {
    contactData: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: 400,
        // backgroundColor: theme.palette.background.paper,
    },
    list: {
        // border: '1px solid',
        boxShadow: '0px 0px 1px 2px rgba(0,0,0,0.75)',
        lineHeight: '1.1876em',
        letterSpacing: '0.00938em',
    }
}));

// function RenderRow(props: ListChildComponentProps) {
//     const { index, style, data } = props;
//     console.log(data)
//     return (
//       <ListItem button style={style} key={index}>
//         <ListItemText primary={`Item ${index + 1}`} />
//       </ListItem>
//     );
//   }

const PhoneList: React.FC<PhoneListProps> = (props: PhoneListProps) => {
    const classes = useStyles();
    const {contactData} = props;
    const {searchData} = useContext(searchContext);
    const [contacts, setContacts] = useState<Array<object>>([]);
    const [editContact, setEditContact] = useState<string>('');
    const [deleteContact, setDeleteContact] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const [{ data, loading }, execute] = useAxios({
        url: 'http://localhost:5000/api/contacts/',
        method: 'GET'
    });

    const [{ data: editData, loading: editLoading }, editExecute] = useAxios({
        url: `http://localhost:5000/api/contact/${editContact}`,
        method: 'GET'
    },{ 
        manual: true
    });

    const [{ data: putData},putExecute] = useAxios({
        url: `http://localhost:5000/api/contact/${editContact}`,
        method: 'PUT'
    },{ 
        manual: true
    });

    const [{data: searchedData }, searchedExecute] = useAxios({
        url: `http://localhost:5000/api/contacts/${searchData}`,
        method: 'GET'
    }, {
        manual: true
    });
    
    const [, deletedExecute] = useAxios({
        url: `http://localhost:5000/api/contact/${deleteContact}`,
        method: 'DELETE'
    }, {
        manual: true
    });

    useEffect(() => {
        if(data) {
            console.log('data');
            setContacts(data);
        }
    }, [data])

    useEffect(() => {
        if(searchedData) {
            console.log('searchedData');
            setContacts(searchedData);
        }
    }, [searchedData])
    
    useEffect(() => {
        if(searchData) {
            console.log('searchData');
            searchedExecute();
        } else if(!searchData){
            execute();
        }
    }, [execute, searchData, searchedExecute])
    
    useEffect(() => {
        console.log('execute');
        if(contactData) {
            execute();
        }
    }, [contactData, execute])

    useEffect(() => {
        if(deleteContact) {
            deletedExecute();
            execute();
        }
    }, [deleteContact, deletedExecute, execute])

    useEffect(() => {
        if(editContact) {
            editExecute();
        }
    }, [editContact, editExecute])

    useEffect(() => {
        if(putData) {
            execute();
        }
    }, [execute, putData])

    if(loading) return (<>Loading...</>);

    return (
        <>
            <div style={{marginTop: 20}}>
                {
                    contacts.map((item: any, key: number) => {
                        const {firstName, lastName, contactNo, _id } = item;
                        return (<ListItem key={key} className={classes.list} style={{width: 400, backgroundColor: 'light-grey'}}>     
                                    <Grid container style={{display: 'flex'}}>
                                        <Grid item xs={10}>
                                            <ListItemText primary={`${firstName} ${lastName} `} />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <IconButton style={{color: 'grey'}} onClick={(event) => {
                                                setOpen(true);
                                                setEditContact(_id);
                                                event.persist();
                                            }}>
                                                <EditIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <IconButton style={{color: 'red'}} onClick={(event) => {
                                                console.log(_id);
                                                setDeleteContact(_id);
                                                event.persist();
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={12} style={{display: 'flex', justifyItems: 'center', alignItems:'center'}}>
                                            <Typography variant="subtitle2" style={{display:'flex', alignItems: 'center', color: 'grey', fontWeight: 'bold', marginTop: '-20px'}}><PhoneIcon style={{fontSize: 20, paddingTop: 5}}/>{contactNo}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                          )
                    })
                }
                {/* <FixedSizeList height={400} width={300} itemSize={35} itemCount={data ? data.length: 0}>
                    {RenderRow}
                </FixedSizeList> */}
            </div>
            {!editLoading && editData ? (<CustomDialog open={open} setOpen={setOpen} execute={putExecute} editData={editData} isEdit={true}/>) : null}
        </>
    )
}

export default PhoneList;