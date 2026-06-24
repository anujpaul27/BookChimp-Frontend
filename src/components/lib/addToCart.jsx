
export const  addToCart = async (book) =>
{   
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json' 
        },
        body: JSON.stringify(book)
    })
    return res.ok 
}