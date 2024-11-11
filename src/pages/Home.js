// pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookList from '../components/BookList';
import '../styles.css';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState('');
    const [isMessageVisible, setIsMessageVisible] = useState(false); // To control the visibility of the message

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/books');
            if (!response.ok) throw new Error('Failed to fetch books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/books/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete book');
            setMessage('Book deleted successfully!');
            setIsMessageVisible(true); // Show the message
            fetchBooks();

            // After 3 seconds, fade out the message
            setTimeout(() => {
                setIsMessageVisible(false);
                setMessage(''); // Clear message after fade-out
            }, 3000); // 3000ms = 3 seconds
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <header className="header">
                <h1 className="page-title">Book Management System</h1>
            </header>
            
            {isMessageVisible && (
                <div className="success-message">
                    {message}
                </div>
            )}

            <BookList books={books} onDelete={handleDelete} />
        </div>
    );
};

export default Home;
