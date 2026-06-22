import { getData } from '@/components/lib/getData';
import React from 'react';
import BookDetails from './bookDetails';

const page = async ({params}) => {
    const {id} = await params;
    
    const book = await getData(`book/get-book/${id}`)

    return (
        <div>
            <BookDetails book={book} />
        </div>
    );
};

export default page;