import { styled } from '@mui/system';
import { Button } from '@mui/material';

export const SidebarContainer = styled('div')({
    width: 250,
    padding: '1rem',
    overflow: 'hidden',
    backgroundColor: '#f4f4f4',
    borderRight: '1px solid #ddd',
    boxSizing: 'border-box',
    transition: 'width 0.3s ease',
});

export const HeadersLabel = styled('label')({
    display: 'block',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    color: 'black',
    fontWeight: 'bold',
});

export const SearchContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
});

export const SearchButton = styled(Button)({
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: 'purple',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: 'rebeccapurple',
    },
});