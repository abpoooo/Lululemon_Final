import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {reviewSortBy} from "./reviewHelper";

export default function NestedList() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Sort by:
                </ListSubheader>
            }
        >
            {/* <ListItemButton> */}
            {/* <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" /> */}
            {/* </ListItemButton> */}
            {/* <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton> */}
            <ListItemButton onClick={handleClick}>
                {/*<ListItemIcon>*/}
                {/*    <InboxIcon />*/}
                {/*</ListItemIcon>*/}
                <ListItemText primary={reviewSortBy[0].label}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit
                      sx={{
                          border: '1px solid black',
                          borderRadius: '4px',
                          boxShadow: '0 0 0.375rem rgb(0 0 0 / 45%)'
            }}>
                <List component="div" disablePadding>
                    <ListItemButton sx={{pl: 1, cursor: 'default'}}>
                        {/*<ListItemIcon>*/}
                        {/*    <StarBorder />*/}
                        {/*</ListItemIcon>*/}
                        <ListItemText primary={reviewSortBy[0].label}
                                      sx={{
                                          borderBottom: '1px solid gray',
                                          padding: '5px 5px 10px 5px',
                                          margin: '0 80px 5px 20px'
                                      }}
                        />
                    </ListItemButton>

                    <ListItemButton sx={{pl: 1, cursor: 'default'}}>
                        {/*<ListItemIcon>*/}
                        {/*    <StarBorder />*/}
                        {/*</ListItemIcon>*/}
                        <ListItemText primary={reviewSortBy[1].label}
                                      sx={{
                                          borderBottom: '1px solid gray',
                                          padding: '0 5px 15px 5px',
                                          margin: '0 80px 5px 20px'
                                      }}/>
                    </ListItemButton>

                    <ListItemButton sx={{pl: 1, cursor: 'default'}}>
                        {/*<ListItemIcon>*/}
                        {/*    <StarBorder />*/}
                        {/*</ListItemIcon>*/}
                        <ListItemText primary={reviewSortBy[2].label}
                                      sx={{
                                          borderBottom: '1px solid gray',
                                          padding: '0 5px 15px 5px',
                                          margin: '0 80px 5px 20px'
                                      }}/>
                        {/*<ListItemText primary={reviewSortBy[2].label}/>*/}
                    </ListItemButton>

                    <ListItemButton sx={{pl: 1, cursor: 'default'}}>
                        {/*<ListItemIcon>*/}
                        {/*    <StarBorder />*/}
                        {/*</ListItemIcon>*/}
                        <ListItemText primary={reviewSortBy[3].label}
                                      sx={{padding: '0 5px 10px 5px',
                                          margin: '0 80px 5px 20px'
                                      }}/>
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}
