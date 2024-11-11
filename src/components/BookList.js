import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

// Import images
import dragonBallZImage from '../assets/images/dragon-ball-z.jpg';
import narutoImage from '../assets/images/naruto.jpg';

const bookImages = {
    1: narutoImage,
    5: dragonBallZImage,
    // Add more book images here if needed
};

const BookList = ({ books, onDelete }) => {
    return (
        <div className="book-list">
            {/* Add Book Button */}
            <Link to="/add">
                <button className="add-book-button">Add Book</button>
            </Link>

            <h2 className="book-list-title center-top">Book List</h2>

            <div className="card-container">
                {books.map((book) => (
                    <div key={book.id} className="card-link">
                        <Link to={`/view/${book.id}`} className="card">
                            <div
                                className="card"
                                style={{ backgroundImage: `url(${bookImages[book.id] || '/images/placeholder.jpg'})` }} // Default image if not found
                            >
                                <div className="card-overlay">
                                    <h3>{book.title}</h3>
                                    <p>Author: {book.author}</p>
                                </div>
                            </div>
                        </Link>

                        {/* Container for Edit and Delete Buttons */}
                        <div className="card-actions-container">
                            <Link to={`/edit/${book.id}`}>
                                <button className="edit-button">Edit</button>
                            </Link>

                            <button
                                className="delete-button"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering card link
                                    onDelete(book.id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
