import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';

// Import images
import dragonBallZImage from '../assets/images/dragon-ball-z.jpg';
import narutoImage from '../assets/images/naruto.jpg';

const bookImages = {
    1: narutoImage,
    5: dragonBallZImage,
    // Add more book images here if needed
};

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/books/${id}`);
                if (!response.ok) throw new Error('Failed to fetch book details');
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!book) return <div className="loading">Loading...</div>;

    return (
        <div className="book-details-container">
            <div className="book-details-card">
                <div className="book-image-container">
                    <img
                        src={book.image_url || bookImages[book.id] || '/images/placeholder.jpg'} // Use fallback if no image available
                        alt={book.title}
                        className="book-image"
                    />
                </div>
                <div className="book-info">
                    <h2 className="book-title">{book.title}</h2>
                    <p className="book-author"><strong>Author:</strong> {book.author}</p>
                    {}
                    <p className="published-year"><strong>Published Year:</strong> {book.published_year}</p>
                    <p className="genre"><strong>Genre:</strong> {book.genre}</p>
                    <p className="book-description"><strong>Description:</strong> {book.description}</p>
                    <button onClick={() => navigate('/')} className="back-button">Back</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
