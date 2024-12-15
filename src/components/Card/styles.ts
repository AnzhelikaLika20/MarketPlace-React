import { styled } from '@mui/system';
import {Card, DialogContent, Typography} from '@mui/material';

export const ProductCardContainer = styled(Card)({
    width: 200,
    padding: '1rem',
    border: '1px solid #E1D5D9',
    borderRadius: '8px',
    backgroundColor: 'white',
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

export const ProductTitleModal = styled(Typography)({
    position: 'relative',
    padding: '1rem',
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
    maxWidth: '900px',
    width: '100%',
    boxSizing: 'border-box',
    fontWeight: 'bold',
    '& img': {
        marginTop: '1rem',
        height: '200px',
        width: '200px',
        paddingBottom: '2rem',
    },
    height: '100%',
    maxHeight: '500px',
    alignItems: 'center',
});