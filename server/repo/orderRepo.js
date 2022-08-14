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
    }
    // { transaction: t }
  );
};

exports.getShipMethod = (id, t) => {
  return ship_method.findOne(
    {
      where: { id },
      raw: true,
    }
    // { transaction: t }
  );
};

exports.getAddress = (data, t) => {
  const { street, area, city, zipcode, province } = data;

  return address.findOne(
    {
      where: { street, area, city, zipcode, province },
      raw: true,
    }
    // { transaction: t }
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
  return await order_detail.findOne(
    {
      attributes: [sequelize.fn("max", sequelize.col("order_number"))],
      raw: true,
    },
    { transaction: t }
  );
};

exports.getOrderByOrderNumber = (order_number, t) => {
  return order_detail.findOne(
    {
      where: { order_number },
      raw: true,
    }
    // { transaction: t }
  );
};

exports.getOrderAndQtyByOrderNumber = (order_number) => {
  return order_detail.findOne({
    where: { order_number },
    include: [{ model: product, through: { attributes: ["id", "order_qty"] } }],
  });
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

exports.createOrderItemsList = (orderId, items, products, t) => {
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

exports.createProductUpdatesList = (products, t) => {
  return products.map((cartProduct) => {
    const { id, stock_qty: stockQty } = cartProduct;
    const orderQty = cartProduct.order_item.order_qty;
    return product.update(
      { stock_qty: stockQty - orderQty },
      { where: { id } },
      { transaction: t }
    );
  });
};

exports.updateOrderDetailStatus = (id, t) => {
  return order_detail.update(
    { status: "paid" },
    { where: { id } },
    { transaction: t }
  );
};

exports.createPaymentDetail = (itn, order_id, t) => {
  const { pf_payment_id, amount_gross } = itn;
  return payment_detail.create(
    {
      name: pf_payment_id,
      amount: amount_gross,
      provider: "fnb",
      order_id,
    },
    { transaction: t }
  );
};

exports.getOrderInfo = (id) => {
  return order_detail.findOne({
    where: { id },
    attributes: {
      exclude: ["ship_address_id", "bill_address_id", "ship_method_id"],
    },
    include: [
      {
        model: product,
        attributes: {
          exclude: ["createdAt", "updatedAt", "in_carousel", "stock_qty"],
        },
        through: {
          attributes: ["order_qty"],
        },
      },
      {
        model: address,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        as: "shipAddressId",
      },
      {
        model: address,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        as: "billAddressId",
      },
      {
        model: payment_detail,
        attributes: { exclude: ["id"] },
      },
    ],
  });
};

exports.getPaymentDetailByOrderId = (id) => {
  return payment_detail.findOne({ where: { order_id: id } });
};

exports.getShippingMethodByAddress = (area, city) => {
  return ship_method.findOne({
    where: { area, city },
    attributes: ["id", "charge"],
  });
};
