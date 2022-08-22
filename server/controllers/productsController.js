const {
  getProductsService,
  fetchProductService,
  fetchCarouseProductsService,
} = require("../services/productsService");

exports.fetchProducts = async function (req, res, next) {
  const { search, category } = req.query;
  try {
    const result = await getProductsService(search, category);
    if (result instanceof Error) {
      next(result);
      return;
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
};

exports.fetchProduct = async function (req, res, next) {
  const { id } = req.params;
  try {
    const result = await fetchProductService(id);
    if (result instanceof Error) {
      next(result);
      return;
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
};

exports.fetchCarouselProducts = async function (req, res, next) {
  try {
    const result = await fetchCarouseProductsService();
    if (result instanceof Error) {
      next(result);
      return;
    }
    res.send(result);
  } catch (error) {
    next(error);
    return;
  }
};

exports.createProduct = async function (req, res, next) {
  const { name, description, price, stock_qty, in_carousel } = req.body;
  try {
    const result = await createProductService(
      name,
      description,
      price,
      stock_qty,
      in_carousel
    );

    if (result instanceof Error) {
      next(result);
      return;
    }
    res.send("Product was succesfully created");
  } catch (error) {
    next(error);
    return;
  }
};

exports.deleteProduct = async function (req, res, next) {
  const { id } = req.params;
  try {
    const result = await deleteProdutService(id);
    if (result instanceof Error) {
      next(result);
      return;
    }
    res.send("Product successfully deleted.");
  } catch (error) {
    next(error);
    return;
  }
};

exports.updateProduct = async function (req, res, next) {
  const { id } = req.params;
  const { update } = req.body;
  try {
    const result = await updateProductSerice(id, update);
    res.send("Product has been updated");
  } catch (error) {
    next(error);
    return;
  }
};
