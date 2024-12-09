import HeaderBanner from "@/app/components/HeaderBanner";

interface FormField {
  label: string;
  placeholder?: string;
  type: "text" | "textarea" | "select";
  options?: string[];
}

const formFields: FormField[] = [
  { label: "First Name", placeholder: "First Name", type: "text" },
  { label: "Last Name", placeholder: "Last Name", type: "text" },
  {
    label: "Company Name (optional)",
    placeholder: "Company Name",
    type: "text",
  },
  {
    label: "Country/Region",
    type: "select",
    options: ["Pakistan", "Sri Lanka", "America"],
  },
  { label: "Street Address", placeholder: "Street Address", type: "text" },
  { label: "Town/City", placeholder: "Town/City", type: "text" },
  {
    label: "Province",
    type: "select",
    options: ["Western Province", "Eastern Province"],
  },
  { label: "Zip Code", placeholder: "Zip Code", type: "text" },
  { label: "Phone", placeholder: "Phone", type: "text" },
  { label: "Email Address", placeholder: "Email Address", type: "text" },
  {
    label: "Additional Information",
    placeholder: "Additional Information",
    type: "textarea",
  },
];

const Checkout: React.FC = () => {
  return (
    <>
      {/* Header Section */}
      <HeaderBanner heading="Check Out" />

      {/* Contact and Form Section */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-16 px-8 py-12 w-11/12 mx-auto">
        {/* Billing Details Form */}
        <form className="flex flex-col space-y-6 w-full">
          <h2 className="text-4xl font-semibold">Billing Details</h2>

          {formFields.map(({ label, placeholder, type, options }, index) => (
            <div className="grid gap-4" key={index}>
              <label className="font-medium">{label}</label>
              {type === "textarea" ? (
                <textarea
                  placeholder={placeholder}
                  className="textarea textarea-bordered w-full"
                />
              ) : type === "select" ? (
                <select className="select select-bordered w-full">
                  <option disabled selected>
                    Select {label}
                  </option>
                  {options?.map((option, idx) => (
                    <option key={idx}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  placeholder={placeholder}
                  className="input input-bordered w-full"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-fit bg-brownColor text-white px-6 py-3 rounded-lg hover:bg-brownColor-dark"
          >
            Submit
          </button>
        </form>

        {/* Order Summary and Payment Options */}
        <div className="space-y-10 p-6">
          {/* Order Summary */}
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <h5 className="font-semibold">Product</h5>
              <h5 className="font-semibold">Subtotal</h5>
              <p className="text-gray-500">Asguard Sofa * 1</p>
              <p>Rs. 250,000.00</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p className="font-medium">Subtotal</p>
              <p>Rs. 250,000.00</p>
              <p className="font-medium">Total</p>
              <p className="font-bold text-lg text-brownColor">
                Rs. 250,000.00
              </p>
            </div>
          </div>
          <hr className="border-gray-300" />

          {/* Payment Options */}
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <input
                type="radio"
                name="payment"
                id="bankTransfer"
                className="radio checked:bg-brownColor"
              />
              <label htmlFor="bankTransfer" className="ml-2">
                Direct Bank Transfer
              </label>
            </div>
            <p className="text-gray-600 mt-2 text-sm">
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </p>
            <div className="flex items-start gap-2">
              <input
                type="radio"
                name="payment"
                id="cod"
                className="radio checked:bg-brownColor"
              />
              <label htmlFor="cod" className="ml-2">
                Cash on Delivery
              </label>
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-4">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <span className="font-semibold">privacy policy</span>.
          </p>

          <button className=" bg-white text-black border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
