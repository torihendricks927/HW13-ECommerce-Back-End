const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({ include: [{ model: Product}],
  }).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, { include: [{ model: Product }],
  }).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updateCategory) => {
      return Category.findAll({ where: { category_name: req.params.id } });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deleteCategory) => {
    res.json(deleteCategory);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
