const { nanoid } = require("nanoid");
const { selectFewerProperty, selectFewerPropertyExtra, getBookById } = require('./getHandler');
const books = [];



const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = false;

    if (pageCount === readPage) {
        finished = true;
    };

    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertedAt, updatedAt
    };


    const hasName = (name !== undefined) ? true : false;
    const validReadPage = (readPage <= pageCount) ? true : false;

    if (hasName && validReadPage) {
        books.push(newBook);
        const response = h.response({
            "status": 'success',
            "message": 'Buku berhasil ditambahkan',
            "data": {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    } else if (!hasName) {
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    } else if (!validReadPage) {
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. Error tidak diketahui"
        });
        response.code(400);
        return response;
    }
};


// const getAllBooksHandler = () => ({
//     status: 'success',
//     data: {
//         books : selectFewerProperty(books),
//     }
// });

const getAllBooksHandler = (request, h) => {
    const { reading, finished, name } = request.query;
    if (reading == 1) {
        return {
            status: 'success',
            data: {
                books : selectFewerPropertyExtra(books, 1),
            }
        };
    } else if (reading == 0) {
        return {
            status: 'success',
            data: {
                books : selectFewerPropertyExtra(books, 0),
            }
        };
    } else if (finished == 1){
        return {
            status: 'success',
            data: {
                books : selectFewerPropertyExtra(books, 2),
            }
        };
    } else if (finished == 0){
        return {
            status: 'success',
            data: {
                books : selectFewerPropertyExtra(books, 3),
            }
        };
    } else if(name == 'Dicoding'){
        return {
            status: 'success',
            data: {
                books : selectFewerPropertyExtra(books, 4),
            }
        };
    } else {
        return {
            status: 'success',
            data: {
                books : selectFewerProperty(books),
            }
        };
    }
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = getBookById(books,bookId);
    if (book !== undefined) {
        return {
            status: "success",
            data: {
                book,
            }
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === bookId);
    const hasName = (name !== undefined) ? true : false;
    const validReadPage = (readPage <= pageCount) ? true : false;


    if (index !== -1 && hasName && validReadPage) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    } else if (!hasName) {
        const response = h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    } else if (!validReadPage) {
        const response = h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        });
        response.code(404);
        return response;
    }
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        response.code(404);
        return response;
    }
};



module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };


