import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCategory, Category, deleteCategory, updateCategory} from '../../types/Category';
import {
    Box,
    Button,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {RootState} from "../../app/store";

const CategoryManagement: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [name, setName] = useState<string>('');
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);

    const openModal = (category: Category | null = null): void => {
        setCurrentCategory(category);
        setName(category ? category.name : '');
        setModalOpen(true);
    };

    const closeModal = (): void => {
        setModalOpen(false);
        setCurrentCategory(null);
    };

    const handleAddOrEdit = (): void => {
        if (!name.trim()) {
            alert('Название категории не может быть пустым');
            return;
        }
        if (currentCategory) {
            dispatch(updateCategory({...currentCategory, name}));
        } else {
            dispatch(addCategory({id: new Date().toISOString(), name}));
        }
        closeModal();
    };

    const handleDelete = (id: string): void => {
        if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
            dispatch(deleteCategory(id));
        }
    };

    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4" gutterBottom>Управление категориями</Typography>
            <Button variant="contained" onClick={() => openModal()} color="primary" sx={{mb: 2}}>
                Добавить категорию
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название категории</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell component="th" scope="row">
                                        {category.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton edge="end" onClick={() => openModal(category)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton edge="end" onClick={() => handleDelete(category.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    Нет категорий
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={isModalOpen} onClose={closeModal}>
                <Box sx={{p: 4, bgcolor: 'background.paper', margin: 'auto', maxWidth: 400, mt: 8}}>
                    <Typography variant="h6" gutterBottom>
                        {currentCategory ? 'Редактировать категорию' : 'Новая категория'}
                    </Typography>
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
