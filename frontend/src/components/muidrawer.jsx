//import * as React from "react";
import React from "react";

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import ArticleIcon from "@mui/icons-material/Article";
import ListItemButton from "@mui/material/ListItemButton";
//import { Link, useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

export default function TemporaryDrawer(props) {
  // eslint-disable-next-line
  const {sideBarOpen, setSideBar = Function.prototype} = props;

  const anchor1 = "left";

  // require('react-dom');
  // window.React2 = require('react');
  // console.log('TemporaryDrawer component: Is this one object react:')
  // console.log(window.React1 === window.React2);

  return (
      <React.Fragment key={anchor1}>
        <ErrorBoundary>

          <Drawer
              anchor="left"
              open={sideBarOpen}
              onClose={setSideBar}
              // color="inherit"
              sx={{fontWeight: 'medium'}}
          >
            <List sx={{with: "400px"}} color="inherit" >
              <ListItem>
                <Typography
                    sx={{
                      variant: 'h6',
                      fontWeight: 'Bold',
                      textTransform: 'uppercase'
                    }}>References</Typography>
              </ListItem>
              <Divider/>

              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <ArticleIcon/>
                  </ListItemIcon>
                  <Link to="/"
                        style={{ textDecoration: 'none', color: 'inherit', font: 'inherit', fontWeight: 'inherit' }}
                  >
                    {/*<ListItemText primary="Home" />*/}

                    <ListItemText
                        sx={{
                          fontWeight: 'Bold',
                          textTransform: 'uppercase' } }
                        //disableTypography
                        primary='Home'
                    />
                  </Link>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <ArticleIcon/>
                  </ListItemIcon>
                  <ListItemText>
                    <Link to="/clients"
                          style={{ textDecoration: 'none', color: 'inherit', font: 'inherit', fontWeight: 'inherit' }}
                    >
                      <ListItemText sx={{
                        fontWeight: 'Bold',
                        textTransform: 'uppercase' } }primary="Clients"></ListItemText>
                    </Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <ArticleIcon/>
                  </ListItemIcon>
                  <Link to="/products"
                        style={{ textDecoration: 'none', color: 'inherit', font: 'inherit', fontWeight: 'inherit' }}
                  >
                    {/*<ListItemText primary="Home" />*/}

                    <ListItemText
                        sx={{
                          fontWeight: 'Bold',
                          textTransform: 'uppercase' } }
                        //disableTypography
                        primary='Products '
                    />
                  </Link>
                </ListItemButton>
              </ListItem>


            </List>
          </Drawer>

        </ErrorBoundary>
      </React.Fragment>
  );
}
