/**
 * Library Controller
 * Manages study resources, book search, category filters, and bookmarks
 */

const { readData, writeData } = require('../utils/db');

exports.getBooks = (req, res) => {
  try {
    const { category, search, bookmarked } = req.query;
    let books = readData('library.json') || [];

    if (category && category !== 'All Resources' && category !== 'All') {
      books = books.filter(b => b.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      books = books.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.authors.toLowerCase().includes(q) ||
        (b.isbn && b.isbn.includes(q)) ||
        b.category.toLowerCase().includes(q)
      );
    }

    if (bookmarked === 'true') {
      books = books.filter(b => b.isBookmarked);
    }

    return res.json({ success: true, count: books.length, data: books });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getBookById = (req, res) => {
  try {
    const { id } = req.params;
    const books = readData('library.json') || [];
    const book = books.find(b => b.id === id);

    if (!book) {
      return res.status(404).json({ success: false, error: "Resource not found." });
    }

    return res.json({ success: true, data: book });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.toggleBookmark = (req, res) => {
  try {
    const { id } = req.params;
    const books = readData('library.json') || [];
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({ success: false, error: "Resource not found." });
    }

    books[bookIndex].isBookmarked = !books[bookIndex].isBookmarked;
    writeData('library.json', books);

    return res.json({
      success: true,
      isBookmarked: books[bookIndex].isBookmarked,
      message: books[bookIndex].isBookmarked ? "Bookmarked to your library." : "Removed from bookmarks."
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
