import { styled } from '@mui/system';

export const Nav = styled('nav')({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1C252C',
    color: '#E1D5D9',
    padding: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
});

export const NavItem = styled('span')({
    cursor: 'pointer',
    padding: '0 1rem',
    '&:hover': {
        color: '#B7A7AE',
    },
});