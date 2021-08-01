const express = require('express');
const router = express.Router();
const Book = require("../models").Book;
const { Op } = require("sequelize");

const asyncHandler = (callback) => {
  return async(req, res, next) => {
    try {
      await callback(req, res, next)
    } catch(error){
      next(error);
    }
  }
}

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  //res.render('index', { title: 'Express' });
  res.redirect("/books");
}));

router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    order: [['createdAt', 'DESC']]
  });
  //res.render('index', { title: 'Express' });
  res.render("index", {books: books, title: "Books"});
}));

//GET route to create a book
router.get('/books/new', (req, res) => {
  res.render("new-book", { book: {}, title: "New Book"});
});

//POST route to create a book
router.post('/books', asyncHandler(async(req, res) => {
  let book;
    try {
      book = await Book.create(req.body);
      res.redirect("/books/" + book.id); 
    } catch(error){
      if(error.name === "SequelizeValidationError"){
      book = await Book.build(req.body);
      res.render("new-book", {book: book, errors: error.errors, title: "New Book"})
    } else {
      throw error;
      }
    }
}))

//GET route for individual book
router.get("/books/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book){
    res.render("book", { book: book, title: book.title}); 
  } else {
    throw error;
  }
}));

//GET route to update a book
router.get("/books/:id/edit", asyncHandler(async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book){
    res.render("update-book", { book: book, title: "Edit Book" });
  } else {
    throw error;
  }
}));

// Update a book
router.post('/books/:id/edit', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book){
      await book.update(req.body);
      res.redirect("/books/" + book.id);
    } else {
      throw error;
    }
  } catch (error){
    if(error.name === "SequelizeValidationError"){
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("update-book", {book: book, errors: error.errors, title: "Edit Book"})
    } else {
      throw error;
    }
  }
}));

// router.post("/books/search/:id"), asyncHandler(async (req, res) => {
//   const books = await Book.findAll({
//         limit: 10,
//         where: {
//             asset_name: {
//                 [Op.like]: '%' + req.body + '%'
//             }
//         }
// }).then(function(){
//     req.body = req.params.id;
//     res.redirect("/books/search" + req.body);
// }).catch(function(error){
//     console.log(error);
// });
// });

router.get("books/search/:id"), (req, res) => {
  const query = req.params.query;
  res.render("results");
};

router.post("books/search/:id", (req, res) => {
  res.redirect("/books/search/", req.body);
});

//Delete book page
router.get("/books/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book){
    res.render("delete", { book: book, title: "Delete Book" });
  } else {
    throw error;
  }
}));

//Delete book
router.post('/books/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book){
    await book.destroy();
    res.redirect("/books");
  } else {
    throw error;
  }
}));

module.exports = router;
