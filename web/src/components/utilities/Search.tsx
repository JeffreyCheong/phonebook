import { IconButton, InputBase, makeStyles, Paper, Theme } from '@material-ui/core';
import React, { useContext } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { searchContext } from '../../providers/SearchProvider';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      justifyContent: 'center',
      justifyItems: 'center',
      alignItems: 'center',
      width: 400,
    },
    input: {
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }));
  
const Search: React.FC = () => {
    const classes = useStyles();
    const { handleSearchData } = useContext(searchContext);

    return (
        <>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Search Contacts"
                    inputProps={{ 'aria-label': 'search contacts' }}
                    onChange={(event) => {
                      console.log('Searching ...');
                      let query = event.target.value.replace(/[|\\{}()[\]^$%#+*?.]/g, '');
                      handleSearchData(query);
                      event.persist();
                    }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>                
            </Paper>
        </>
    )
}

export default Search;
