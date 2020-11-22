import { Button, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

interface CustomButtonProps {
    content: string;
    btnFunction?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {

    }
}));

const CustomButton: React.FC<CustomButtonProps> = (props: CustomButtonProps) => {
    const classes = useStyles();
    const { content, btnFunction } = props;

    return (
        <>
            <Button className={classes.root} 
                variant={"contained"}
                color={"primary"} 
                onClick={btnFunction}
            >
                {content}
            </Button>
        </>
    )
}

export default CustomButton;