const {
  product,
  ship_method,
  order_detail,
  order_item,
  address,
  payment_detail,
  sequelize,
} = require("../db/models");

exports.getProductsById = (ids, t) => {
  return product.findAll(
    {
      where: { id: ids },
      attributes: ["id", "name", "description", "price", "stock_qty"],
      raw: true,
    },
    { transaction: t }
  );
};

exports.getShipMethod = (id, t) => {
  return ship_method.findOne(
    {
      where: { id },
      raw: true,
    },
    { transaction: t }
  );
};

exports.getAddress = (data, t) => {
  const { street, area, city, zipcode, province } = data;

  return address.findOne(
    {
      where: { street, area, city, zipcode, province },
      raw: true,
    },
    { transaction: t }
  );
};

exports.createAddress = (data, t) => {
  const { street, area, city, zipcode, province } = data;

  return address.create(
    {
      street,
      area,
      city,
      zipcode,
      province,
      created_at: new Date(),
      updated_at: new Date(),
    },
    { transaction: t }
  );
};

exports.getMaxOrderNumber = async (t) => {
  const maxOrderNumber = await order_detail.findOne(
    {
      attributes: [sequelize.fn("max", sequelize.col("order_number"))],
      raw: true,
    },
    { transaction: t }
  );
  return Object.values(maxOrderNumber)[0];
};

exports.getOrderByOrderNumber = (order_number, t) => {
  return order_detail.findOne(
    {
      where: { order_number },
      raw: true,
    },
    { transaction: t }
  );
};

exports.createOrder = (
  order_number,
  first_name,
  last_name,
  email,
  total,
  cellphone,
  ship_address_id,
  bill_address_id,
  ship_method_id,
  t
) => {
  return order_detail.create(
    {
      order_number,
      first_name,
      last_name,
      email,
      total,
      cellphone,
      ship_address_id,
      bill_address_id,
      ship_method_id,
      status: "pending",
    },
    { transaction: t }
  );
};

exports.createOrderItems = (orderId, items, products, t) => {
  return items.map(({ product: cartProduct, orderQty }) => {
    const { id } = products.find((product) => product.id === cartProduct.id);
    return order_item.create(
      {
        order_id: orderId,
        product_id: id,
        order_qty: orderQty,
      },
      { transaction: t }
    );
  });
};
