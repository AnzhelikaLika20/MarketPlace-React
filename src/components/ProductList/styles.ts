import {styled} from '@mui/system';

export const ProductListContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    width: '100%',
    paddingTop: '1rem',

    '> div': {
        flex: '1 1 calc(100% / 3 - 1rem)',
        maxWidth: 'calc(100% / 3 - 1rem)',
    },
    '@media (min-width: 768px)': {
        '> div': {
            flex: '1 1 calc(100% / 4 - 1rem)',
            maxWidth: 'calc(100% / 4 - 1rem)',
        },
    },
    '@media (min-width: 1024px)': {
        '> div': {
            flex: '1 1 calc(100% / 5 - 1rem)',
            maxWidth: 'calc(100% / 5 - 1rem)',
        },
    },
});

export const PaginationContainer = styled('div')({
    marginTop: '3rem',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: '1rem',
});