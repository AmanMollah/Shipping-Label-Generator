import React, { useState, useEffect } from 'react'
import Input from './components/Input';

export default function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const [formData, setFormData] = useState({
    recipient_name: "",
    recipient_phone: "",
    recipient_door_code: "",
    customer_phone: "",
    address: "",
    message: "",
    order_number: "",
    customer_name: "",
    product_name: "",
    details: "",
    shipping_method: "",
    delivery_type: "",
    customer_account_is_b2b: 0,
    customer_account_company_name: 0
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    queryParams.forEach((value, key) => {
      setFormData(prev => {
        return { ...prev, [key]: value.replace(/\n\n/g, '\n') }
      })
    })
  }, [])
  const handlePrint = () => {
    window.print()
  }
  return (
    <div className='flex flex-row max-w-6xl mx-auto justify-between items-center'>
      <aside className='printHide grow flex flex-col gap-2 p-4'>
        <Input handleChange={handleChange} name="recipient_name" label="Recipient Name" value={formData["recipient_name"]} />
        <Input handleChange={handleChange} name="recipient_phone" label="Recipient Phone" value={formData["recipient_phone"]} />
        <Input handleChange={handleChange} name="recipient_door_code" label="Recipient Door Code" value={formData["recipient_door_code"]} />
        <Input handleChange={handleChange} name="customer_phone" label="Customer Phone" value={formData["customer_phone"]} />
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="address">
            Address
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            value={formData["address"]}
          ></textarea>
        </div>
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={formData["message"]}
          ></textarea>
        </div>
        <Input handleChange={handleChange} name="order_number" label="Order Number" value={formData["order_number"]} />
        <Input handleChange={handleChange} name="customer_name" label="Customer Name" value={formData["customer_name"]} />
        <Input handleChange={handleChange} name="product_name" label="Product Name" value={formData["product_name"]} />
        <Input handleChange={handleChange} name="details" label="Details" value={formData["details"]} />
        <Input handleChange={handleChange} name="shipping_method" label="Shipping Method" value={formData["shipping_method"]} />
        <Input handleChange={handleChange} name="delivery_type" label="Delivery Type" value={formData["delivery_type"]} />
        <Input handleChange={handleChange} name="customer_account_is_b2b" label="Customer Account (B2B or not)" value={formData["customer_account_is_b2b"]} />
        <Input handleChange={handleChange} name="customer_account_company_name" label="Customer Account Company Name" value={formData["customer_account_company_name"]} />
        <button className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight' onClick={handlePrint}>PRINT</button>
      </aside>
      <section className='flex flex-col h-[1050px] w-[742.5px] shadow-xl preview border'>
        <div className='flex-1'>
          <div className='grid place-content-center font-["quickpen"] text-3xl text-center whitespace-pre-wrap px-[50px] mt-[100px] mb-[50px] h-[375px]' dangerouslySetInnerHTML={{ __html: formData.message }} />
        </div>
        <div className='flex-1 w-full flex flex-col px-[100px]'>
          <div className='flex flex-col gap-[6px] h-[50px] justify-center'>
            <div className='flex justify-center text-[10px] leading-[10px] gap-1'>
              <span className='border-r-[1px] border-solid border-black pr-1'>Order: #{formData.order_number}</span>
              <span className='border-r-[1px] border-solid border-black pr-1'>Customer: {formData.customer_name}</span>
              <span className='border-r-[1px] border-solid border-black pr-1'>product: {formData.product_name}</span>
              <span className=''>{formData.details}</span>
            </div>
            <div className='flex justify-center text-[10px] leading-[10px] gap-1'>
              <span className='border-r-[1px] border-solid border-black pr-1'>Delivery: {formData.delivery_type}</span>
              <span className='border-r-[1px] border-solid border-black pr-1'>T.S: {formData.customer_phone}</span>
              <span className='border-r-[1px] border-solid border-black pr-1'>T.R.: {formData.recipient_phone}</span>
              <span className='pr-1'>Door: {formData.recipient_door_code}</span>
              <span className='font-bold'>{formData.shipping_method.toUpperCase()}</span>
            </div>
          </div>
          <div className='relative flex justify-center items-center h-[250px] mb-[25px]'>
            <span className='text-2xl font-semibold whitespace-pre-wrap text-center'>{formData.address}</span>
            <div className='flex justify-end text-sm gap-4 absolute bottom-0 right-0'>
              <span>Order: #{formData.order_number}</span>
              <span className='font-bold border border-black'>{formData.shipping_method.toUpperCase()}</span>
            </div>
          </div>
          <div className='h-[150px] flex justify-center items-center'>
            <span className='text-center font-["quickpen"] text-3xl'>{formData.recipient_name}</span>
          </div>
        </div>
      </section>
    </div>
  )
}
