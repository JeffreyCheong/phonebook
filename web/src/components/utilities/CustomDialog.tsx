import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import * as yup from 'yup';

interface CustomDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    execute?: any;
    loading?: any;
    isEdit?: boolean;
    editData?: any;
}

interface FormData {
    lastName: string;
    firstName: string;
    contactNo: string;
  }
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

let schema = yup.object().shape({
    lastName: yup.string().required(),
    firstName: yup.string().required(),
    contactNo: yup.string().matches(phoneRegExp, 'Phone number is not valid').required()
  });

const useStyles = makeStyles(() => ({
    root: {

    }
}));

const CustomDialog: React.FC<CustomDialogProps> = (props: CustomDialogProps) => {
    const classes = useStyles();
    const {open, setOpen, execute, loading, isEdit, editData} = props;
    const [data, setData] = useState<FormData>({
        firstName: isEdit ? editData.firstName: '',
        lastName: isEdit ? editData.lastName: '',
        contactNo: isEdit ? editData.contactNo: ''
    })
    

    const handleClose = () => {
        setOpen(false);
    }

    const onSubmit = () => {
        schema.validate(data).then((res) => {
            execute({
                data: res
            }, {
                method: isEdit ? 'PUT': 'GET'
            });
            handleClose();
        }).catch((err) => {
            console.log('err: ', err);
            alert(err);
        })
    }

    return (
        <>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.root}>
        <DialogTitle id="form-dialog-title">{isEdit ? 'Edit Contact': 'New Contact'}</DialogTitle>
            <DialogContent>
                {loading && (<>Loading...</>)}
                {!loading && (
                    <>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="text"
                    value={data.lastName}
                    fullWidth
                    onChange={(event) => {
                        setData(prev => ({
                            ...prev, 
                            lastName: event.target.value
                        }));
                        event.persist();
                    }}
                />
                <TextField  
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="text"
                    value={data.firstName}
                    fullWidth
                    onChange={(event) => {
                        setData(prev => ({
                            ...prev, 
                            firstName: event.target.value
                        }));
                        event.persist();
                    }}
                />
                <TextField
                    margin="dense"
                    id="contactNo"
                    label="Contact No"
                    type="text"
                    fullWidth
                    value={data.contactNo}
                    onChange={(event) => {
                        setData(prev => ({
                            ...prev, 
                            contactNo: event.target.value
                        }));
                        event.persist();
                    }}
                />
                    </>
                )}
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onSubmit} color="primary">
                    {isEdit ? 'Edit': 'Add New'}
                </Button>
            </DialogActions>
        </Dialog>            
        </>
    )
}

export default CustomDialog;