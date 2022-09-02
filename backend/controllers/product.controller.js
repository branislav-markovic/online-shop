const db = require("../models");
const Product = db.product;
const Order = db.order;

exports.getAllProducts = async (req, res) => {
  let products = await Product.find({});

  res.status(200).send({
      products,
  });
}

exports.getUserOrders = async (req, res) => {
  let userId = req.query.userId;
  let orders = await Order.find({'userId' : userId});

  res.status(200).send({
    orders,
  });
}

exports.getAllOrders = async (req, res) => {
  let orders = await Order.find();

  res.status(200).send({
    orders,
  });
}

exports.saveOrder = async (req, res) => {
  let order = req.body.data;
  let storeOrder = new Order(order);

  await storeOrder.save();

  res.status(200).send({
    order: storeOrder,
  });
}

exports.cancelOrder = async (req, res) => {
  let id = req.params.id;
  await Order.updateOne({ _id: id }, {$set: { status: 'Otkazana' }});

  res.status(200).send({
    id: id,
  });
}

exports.updateOrdersComment = async (req, res) => {
  let data = req.body.data;
  let sifraPorudzbenice = req.body.sifraPorudzbenice;
  let sifraProizvoda = req.body.sifraProizvoda;
  let order = await Order.findOne({'sifra': sifraPorudzbenice});
  let listaProizvoda = order.listaProizvoda;

  for (proizvod of listaProizvoda) {
    if (proizvod.sifraProizvoda == sifraProizvoda) {
      proizvod.rated = data.rated;
      proizvod.rate = data.rate;
      proizvod.comment = {
        comment: data.comment,
        user: data.user,
        date: (new Date()).toISOString()
      }
    }
  }

  await Order.findOneAndUpdate({'sifra': sifraPorudzbenice}, {$set: order});

  res.status(200).send({
    order
  });
}
