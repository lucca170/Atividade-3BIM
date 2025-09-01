import React, { useState, useEffect } from 'react';
import './TaskFilter.css';

const TaskFilter = ({ onFilterChange }) => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');
    const [month, setMonth] = useState('');

    // Efeito para chamar onFilterChange quando qualquer filtro mudar
    useEffect(() => {
        // Debounce para o campo de busca, para não fazer requisições a cada tecla digitada
        const handler = setTimeout(() => {
            onFilterChange({ search, status, category, month });
        }, 500); // Atraso de 500ms

        return () => {
            clearTimeout(handler);
        };
    }, [search, status, category, month, onFilterChange]);

    const handleResetFilters = () => {
        setSearch('');
        setStatus('');
        setCategory('');
        setMonth('');
    };

    return (
        <div className="task-filter-container">
            <input
                type="text"
                placeholder="Pesquisar por título..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="filter-search"
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="filter-select">
                <option value="">Todos os Status</option>
                <option value="Pendente">Pendente</option>
                <option value="Concluída">Concluída</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter-select">
                <option value="">Todas as Categorias</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Pessoal">Pessoal</option>
                <option value="Estudos">Estudos</option>
            </select>
            <select value={month} onChange={(e) => setMonth(e.target.value)} className="filter-select">
                <option value="">Todos os Meses</option>
                <option value="1">Janeiro</option>
                <option value="2">Fevereiro</option>
                <option value="3">Março</option>
                <option value="4">Abril</option>
                <option value="5">Maio</option>
                <option value="6">Junho</option>
                <option value="7">Julho</option>
                <option value="8">Agosto</option>
                <option value="9">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
            </select>
            <button onClick={handleResetFilters} className="btn btn-secondary">Limpar Filtros</button>
        </div>
    );
};

export default TaskFilter;