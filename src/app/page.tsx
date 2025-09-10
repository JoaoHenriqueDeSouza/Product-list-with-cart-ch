"use client"



import { CartList } from "@/components/CartList";
import { MenuItem } from "@/components/MenuItem";
import { products } from "@/data/products";
import { productsType } from "@/types/productsType";
import { useState } from "react";

export default function Page() {

  
  const [showmodal, setShowModal] = useState(false)
  const [cartList, setCartList] = useState<productsType[]>([])
  let total = 0






  const addTotal = () => { cartList.forEach(item => total += item.price * item.qtd) }
  addTotal()



  const addToCart = (product: productsType) => {



    setCartList((prevCart) => {

      const existingItem = prevCart.find(item => item.title === product.title);

      if (existingItem) {



        // já existe no carrinho → incrementa a quantidade
        return prevCart.map(item =>

          item.title === product.title
            ? { ...item, qtd: item.qtd + 1 }
            : item
        );
      } else {
        // não existe → adiciona com qtd = 1
        return [...prevCart, { ...product, qtd: 1 }];
      }


    });
  };

  const decreaseFromCart = (product: productsType) => {
    setCartList((prevCart) => {

      const existingItem = prevCart.find(item => item.title === product.title);

      if (existingItem) {

        // já existe no carrinho → incrementa a quantidade
        return prevCart.map(item =>
          item.title === product.title
            ? { ...item, qtd: item.qtd - 1 }
            : item
        );
      } else {
        // não existe → adiciona com qtd = 1
        return [...prevCart, { ...product, qtd: 1 }];
      }
    });
  };

  const removeFromCart = (title: string) => { setCartList(cartList.filter(item => item.title !== title)) }

  const toggleModal = () => { showmodal ? setShowModal(false) : setShowModal(true) }




  return (

    <div className=" lg:h-full lg:py-5 w-screen lg:flex  lg:px-14  bg-[color:hsl(13,31%,94%)] text-[color:hsl(14,86%,42%)] justify-center   ">
      <div className="p-5">
        <h1 className="text-4xl font-bold mb-5 text-black ">Desserts</h1>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3 ml-6 ">
          {products.map((item, index) =>
            <MenuItem key={index} onClickRemove={() => decreaseFromCart(item)} onClick={() => addToCart(item)} image={item.image} group={item.group} title={item.title} price={item.price} qtd={
              cartList.find(cartItem => cartItem.title === item.title)?.qtd || 0} addTotal={addTotal} />
          )}
        </ul>
      </div>

      <div className="">
        <div className="bg-white w-11/12  sm:w-96 p-10 ml-4 flex flex-col justify-center rounded-md">
          <h1 className="text-3xl font-bold mb-8 ">{`Your Cart:`}</h1>
          <div className="flex flex-col text-sm ">

            {total == 0
              ?
              <div className="flex flex-col justify-center items-center">
                <img className="" src="/images/illustration-empty-cart.svg" alt="" />
                <div>Your added items will appear here</div>
              </div>
              :
              cartList.map((item) => <CartList key={item.title} item={item} onClick={removeFromCart} locked={false} />)
            }
            {
              total !== 0 &&
              <div>
                <div className="flex items-center justify-between ">
                  <p className="text-black/60">Total</p>
                  <span className=" text-black font-bold text-3xl">{`$${total.toFixed(2)}`}</span>
                </div>
                <div className=" bg-[color:hsl(13,31%,94%)] rounded-md my-5 p-3 flex justify-center items-center gap-2 text-black/50 ">
                  <img src="/images/icon-carbon-neutral.svg" alt="" />
                  this is a <span className="font-bold text-black/80">carbon-neutral</span> delivery
                </div>
                <button className="bg-[color:hsl(14,86%,42%)] text-white w-full rounded-full p-3 cursor-pointer" onClick={toggleModal}>Confirm Order</button>
              </div>
            }


          </div>
        </div>
      </div>

      {
        showmodal &&
        <div className="top-0 left-0 right-0 bottom-0  bg-black/30 fixed flex justify-center items-center">
          <div className="bg-white rounded-xl p-8  w-xl mx-2  ">
            <img src="/images/icon-order-confirmed.svg" alt="" />
            <div className="my-10">
              <h1 className="text-4xl text-black font-bold mb-3">Order Confirmed</h1>
              <p className="text-black/50">We hope you enjoy your food</p>
            </div>
            <div className="bg-[color:hsl(20,50%,98%)] p-4 rounded-md overflow-y-scroll h-80">

              {cartList.map((item) =>
                <CartList
                  key={item.title}
                  item={item}
                  onClick={removeFromCart}
                  locked={true}
                  img={
                    products.find(prod => item.title === prod.title)?.image
                  }
                />)}
              <div className="flex items-center justify-between ">
                <p className="text-black/60">Total</p>
                <span className=" text-black font-bold text-3xl">{`$${total.toFixed(2)}`}</span>
              </div>

            </div>
            <button className="w-full bg-[color:hsl(14,86%,42%)] text-white rounded-full p-3 mt-10 cursor-pointer" onClick={toggleModal}>Start new order</button>
          </div>
        </div>
      }
    </div>

  );
}
