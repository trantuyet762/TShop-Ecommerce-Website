import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import './Order.scss';
import { Link } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("");

  // Fetch orders on component mount
  useEffect(() => {
    fetch('http://localhost:4000/order', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  // Open modal with current order details
  const openModal = (orderId, status) => {
    setCurrentOrderId(orderId);
    setCurrentStatus(status);
    setModalOpen(true);
  };

  // Close the modal
  const closeModal = () => setModalOpen(false);

  // Save the updated status of an order
  const saveStatus = (newStatus) => {
    fetch(`http://localhost:4000/order/${currentOrderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => response.json())
      .then(updatedOrder => {
        setOrders(orders.map(order =>
          order._id === currentOrderId ? { ...order, status: newStatus } : order
        ));
        closeModal();
      })
      .catch(error => console.error('Error updating status:', error));
  };

  // Delete an order
  const deleteOrder = (orderId) => {
    const token = localStorage.getItem('auth-token');
    fetch(`http://localhost:4000/order/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setOrders(orders.filter(order => order._id !== orderId));
        } else {
          console.error('Error deleting order:', data.message);
        }
      })
      .catch(error => console.error('Error deleting order:', error));
  };

  return (
    <div className='admin-order'>
      <h3>Danh sách đơn hàng</h3>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã đơn hàng</th>
            <th>Tên khách hàng</th>
            <th>Số điện thoại</th>
            <th>Tổng tiền</th>
            <th>Phương thức thanh toán</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order._id}</td>
              <td>{order.name}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.totalAmount}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.status}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td className='order-btn'>
                <Link to={`/orderdetail/${order._id}`}>
                  <button>Xem</button>
                </Link>
                <button 
                  className='btn btn-sm btn-danger'
                  onClick={() => openModal(order._id, order.status)}
                >
                  Cập nhật
                </button>
                <button 
                  className='btn btn-sm btn-danger'
                  onClick={() => deleteOrder(order._id)}
                >
                  Hủy
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="9">Chưa có đơn hàng nào.</td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal 
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={saveStatus}
        currentStatus={currentStatus}
      />
    </div>
  );
};

export default Order;
