const { sequelize } = require("../db/models");
const { UserError, ApiError } = require("../errors");
const {
  createOrderService,
  completeOrderSerive,
  confirmOrderService,
  getShippingRateService,
} = require("../services/orderService");

exports.getShippingRate = async function (req, res, next) {
  console.log(req.body);
  const { area, city } = req.body;
  try {
    const result = await getShippingRateService(area, city);
    if (result instanceof ApiError || result instanceof UserError) {
      next(result);
      return;
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async function (req, res, next) {
  const { cart, shipping, billing = {} } = req.body;
  const t = await sequelize.transaction();
  try {
    const result = await createOrderService(cart, shipping, billing, t);
    if (result instanceof Error) {
      await t.rollback();
      next(result);
      return;
    }
    await t.commit();
    res.send({ ...result });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

exports.completeOrder = async function (req, res, next) {
  const { body } = req;
  const t = await sequelize.transaction();
  try {
    const result = await completeOrderSerive(body, t);
    if (result instanceof Error) {
      await t.rollback();
      next(result);
      return;
    }
    await t.commit();
    res.status(200);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

exports.confirmPayment = async function (req, res, next) {
  const id = req.params.id;
  const t = await sequelize.transaction();
  try {
    const result = await confirmOrderService(id);
    if (result instanceof Error) {
      await t.rollback();
      next(result);
      return;
    }
    res.send(result);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

exports.fetchOrders = async function (req, res, next) {
  try {
    const result = fetchAllOrders();
    if (result instanceof Error) {
      await t.rollback();
      next(result);
      return;
    }
    res.send(result);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

exports.fetchOrder = async function (req, res, next) {
  // this request for now will come from they're email and come to this page

  // below shouldn't be id but actually the TOKEN sent by payfast
  const { id } = req.params;

  try {
    const result = await fetchOrderService(id);
    if (result instanceof Error) {
      next(result);
      return;
    }
    res.send(result);
  } catch (error) {
    next(error);
  }

  // need also logic to get any refund info of any kind

  try {
    const order = await order_detail.findOne({
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

    if (order == null) return next(ApiError.noOrder());

    res.send(order);
  } catch (error) {
    return next(ApiError.internal());
  }
};

exports.updateOrder = async function (req, res, next) {
  const { id } = req.params;
  const t = await sequelize.transaction();
  try {
    const result = updateOrderService(id, t);
    if (result instanceof ApiError || result instanceof UserError) {
      await t.rollback();
      next(result);
      return;
    }
    res.status(200).json({ message: "Order has been updated." });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

exports.deleteOrder = async function (req, res, next) {
  // validate user using jwt
  // more for user not to see it, but merchant will still have this
  const { id } = req.params;
  try {
    const result = deleteOrderById();
    if (result instanceof ApiError || result instanceof UserError) {
      await t.rollback();
      next(result);
      return;
    }
    res.status(200).json({ message: "Order was deleted successfully." });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
