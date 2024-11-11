import React from 'react';
import BookDetails from '../components/BookDetails';
import '../styles.css';

const ViewBook = () => {
    return (
        <div className="view-book-container">
            <header className="view-book-header">
                <h1 className="view-book-title">Book Details</h1>
            </header>

            <div className="book-details-container">
                <BookDetails />
            </div>
        </div>
    );
};

export default ViewBook;
