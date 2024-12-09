import FooterHeader from "@/app/components/FooterHeader";
import HeaderBanner from "@/app/components/HeaderBanner";
import Image from "next/image";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  return (
    <>
      <HeaderBanner heading="Cart" />

      <div className="grid grid-cols-1 lg:grid-cols-3 w-11/12 mx-auto gap-6 mt-12">
        {/* Product Table Section */}
        <div className="lg:col-span-2 col-span-1">
          <table className="w-full border-collapse">
            <thead className="bg-lightSkin py-3">
              <tr>
                <th className="text-center font-semibold py-2">Product</th>
                <th className="text-center font-semibold py-2 block sm:hidden">Price</th>
                <th className="text-center font-semibold py-2">Quantity</th>
                <th className="text-center font-semibold py-2">Subtotal</th>
                <th className="text-center font-semibold py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center flex gap-3 justify-center items-center py-4 rounded-lg">
                  <Image
                    src="/products/lolita.png"
                    alt="Product"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <span className="text-gray-500">Asguard Sofa</span>
                </td>

                {/* Price hidden on large screens */}
                <td className="text-center text-gray-500 block sm:hidden">Rs. 250,000.00</td>

                {/* Quantity Input */}
                <td className="text-center">
                  <input
                    type="number"
                    defaultValue="1"
                    min="1"
                    className="w-12 text-center border border-gray-300 rounded-md"
                  />
                </td>

                {/* Subtotal */}
                <td className="text-center">Rs. 250,000.00</td>

                {/* Delete Button */}
                <td className="text-center">
                  <button className="text-brownColor text-2xl">
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cart Totals Section */}
        <div className="bg-lightSkin text-center p-8 rounded-lg mt-4 lg:mt-0">
          <h5 className="text-3xl font-semibold mb-6">Cart Totals</h5>

          <div className="grid grid-cols-2 gap-y-6">
            <p>Subtotal</p>
            <p>Rs. 250,000.00</p>

            <p>Total</p>
            <p className="text-lg text-brownColor font-semibold">Rs. 250,000.00</p>
          </div>

          {/* Checkout Button */}
          <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
            Check Out
          </button>
        </div>
      </div>

      <FooterHeader />
    </>
  );
};

export default Cart;
