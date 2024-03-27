import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, styled, useTheme, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

import { TouchpointBadge, SideDrawer } from 'components';
import { Logo } from 'images';
import { Person } from '@mui/icons-material';

import { sessionHooks } from 'hooks';
import { constants } from 'utils';

const linkStyle = ({ theme }) => {
  return {
    borderBottom: '1px solid transparent',
    color: theme.palette.primary.contrastText,
    curosr: 'pointer',
    display: 'flex',
    fontSize: '1.25rem',
    margin: `0 ${theme.spacing(4)}`,
    paddingBottom: theme.spacing(1),
    textDecoration: 'none',
    '&:hover': {
      borderBottom: `1px solid ${theme.palette.secondary.main}`,
      color: theme.palette.secondary.main,
      curosr: 'pointer',
    },
    '& p': {
      paddingLeft: theme.spacing(1),
    },
  };
};
const StyledExternalLink = styled('a')(linkStyle);
const StyledRouterLink = styled(Link)(linkStyle);

export function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: role } = sessionHooks.useSessionRole();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/">
          <Box
            component="img"
            sx={{ cursor: 'pointer', height: '2.5rem', maxHeight: { xs: '2rem', sm: '2.5rem' } }}
            alt="Logo"
            src={Logo}
          />
        </Link>
        <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto' }}>
          {isMobile ? (
            <SideDrawer />
          ) : (
            <>
              <StyledRouterLink to="/home">
                <HomeIcon />
                <Typography>Home</Typography>
              </StyledRouterLink>
              
              {/* WRISTBAND_TOUCHPOINT - AUTHORIZATION */}
              {role.name === constants.OWNER_ROLE && (
                <StyledRouterLink to="/admin">
                  <Person />
                  <Typography>Admin</Typography>
                </StyledRouterLink>
              )}
              <StyledRouterLink to="/settings">
                <SettingsIcon />
                <Typography>Settings</Typography>
              </StyledRouterLink>
              <TouchpointBadge
                anchor={{ vertical: 'bottom', horizontal: 'left' }}
                sxStyle={{ bottom: '-10%', fontSize: '10px', height: '1rem', left: '50%', width: '7.75rem' }}
              >
                <StyledExternalLink href={`${window.location.origin}/api/auth/logout`}>
                  <LogoutIcon />
                  <Typography>Logout</Typography>
                </StyledExternalLink>
              </TouchpointBadge>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
