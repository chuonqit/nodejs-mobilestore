import shortid from "shortid";
import Order from "../models/Order";
import Product from "../models/Product";

export const fetchOrdersList = async (req, res) => {
    try {
        const orders = await Order.find({}).exec();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).send("Lấy danh sách đơn hàng thất bại");
    }
};

export const fetchProductsListInOrders = async (req, res) => {
    try {
        const products = await Product.find({ name: new RegExp(req.query.keyword, "i") })
            .limit(10)
            .exec();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).send("Lấy danh sách đơn hàng thất bại");
    }
};

export const fetchOrderSelected = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.orderId }).exec();
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).send("Lấy đơn hàng thất bại");
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate({ _id: req.params.orderId }, { $set: { status: req.body.status } }, { new: true }).exec();
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).send("Lấy đơn hàng thất bại");
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ _id: req.params.orderId }).exec();
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).send("Xoá đơn hàng thất bại");
    }
};

export const orderByCustomer = (req, res) => {
    try {
        const { address, email, fullname, note, phoneNumber, products, price } = req.body;

        let lstProducts = [];
        for (let productItem of products) {
            let objProduct = {};
            objProduct.product = productItem.product;
            objProduct.price = productItem.price;
            objProduct.cost = productItem.cost;
            objProduct.storage = productItem.storage;
            objProduct.color = productItem.color;
            objProduct.quantity = productItem.quantity;
            lstProducts.push(objProduct);
        }

        const order = new Order({
            code: shortid.generate(),
            products: lstProducts,
            price,
            shippingInfo: {
                address,
                email,
                fullname,
                note,
                phoneNumber,
            },
        }).save();
        res.status(201).json(order);
    } catch (error) {
        return res.status(500).send("Đặt hàng thất bại");
    }
};

export const createOrderAdmin = async (req, res) => {
    try {
        const { address, email, fullname, note, phoneNumber, products, price } = req.body;
        const order = await new Order({
            code: shortid.generate(),
            shippingInfo: {
                address,
                email,
                fullname,
                note,
                phoneNumber,
            },
            products,
            price,
        }).save();
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).send("Thêm đơn hàng thất bại");
    }
};

export const updateOrderAdmin = async (req, res) => {
    try {
        const { address, email, fullname, note, phoneNumber, products, price } = req.body;

        const order = await Order.findOneAndUpdate(
            { _id: req.params.orderId },
            {
                $set: {
                    shippingInfo: {
                        address,
                        email,
                        fullname,
                        note,
                        phoneNumber,
                    },
                    products,
                    price,
                },
            },
            { new: true }
        ).exec();
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).send("Cập nhật đơn hàng thất bại");
    }
};
