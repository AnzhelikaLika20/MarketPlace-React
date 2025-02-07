import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCategory, Category, deleteCategory, updateCategory} from '../../types/Category.ts';
import {Box, Button, IconButton, List, ListItem, ListItemText, Modal, TextField, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {RootState} from "../../app/store.ts";

const CategoryManagement: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);

    const openModal = (category: Category | null = null) => {
        setCurrentCategory(category);
        setName(category ? category.name : '');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentCategory(null);
    };

    const handleAddOrEdit = () => {
        if (currentCategory) {
            dispatch(updateCategory({...currentCategory, name}));
        } else {
            dispatch(addCategory({id: new Date().toISOString(), name}));
        }
        closeModal();
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
            dispatch(deleteCategory(id));
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Управление категориями</Typography>
            <Button variant="contained" onClick={() => openModal()} color="primary">
                Добавить категорию
            </Button>

            <List>
                {categories.map(category => (
                    <ListItem


                        key={category.id} secondaryAction={
                        <>
                            <IconButton edge="end" onClick={() => openModal(category)}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton edge="end" onClick={() => handleDelete(category.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </>
                    }>
                        <ListItemText primary={category.name}/>
                    </ListItem>
                ))}
            </List>

            <Modal open={isModalOpen} onClose={closeModal}>
                <Box sx={{p: 4, bgcolor: 'background.paper', margin: 'auto', maxWidth: 400, mt: 8}}>
                    <Typography variant="h6"
                                gutterBottom>{currentCategory ? 'Редактировать категорию' : 'Новая категория'}</Typography>
                    <TextField
                        fullWidth
                        label="Имя категории"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                    />
                    <Button variant="contained" onClick={handleAddOrEdit} color="primary" sx={{mr: 2}}>
                        {currentCategory ? 'Сохранить' : 'Добавить'}
                    </Button>
                    <Button variant="outlined" onClick={closeModal}>
                        Отмена
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default CategoryManagement;
