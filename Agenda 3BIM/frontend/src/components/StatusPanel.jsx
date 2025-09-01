// frontend/src/components/StatusPanel.jsx

import React, { useState, useEffect } from 'react';
import { getTaskStatusCount } from '../services/api';
import './StatusPanel.css';

const StatusPanel = () => {
    const [statusCounts, setStatusCounts] = useState([]);

    useEffect(() => {
        const fetchStatusCounts = async () => {
            try {
                const response = await getTaskStatusCount();
                setStatusCounts(response.data);
            } catch (error) {
                console.error('Failed to fetch task status counts', error);
            }
        };

        fetchStatusCounts();
    }, []);

    const getStatusCount = (status) => {
        const statusObj = statusCounts.find(item => item.status === status);
        return statusObj ? statusObj.count : 0;
    };

    return (
        <div className="status-panel">
            <div className="status-card">
                <h4>Pendente</h4>
                <p>{getStatusCount('Pendente')}</p>
            </div>
            <div className="status-card">
                <h4>Em Andamento</h4>
                <p>{getStatusCount('Em Andamento')}</p>
            </div>
            <div className="status-card">
                <h4>Concluída</h4>
                <p>{getStatusCount('Concluída')}</p>
            </div>
        </div>
    );
};

export default StatusPanel;