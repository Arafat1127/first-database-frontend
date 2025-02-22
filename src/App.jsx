import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7000/products')
      .then((res) => res.json())
      .then(data => setProducts(data))
  }, [])

  const handleAddProduct = (event) => {
    event.preventDefault()
    const form = event.target;
    const productName = form.productName.value;
    const productPrice = form.price.value;
    console.log(productName, productPrice);

    const product = {
      name: productName,
      price: productPrice,
    };
    fetch("http://localhost:7000/add-product", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert('Product Added Successfully Done')
          form.reset()
        }
      })
  }

  return (
    <>
      <h1 className='text-3xl text-center m-10 font-bold underline'>Project is ready to work</h1>
      <div className='flex justify-center '>
        <div className='grid grid-cols-2 gap-8 m-5'>
          {
            products.map(product => (
              <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                  <img
                    className='w-[600px] h-[400px] '
                    src={product.img}
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p>Price: {product.price}</p>
                  <p>Id: {product.id}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Product Details</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* form */}
      <div className="hero bg-base-200 ">
        <div className="hero-content  ">
          <div className="card bg-base-100  shadow-2xl">
            <form onSubmit={handleAddProduct} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  name='productName'
                  placeholder="product name" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  name='price'
                  placeholder="price" className="input input-bordered" />
              </div>
              <div className="form-control mt-6">
                <input type='submit' className="btn btn-primary" value="Add Product" />
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
