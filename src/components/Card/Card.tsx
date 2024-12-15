import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Tooltip,
    Dialog,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { IProductCardProps } from './types.ts';
import './styles.css';

const ProductCard: React.FC<IProductCardProps> = ({ product, onClick }) => {
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
                <Card className="product-card" onClick={handleCardClick}>
                    <CardContent>
                        <Typography variant="h6" component="div" className="product-title">
                            {product.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="div"
                            className="product-category"
                        >
                            {product.category}
                        </Typography>
                    </CardContent>
                    {product.image && (
                        <CardMedia
                            component="img"
                            height="140"
                            image={product.image}
                            alt={product.name}
                            style={{ objectFit: 'cover' }}
                        />
                    )}
                    <CardContent>
                        <Typography variant="body2" component="div">
                            Количество: {product.quantity} {product.unit}
                        </Typography>
                    </CardContent>
                </Card>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{product.name}</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Категория: {product.category}</Typography>
                    <Typography variant="body1" paragraph>
                        {product.description || 'Описание отсутствует'}
                    </Typography>
                    <Typography variant="body1">
                        Количество: {product.quantity} {product.unit}
                    </Typography>
                    {product.image && (
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductCard;