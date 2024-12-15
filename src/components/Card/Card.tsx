import React, {useState} from 'react';
import {CardContent, CardMedia, Dialog, Tooltip, Typography,} from '@mui/material';
import {IProductCardProps} from './types.ts';
import {
    CustomDialogContent,
    ProductCardContainer,
    ProductCategory,
    ProductTitle,
    ProductTitleModal,
} from './styles.ts';

const PlaceholderImagePath = "/src/assets/placeholder.png"

const ProductCard: React.FC<IProductCardProps> = ({product, onClick}) => {
    const [open, setOpen] = useState(false);

    const handleCardClick = () => {
        setOpen(true);
        onClick();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const truncateText = (text: string, length: number) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
        <>
            <Tooltip title={truncateText(product.description || 'Описание отсутствует', 50)}>
                <ProductCardContainer onClick={handleCardClick}>
                    <CardContent>
                        <ProductTitle variant="h6">
                            {product.name}
                        </ProductTitle>
                        <ProductCategory variant="body2">
                            {product.category}
                        </ProductCategory>
                    </CardContent>
                    <CardMedia
                        component="img"
                        image={product.image || PlaceholderImagePath}
                        alt={product.name}
                    />
                    <CardContent>
                        <Typography variant="body2">
                            Количество: {product.quantity} {product.unit}
                        </Typography>
                    </CardContent>
                </ProductCardContainer>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <ProductTitleModal variant="h6">{product.name}</ProductTitleModal>
                <CustomDialogContent>
                    <Typography variant="h6">
                        Категория: {product.category}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {product.description || 'Описание отсутствует'}
                    </Typography>
                    <Typography variant="body1">
                        Количество: {product.quantity} {product.unit}
                    </Typography>
                    {product.image && (
                        <img
                            src={product.image}
                            alt={product.name}
                        />
                    )}
                </CustomDialogContent>
            </Dialog>
        </>
    );
};

export default ProductCard;
