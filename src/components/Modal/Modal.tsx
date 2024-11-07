import './styles.css';
import { IModalProps } from './types';

const Modal = ({ product, onClose }: IModalProps) => {
    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal">
                <button className="button" onClick={onClose}>Закрыть</button>
                <div className="modal-content">
                    <div className="modal-text">
                        <h2 className="modal-title">{product.name}</h2>
                        <p className="modal-description">{product.description}</p>
                        <p className="modal-p">Категория: {product.category}</p>
                        <p className="modal-p">Количество: {product.quantity}</p>
                        <p className="modal-p">Единица: {product.unit}</p>
                    </div>

                    {product.image ? (
                        <img className="product-image" src={product.image} alt={product.name} />
                    ) : (
                        <p className="no-image">Изображение отсутствует</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Modal;
