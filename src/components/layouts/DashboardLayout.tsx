'use client';

import { useState, ReactNode } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Business as BusinessIcon,
  History as HistoryIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '@/providers/AppProvider';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 280;

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * DashboardLayout component providing navigation and structure
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @returns {JSX.Element} Dashboard layout
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useApp();
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Filaments', icon: <InventoryIcon />, path: '/filaments' },
    { text: 'Manufacturers', icon: <BusinessIcon />, path: '/manufacturers' },
    { text: 'Usage History', icon: <HistoryIcon />, path: '/history' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            SpoolKeeper
          </Typography>
          <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}>
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              aria-label="toggle theme"
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
            transform: open ? 'none' : `translateX(-${drawerWidth}px)`,
            transition: theme.transitions.create('transform', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Toolbar sx={{ minHeight: 64 }} />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={pathname === item.path}
                  sx={{
                    borderRadius: 1,
                    py: 1.5,
                    px: 2,
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.primary.alpha12,
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                  onClick={() => router.push(item.path)}
                >
                  <ListItemIcon
                    sx={{
                      color: pathname === item.path ? theme.palette.primary.main : theme.palette.text.secondary,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      '& .MuiTypography-root': {
                        color: pathname === item.path ? theme.palette.primary.main : theme.palette.text.primary,
                        fontWeight: pathname === item.path ? 600 : 400,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${open ? drawerWidth : 0}px)`,
          marginLeft: open ? 0 : `-${drawerWidth}px`,
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
} 