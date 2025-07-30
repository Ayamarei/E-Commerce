

import { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { CartContext } from "../../Context/CartContext/CartContext";

export default function Cart() {
  const {
    totalCartPrice,
    allProduct,
    numOfCartItems,
    updateCount,
    deleteProduct,
    getUserCard
  } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  
  const handleRemoveClick = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedProductId) {
      deleteProduct(selectedProductId);
    }
    setShowModal(false);
    setSelectedProductId(null);
  };

  const handleUpdateCount = (productId, newCount) => {
    updateCount(productId, newCount);
  };

  useEffect(()=>{
 getUserCard()
  },[])


  return (
    <>
      <h2 className="text-start px-5 pt-3">Shop Cart :</h2>
      <p className="text-success px-5">
        Total Cart Price: {totalCartPrice} EGP
      </p>
      <h3>{numOfCartItems}</h3>

      {allProduct?.length > 0 ? (
        allProduct.map((product) =>
          product.product ? (
            <div
              key={product._id}
              className="container d-flex align-items-center justify-content-between border p-3 my-2 bg-light rounded"
            >
              <div className="d-flex align-items-center">
                <img
                  src={product.product.imageCover}
                  alt={product.product.title}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                  className="me-3 rounded"
                />
                <div>
                  <h6>{product.product.title}</h6>
                  <p className="text-success mb-1">
                    Price : {product.price} EGP
                  </p>
                  <button
                    onClick={() => handleRemoveClick(product.product._id)}
                    className="btn btn-link text-danger p-0"
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <button
                  onClick={() =>
                    handleUpdateCount(product.product._id, product.count + 1)
                  }
                  className="btn btn-outline-success"
                >
                  +
                </button>
                <span className="mx-2">{product.count}</span>
                <button
                  onClick={() =>
                    handleUpdateCount(product.product._id, product.count - 1)
                  }
                  className="btn btn-outline-success"
                  disabled={product.count <= 1}
                >
                  -
                </button>
              </div>
            </div>
          ) : null
        )
      ) : (
        <p className="text-center">Loading cart items...</p>
      )}

    
     <Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Delete Confirmation</Modal.Title>
  </Modal.Header>
  <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Cancel
    </Button>
    <Button variant="danger" onClick={confirmDelete}>
      Yes, Delete
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
}
