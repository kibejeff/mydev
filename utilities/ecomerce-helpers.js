/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife
 * */

import React from 'react';
import cookies from 'js-cookie';
import { getProductsByIds } from '~/repositories/ProductRepository';

export function getCartItemsFromCookies() {
    const cartItems = cookies.get('cart');
    if (cartItems) {
        return JSON.parse(cartItems);
    } else {
        return null;
    }
}

export function updateCartToCookies(payload) {
    cookies.set('cart', payload, { path: '/', expires: 24 * 7 });
}

export function addItemToCartHelper(product) {
    let cart;
    let cookieCart = getCartItemsFromCookies();
    if (cookieCart) {
        cart = cookieCart;
        const existItem = cart.items.find((item) => item.uuid === product.uuid);
        if (existItem) {
            existItem.quantity += product.quantity;
        } else {
            /* if (!product.quantity) {
                product.quantity = 1;
            }*/
            cart.items.push(product);
        }
    } else {
        cart = {
            items: [],
        };
        cart.items.push(product);
    }
    updateCartToCookies(cart);
    return cart;
}

export function increaseQtyCartItemHelper(product) {
    let cart;
    let cookieCart = getCartItemsFromCookies();
    if (cookieCart) {
        cart = cookieCart;
        const selectedItem = cart.items.find((item) => item.uuid === product.uuid);

        if (selectedItem) {
            selectedItem.quantity = selectedItem.quantity + 1;
        }
        updateCartToCookies(cart);
        return cart;
    }
}

export function decreaseQtyCartItemHelper(product) {
    let cart;
    let cookieCart = getCartItemsFromCookies();
    if (cookieCart) {
        cart = cookieCart;
        const selectedItem = cart.items.find((item) => item.uuid === product.uuid);

        if (selectedItem) {
            selectedItem.quantity = selectedItem.quantity - 1;
        }
        updateCartToCookies(cart);
        return cart;
    }
}

export function removeCartItemHelper(product) {
    let cart;
    let cookieCart = getCartItemsFromCookies();
    if (cookieCart) {
        cart = cookieCart;
        const index = cart.items.findIndex((item) => item.uuid === product.uuid);
        cart.items.splice(index, 1);
        updateCartToCookies(cart);
        return cart;
    }
}

export function calculateAmount(obj) {
    const { quantity, price, discount } = obj;
    if (quantity > 0) return quantity * Math.abs(Math.round(((100 - discount) / 100) * price));
    return price
}

export function calculateCartTotal(arr) {
    return arr.reduce((acc, item) => {
        let newPrice;
        if (item?.quantity === 0){
            newPrice = Math.abs(Math.round(((100 - item?.discount) / 100) * item?.price));
        }else{
            newPrice = Math.abs(Math.round(((100 - item?.discount) / 100) * item?.price)) * item.quantity
        }
        
        return acc + newPrice
    }, 0);
}

export function calculateCartQuantity(obj) {
    return Object.values(obj).reduce((acc, { quantity }) => acc + quantity, 0);
}

export function caculateArrayQuantity(obj) {
    return Object.values(obj).reduce((acc) => acc + 1, 0);
}
