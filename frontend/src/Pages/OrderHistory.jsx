import React, { useEffect, useState } from 'react';
import './CSS/OrderHistory.scss';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const formatNumber=(price)=>{
    return new Intl.NumberFormat('de-DE').format(price);
  }
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    
    fetch('http://localhost:4000/order-history', {
      method: 'GET',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setOrders(data))
      .catch((error) => console.error('Lỗi khi lấy lịch sử đơn hàng:', error));
  }, []);

  const handleCancelOrder = (orderId) => {
    const token = localStorage.getItem('auth-token');

    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
        fetch(`http://localhost:4000/order/${orderId}`, {
            method: 'DELETE',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.status === 401) {
                throw new Error('Unauthorized: Token không hợp lệ');
            }
            if (response.status === 403) {
                throw new Error('Forbidden: Bạn không có quyền');
            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
                alert('Đơn hàng đã được hủy.');
            } else {
                alert('Không thể hủy đơn hàng.');
            }
        })
        .catch((error) => console.error('Lỗi khi hủy đơn hàng:', error));
    }
};

  return (
    <div className='container'>
      {orders.length > 0 ? (
        orders.map((order) => {
          const orderDate = new Date(order.date);
          const now = new Date();
          const timeDifference = Math.floor((now - orderDate) / 1000); 
          const canCancel = timeDifference <= 1000; 

          return (
            <div key={order._id} className='order-history'>
              <div className='order-history-top'>
                <p>Đơn hàng: {orderDate.toLocaleString()}</p>
                {canCancel ? (
                  <button onClick={() => handleCancelOrder(order._id)}>Hủy</button>
                ) : (
                  <button disabled>{order.status}</button>
                )}
              </div>
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatNumber(item.price)}</td>
                      <td>{formatNumber((item.quantity * item.price).toFixed(2))}</td>
                    </tr>
                  ))}
                  <tr>
                    <th colSpan={4} className='item-table'>Tổng tiền </th>
                    <th>{formatNumber(order.totalAmount.toFixed(2))}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })
      ) : (
        <p>Bạn chưa có đơn hàng nào.</p>
      )}
    </div>
  );
};

export default OrderHistory;
