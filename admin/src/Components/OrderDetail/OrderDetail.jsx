import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./OrderDetail.scss";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết của đơn hàng
    fetch(`http://localhost:4000/order/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((error) => console.error('Lỗi khi lấy chi tiết đơn hàng:', error));
  }, [orderId]);
  
  if (!order) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className='order-detail'>
        <h3>Chi tiết đơn hàng</h3>
        <div className='orderdetail-top'>
            <div className='row'>
                <div className='md-6'>
                    <label>Mã đơn hàng</label>
                    <input type="text" value={order._id} readOnly />
                </div>
                <div className='md-6'>
                    <label>Họ tên khách hàng</label>
                    <input type="text" value={order.name} readOnly />
                </div>
            </div>
            <div className='row'>
                <div className='md-6'>
                    <label>Số điện thoại</label>
                    <input type="text" value={order.phoneNumber} readOnly />
                </div>
                <div className='md-6'>
                    <label>Email</label>
                    <input type="text" value={order.email} readOnly />
                </div>
            </div>
            <div className='row'>
                <div className='md-6'>
                    <label>Ngày tạo</label>
                    <input type="text" value={new Date(order.date).toLocaleDateString()} readOnly />
                </div>
                <div className='md-6'>
                    <label>Trạng thái</label>
                    <input type="text" value={order.status} readOnly />
                </div>
            </div>
        </div>
        <div>
            <h3>Danh sách sản phẩm</h3>
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
                {order.products.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{itemIndex + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity * item.price}</td>
                  </tr>
                ))}
                <tr>
                  <th colSpan={4} className='item-table'>Tổng tiền </th>
                  <th>{order.totalAmount}</th>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default OrderDetail;
