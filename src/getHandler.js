function selectFewerProperty(books){
    let arrBook = [];
    for(book of books){
        const { id, name, publisher } = book;
        arrBook.push({ id, name, publisher });
    }
    return arrBook;
}

function selectFewerPropertyExtra(books, flag){
    let arrBook = [];
    if(flag === 1){
        for(book of books){
            if(book.reading){
                const { id, name, publisher } = book;
                arrBook.push({ id, name, publisher });
            }
        }
    } else if (flag === 0){
        for(book of books){
            if(!book.reading){
                const { id, name, publisher } = book;
                arrBook.push({ id, name, publisher });
            }
        }
    } else if (flag === 2){
        for(book of books){
            if(book.finished){
                const { id, name, publisher } = book;
                arrBook.push({ id, name, publisher });
            }
        }
    } else if (flag === 4){
        for(book of books){
            if(book.name.toLowerCase().includes("dicoding")){
                const { id, name, publisher } = book;
                arrBook.push({ id, name, publisher });
            }
        }
    } else if (flag === 3){
        for(book of books){
            if(!book.finished){
                const { id, name, publisher } = book;
                arrBook.push({ id, name, publisher });
            }
        }
    }
    return arrBook;
}

function getBookById(books, id) {
    for(book of books){
        if(book.id == id){
            return book;
        }
    }
    return undefined;
}

module.exports = { selectFewerProperty, selectFewerPropertyExtra, getBookById };