"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { UpdateOrDelete } from "@/components/lib/getData";

export default function CartPage({ carts, userId }) {
  const [cart, setCart] = useState(carts);
  const [orderLoading, setOrderLoading] = useState(false);

  // Update Quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
    toast.success("Quantity updated");
  };

  // Remove Item
  const removeFromCart = async (id) => {
    const res = await UpdateOrDelete(`/cart/delete/${id}`, "delete");
    if (res) {
      setCart(cart.filter((item) => item._id !== id));
      toast.error("Item removed from cart");
    } else {
      toast.error("failed remove item");
    }
  };

  // Clear Entire Cart
  const clearCart = async () => {
    const res = await UpdateOrDelete(`/cart/all/delete/${userId}`, "delete");
    if (res) {
      setCart([]);
      toast.info("Cart cleared");
    } else {
      toast.error("failed product clear.");
    }
  };

   const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 3.99;
  const total = subtotal + deliveryFee;

  // Place Order (Simulated)
  const placeOrder = async () => {
    if (cart.length === 0) return;

    setOrderLoading(true);

    // Simulate API delay
    const orderData = {
      userId,
      products: carts,
      totalAmount: total,
    };
    console.log(orderData);
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       // Authorization: token,
      },
      body: JSON.stringify(orderData),
    });
    toast.success(
      "🎉 Order placed successfully! Your books are being prepared.",
    );

    // Clear cart after order
    clearCart();

    // You can redirect to success page here later
    // router.push("/order-success");
  };

 

  return (
    <div className="min-h-screen bg-base-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/books"
            className="flex items-center gap-2 text-base-content/70 hover:text-base-content"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold">Your Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag
              size={80}
              className="mx-auto text-base-content/30 mb-6"
            />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-base-content/60 mb-8">
              Start adding some great books!
            </p>
            <Link href="/books" className="btn btn-primary">
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-base-200 rounded-2xl p-6 flex gap-6 border border-base-300"
                >
                  <div className="w-28 h-36 relative rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-base-content/70">{item.author}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-error hover:bg-error/10 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="btn btn-sm btn-circle btn-ghost"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="btn btn-sm btn-circle btn-ghost"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-base-content/60">
                          ${item.price} each
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-base-200 rounded-3xl p-8 sticky top-6 border border-base-300">
                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-base-content/80">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base-content/80">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee}</span>
                  </div>
                  <div className="border-t border-base-300 pt-4 flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={orderLoading}
                  className="btn btn-primary w-full h-14 text-lg mb-4"
                >
                  {orderLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Place Order"
                  )}
                </button>

                <button
                  onClick={clearCart}
                  className="btn btn-ghost w-full text-error hover:bg-error/10"
                >
                  Clear Cart
                </button>

                <p className="text-center text-xs text-base-content/50 mt-6">
                  Books will be delivered within 2-5 business days
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
