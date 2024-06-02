import { useEffect, useState } from 'react';
import axios from "axios";
import './products.css';
import { Grid, Button, Dialog } from '@mui/material';

function Products() {
    const [products, setProducts] = useState();
    const [cartDetails, setcartDetails] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(res => setProducts(res.data?.products))
    }, [])

    useEffect(() => {
        localStorage.setItem('Products added', JSON.stringify(cartDetails));
        const data = JSON.parse(localStorage.getItem('Products added'));
        console.log(data);
    }, [cartDetails])

    const ViewCart = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function addToCart(prods) {
        setcartDetails([...cartDetails,
        {
            id: prods?.id,
            title: prods?.title,
            price: prods?.price,
            image: prods?.images?.[0]
        }
        ]
        )
    }
    const data = JSON.parse(localStorage.getItem('Products added'));

    return (
        <div className="background">
            <p className='title'>Products</p>
            <div className='price' style={{ marginBottom: '12px' }}>
                <Button variant="outlined" color="inherit" onClick={ViewCart}>View Cart</Button></div>

            <Grid
                container
                spacing={1}
            >
                {products?.map((prods) => (
                    <Grid item xs={12} md={6} lg={4}
                        spacing={2} className='productGrid'>
                        <div className='innerGrid'>
                            <p className='price'>{prods?.price}</p>
                            <img src={prods?.images?.[0]} alt='Product' height="240px" width="380x" className='prodImg'></img>
                            <p className='prodTitle'>{prods?.title}</p>
                            <p>{prods?.description}</p>
                            <Button variant="outlined" color="inherit" onClick={() => addToCart(prods)}> Add To Cart</Button>
                        </div>
                    </Grid>

                ))}
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Grid
                    container
                    spacing={1}
                >
                    {data?.map((items) => (
                        <Grid item xs={12} className='productGrid'>
                            <div className='innerGrid'>
                                <p className='price'>{items?.price}</p>
                                <img src={items?.image} alt='Product' height="240px" width="380x" className='prodImg'></img>
                                <p className='prodTitle'>{items?.title}</p>
                                <p>{items?.description}</p>
                            </div>
                        </Grid>

                    ))}
                    <Button  color="inherit" onClick={handleClose}>Close</Button>
                </Grid>
            </Dialog>


        </div>
    )
}

export default Products;