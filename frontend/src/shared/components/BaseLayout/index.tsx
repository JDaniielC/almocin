import {
  AppBar, Divider, Drawer,
  IconButton, List, ListItemButton,
  ListItemIcon, ListItemText, Toolbar
} from "@mui/material";
import { BaseLayoutProps } from "../../types/components-props";
import { useCallback, useContext, useEffect, useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./index.module.css";
import { LogoutOutlined } from "@mui/icons-material";
import { UserContext } from "../../../app/admin/context/userContext";

const BaseLayout = ({ children, titlePage, listItem}: BaseLayoutProps) => {
  const { service, state } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen(!open)
  }, [open])

  useEffect(() => {
    state.logoutRequestStatus.maybeMap({
      succeeded: () => {
        window.location.href = '/login'
      }
    })
  }, [state.logoutRequestStatus])

  const logout = useCallback(() => {
    service.logout();
  }, [service])

  return (
    <>
      <AppBar
        position="absolute"
        sx={{flexDirection: 'row', padding: '.5rem 1rem', alignItems: 'center'}}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
          data-cy="menu-button"
        >
          <MenuIcon />
        </IconButton>
        <h1>{titlePage}</h1>
      </AppBar>
      <Drawer open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <h1>Menu</h1>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" sx={
          { height: '100%', display: 'flex', flexDirection: 'column' }
        }>
          {listItem.map((item, index) => (
            <ListItemButton key={index} href={item.url} sx={
              {maxHeight: '3rem'}
            }>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
          <ListItemButton onClick={logout} sx={
            {color: 'red', width: '100%', position: 'absolute', bottom: 0}
          }>
            <ListItemIcon>
              <LogoutOutlined sx={
                {color: 'red'}
              } />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </List>
      </Drawer>
      <main className={styles.container}>
        {children}
      </main>
    </>
  );
};

export default BaseLayout;