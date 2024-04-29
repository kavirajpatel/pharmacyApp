import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderListingPage.css";

const OrderListingPage = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    New: true,
    Packed: true,
    InTransit: true,
    Delivered: true,
  });

  useEffect(() => {
    // Fetch orders from API
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters({ ...filters, [name]: checked });
  };

  const filteredOrders = orders.filter(
    (order) => filters[order.orderStatus]
  );

  return (
    <div className="Homepage_PageWrapper__35FDy">
      <h2 className="Homepage_MainHeading__3eRiM">Order</h2>
      <div className="Homepage_OrdersWrapper__A-VhO">
        <div className="Homepage_FilterWrapper__2PcDK">
          <h3>Filters</h3>
          <div className="Homepage_FilterOptions__wNuP7">
            <p>Count: {filteredOrders.length}</p>
            <label className="Homepage_FilterCheckbox__2-zv7">
              <input
                type="checkbox"
                name="New"
                onChange={handleFilterChange}
                checked={filters.New}
              />
              New
            </label>
            <label className="Homepage_FilterCheckbox__2-zv7">
              <input
                type="checkbox"
                name="Packed"
                onChange={handleFilterChange}
                checked={filters.Packed}
              />
              Packed
            </label>
            <label className="Homepage_FilterCheckbox__2-zv7">
              <input
                type="checkbox"
                name="InTransit"
                onChange={handleFilterChange}
                checked={filters.InTransit}
              />
              InTransit
            </label>
            <label className="Homepage_FilterCheckbox__2-zv7">
              <input
                type="checkbox"
                name="Delivered"
                onChange={handleFilterChange}
                checked={filters.Delivered}
              />
              Delivered
            </label>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th> Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td  className="secondaryColor">{order.id}</td>
                <td className="primaryColor">{order.customerName}</td>
                <td className="primaryColor">{order.orderDate}</td>
                <td  className="secondaryColor">{order.amount}</td>
                <td className="primaryColor">{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListingPage;
