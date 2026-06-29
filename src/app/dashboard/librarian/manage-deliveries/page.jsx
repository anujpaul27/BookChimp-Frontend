import React from 'react';
import ManageDeliveries from './ManageDelivery';

const ManageDeliveryPage =async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/all-orders`)
  const data = await res.json()
  const allOrders = data.data
  console.log(allOrders);

  return (
    <div>
      <ManageDeliveries allOrders={allOrders} />
    </div>
  );
};

export default ManageDeliveryPage;