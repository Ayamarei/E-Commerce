import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { CartContext } from "../../../Context/CartContext/CartContext";

export default function Cart() {
  const { deleteProduct } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleRemoveClick = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedProductId) {
      removeProduct(selectedProductId); // Call your delete function from context
    }
    setShowModal(false);
    setSelectedProductId(null);
  };

  return (
    <>
      {allProduct?.map((product) => (
        <div
          key={product._id}
          className="container d-flex align-items-center justify-content-between border p-3 my-2 bg-light rounded"
        >
          <div className="d-flex align-items-center">
            <img
              src={product?.product?.imageCover}
              alt="nn"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
              }}
              className="me-3 rounded"
            />
            <div>
              <h6>{product?.product?.title}</h6>
              <p className="text-success mb-1">{product.price}</p>
              <button
                className="text-danger p-0 border-0 bg-transparent"
                onClick={() => handleRemoveClick(product._id)}
              >
                🗑 Remove
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-success btn-sm">+</button>
            <span className="mx-2">{product.count}</span>
            <button className="btn btn-outline-success btn-sm">-</button>
          </div>
        </div>
      ))}

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>هل أنت متأكد أنك تريد حذف هذا المنتج؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            نعم، احذف
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
