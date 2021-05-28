const { ObjectId } = require('bson');
const Cart = require('./../models/Cart');
const Product = require('./../models/Product')
//==========================================================================//

const getActiveCartFromUser = async (req, res) => {
    const { userId } = req.params;
    // console.log("entra al",userId)
    let cart = await Cart.findOne({ $and: [{ userId }, { state: 'Active' }] });

    if (!cart) {
        const newCart = await Cart.create({
            userId,
            items: [],
            totalAmount: 0
        });
        return res.status(201).json({ newCart })
    }
    if (cart.items.length === 0 && cart.totalAmount > 0) {
        cart.totalAmount = 0;
        cart = await cart.save();
    }
    let totalQuantity = 0
    cart.items?.map(prop => { totalQuantity += prop.quantity })
    return res.status(200).json({ cart, totalQuantity: totalQuantity })
}
//==========================================================================//
const addItem = async (req, res) => {

    const { userId } = req.params;
    const { productId, quantity, colorName, sizeName, stock } = req.body;
    try {
        let cart = await Cart.findOne({ $and: [{ userId }, { state: 'Active' }] });

        let newItem = await Product.findOne({ _id: productId })
        let stockSelected = newItem.stock.find(prop => prop.colorName === colorName && prop.sizeName === sizeName);
        newItem.stock = stockSelected;

        // console.log("dentro del stock elegido",newItem)

        if (!newItem) return res.status(404).json({ message: 'Product not found' })

        const price = newItem.price;
        const name = newItem.name;

        if (cart) {
            let itemIndex = -1
            //let itemIndex = cart.items.findIndex((i) => i.productId.equals(productId));

            for (let i = 0; i < cart.items.length; i++) {
                if (cart.items[i].productId.equals(productId)) {
                    if (cart.items[i].colorName === colorName && cart.items[i].sizeName === sizeName) {
                        itemIndex = i;
                        break;
                    }
                }
            }

            // console.log("ITEMINDEX",cart.items[itemIndex].productId)
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex]
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            }
            else {
                console.log("Not found")
                cart.items.push({ productId: newItem, name, quantity, price, colorName, sizeName, stock })
            }

            cart.totalAmount += quantity * price;
            cart = await cart.save()

            return res.status(201).json({ cart })

        }
        else {
            const newCart = await Cart.create({
                userId,
                items: [{ product: newItem, name, quantity, colorName, sizeName, stock, price }],
                totalAmount: quantity * price
            });

            return res.status(201).json({ newCart })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was and error' })
    }

}
//==========================================================================//
const incrementProductUnit = async (req, res) => {
    const { userId } = req.params;
    const { productId,colorName,sizeName } = req.query;
    // console.log(req.body)

    try {
        let cart = await Cart.findOne({ $and: [{ userId }, { state: 'Active' }] });

        if (!cart) return res.status(404).json({ message: 'Cart not found' })

        let itemFound = await Product.findOne({ _id: productId })
        if (!itemFound) return res.status(404).json({
            message: 'Product not found'
        })

        const price = itemFound.price;
        const stock = itemFound.stock;
        console.log("ITEMFOUND",itemFound)
        let itemIndex = cart.items.findIndex((i) => i.productId.equals(productId) && i.colorName === colorName && i.sizeName === sizeName);

        if (itemIndex === -1) {

            return res.status(400).json({ message: 'Item not found' })
        }
        //========================================//
        let productItem = cart.items[itemIndex]

        let totalQuantity = 0
        if (productItem.stock >= productItem.quantity) {
            productItem.quantity += 1;
            cart.items?.map(prop => { totalQuantity += prop.quantity })
            cart.items[itemIndex] = productItem
            cart.totalAmount += price;
            cart.totalQuantity = totalQuantity
        }

        cart = await cart.save();
        return res.status(201).json({ cart, totalQuantity: totalQuantity })
        //========================================//

        // if(itemIndex.quantity < stock) {
        //     let productItem = cart.items[itemIndex]
        //     productItem.quantity += 1;
        //     cart.items[itemIndex] = productItem
        //     cart.totalAmount += price;

        //     cart = await cart.save();
        //     return res.status(201).json({cart})

        // } else {
        //     console.log("ERROR")
        //     return res.status(400).json({message:'Cannot add more than the stock available'})
        // }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'There was an error' })
    }
}
//==========================================================================//
const decrementProductUnit = async (req, res) => {
    const { userId } = req.params;
    const { productId,colorName,sizeName } = req.query;
    try {
        let cart = await Cart.findOne({ $and: [{ userId }, { state: 'Active' }] });
        if (!cart) return res.status(404).json({ message: 'Cart not found' })

        let itemFound = await Product.findOne({ _id: productId })

        if (!itemFound) return res.status(404).json({
            message: 'Product not found'
        })

        const price = itemFound.price;


        let itemIndex = cart.items.findIndex((i) => i.productId.equals(productId) && i.colorName === colorName && i.sizeName === sizeName);

        if (itemIndex === -1) return res.status(400).json({ message: 'Item not found' })
        //========================================//
        let productItem = cart.items[itemIndex]
        productItem.quantity -= 1;

        cart.items[itemIndex] = productItem

        cart.totalAmount -= price;
        let totalQuantity = 0
        cart.items?.map(prop => { totalQuantity += prop.quantity })

        cart = await cart.save();
        return res.status(201).json({ cart, totalQuantity: totalQuantity })
        //========================================//

        if (itemIndex.quantity > 0) {
            let productItem = cart.items[itemIndex]
            productItem.quantity -= 1;
            cart.items[itemIndex] = productItem
            cart.totalAmount -= price;

            cart = await cart.save();
            return res.status(201).json({ cart })

        } else {
            return res.status(400).json({ message: 'Cannot decrement into negative numbers' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'There was an error' })
    }
}

//==========================================================================//
const stateChange = async (req, res) => {
    const { cartId } = req.params;
    const { state } = req.query;

    console.log("El user id es: "+cartId+" y el state es: "+state)
    //return res.json({user:userId,state})
    //return res.json({stado:req.query.state})
    //if(!req.query?.state) {
    //    return res.status(400).json({message: 'New State not found'});
    //}
    //res.json({state:req.query.state})
    const statesArray = ['Active', 'Cancelled', "On it's Way", 'Paid', 'Delivered']
    if (!statesArray.includes(state)) return res.status(400).json({ message: 'State not valid' })

    try {
        //let cart = await Cart.findOne({userId});
        let cart = await Cart.findOne({ _id: cartId }) //Antes se buscaba el cart activo de un usuario con {$and:[{userId}, {state:'Active'}]}
        if (cart) {
            //res.status(200).json({message:'entre aqui'})
            cart.state = req.query.state;
            cart = await cart.save()

            res.status(200).json({ message: 'Cart updated' })
        } else {
            res.status(400).json({ message: 'Cart not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'There was and error' })
    }
}
//==========================================================================//
const getAllCarts = async (req, res) => {
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;

    const count = await Cart.countDocuments({});
    const carts = await Cart.find({})
        .populate("userId")
        .populate("items.productId")
        .populate("productId.stock")
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    return res.json({ carts, current: page, pages: Math.ceil(count / pageSize) });
}

//==========================================================================//
const getCartsByUser = async (req, res) => {
    const { userId } = req.params;
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;

    const count = await Cart.countDocuments();
    let carts = await Cart.find({ userId })
        .populate("userId")
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    return res.json({ carts, current: page, pages: Math.ceil(count / pageSize) });

}
//==========================================================================//
const removeProductFromCart = async (req, res) => {
    const { userId } = req.params;
    const { productId,colorName,sizeName } = req.query;
    console.log("ENTRA", userId, productId,colorName,sizeName)
    let cartFiltered = [];
    try {
        let cart = await Cart.findOne({ $and: [{ userId }, { state: 'Active' }] });
        let itemIndex = cart.items.findIndex((i) => i.productId.equals(productId) && i.colorName === (colorName) && i.sizeName === (sizeName));

        cart.totalAmount = cart.totalAmount - cart.items[itemIndex].price * cart.items[itemIndex].quantity

        cart.items.map((prop, i) => {
            if (i !== itemIndex) {
                cartFiltered.push(cart.items[i])
            }
        })
        cart.items = cartFiltered;
        let totalQuantity = 0
        cart.items?.map(prop => { totalQuantity += prop.quantity })
        const updateCart = await cart.save();
        res.status(200).json({ cart: updateCart, totalQuantity: totalQuantity })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'There was an error' })
    }
}
//==========================================================================//

const getCartsById = async (req, res) => {
    const { _id } = req.params;
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;

    const count = await Cart.countDocuments();
    let carts = await Cart.find({ _id })
        .populate("userId")
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    return res.json({ carts, current: page, pages: Math.ceil(count / pageSize) });

}

//==========================================================================//

module.exports = {
    addItem,
    stateChange,
    getAllCarts,
    getCartsByUser,
    getActiveCartFromUser,
    removeProductFromCart,
    incrementProductUnit,
    decrementProductUnit,
    getCartsById
}