import React from 'react';
import CartPage from './cartShow';
import { getUserServer } from '@/components/lib/getSessionServer';
import { getData } from '@/components/lib/getData';

const page =async () => {

    const userId = await getUserServer()
    const carts = await getData(`cart/all-carts/${userId}`)
    return (
        <div>
            <CartPage carts={carts}/>
        </div>
    );
};

export default page;