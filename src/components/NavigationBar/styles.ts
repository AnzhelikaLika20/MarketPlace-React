import { styled } from '@mui/system';
import { Card, Typography, DialogContent } from '@mui/material';

export const ProductCardContainer = styled(Card)({
    width: 200,
    padding: '1rem',
    border: '1px solid #E1D5D9',
    borderRadius: '8px',
    backgroundColor: '#E1D5D9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.1)',
    },
});

export const ProductTitle = styled(Typography)({
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

export const ProductCategory = styled(Typography)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '0.5rem',
    color: 'textSecondary',
});

export const CustomDialogContent = styled(DialogContent)({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '800px',
    width: '100%',
    padding: '2rem',
    boxSizing: 'border-box',
    '& img': {
        marginTop: '1rem',
        maxWidth: '100%',
        height: 'auto',
    },
});

export const ProductTitleModal = styled(Typography)({
    fontWeight: 'bold',
    padding: '1rem',
});