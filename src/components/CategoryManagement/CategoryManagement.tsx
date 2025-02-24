import React, {useEffect, useState} from 'react';
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
import {Category} from "../../types/Category.ts";

const API_URL = 'http://localhost:5000/api/categories';

const CategoryManagement: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Получение категорий
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch categories');
            const data = await response.json();
            setCategories(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Открытие модалки
    const openModal = (category: Category | null = null) => {
        setCurrentCategory(category);
        setName(category ? category.name : '');
        setModalOpen(true);
    };

    // Закрытие модалки
    const closeModal = () => {
        setModalOpen(false);
        setCurrentCategory(null);
    };

    // Добавление/обновление категории
    const handleAddOrEdit = async () => {
        if (!name.trim()) {
            alert('Название категории не может быть пустым');
            return;
        }

        try {
            const method = currentCategory ? 'PUT' : 'POST';
            const url = currentCategory ? `${API_URL}/${currentCategory._id}` : API_URL;

            const response = await fetch(url, {
                method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name}),
            });

            if (!response.ok) {
                throw new Error('Failed to save category');
            }

            await fetchCategories(); // Обновление списка после сохранения
            closeModal();
        } catch (err) {
            console.error('Error saving category:', err);
        }
    };

    // Удаление категории
    const handleDelete = async (id: string) => {
        if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
            try {
                const response = await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
                if (!response.ok) {
                    throw new Error('Failed to delete category');
                }
                await fetchCategories();
            } catch (err) {
                console.error('Error deleting category:', err);
            }
        }
    };

    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4" gutterBottom>Управление категориями</Typography>
            <Button variant="contained" onClick={() => openModal()} color="primary" sx={{mb: 2}}>
                Добавить категорию
            </Button>

            {loading && <Typography>Загрузка категорий...</Typography>}
            {error && <Typography color="error">{error}</Typography>}

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
                                <TableRow key={category._id}>
                                    <TableCell component="th" scope="row">
                                        {category.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton edge="end" onClick={() => openModal(category)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton edge="end" onClick={() => handleDelete(category._id)}>
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
