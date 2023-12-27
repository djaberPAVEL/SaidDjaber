import { useEffect } from 'react';

// ...

const initialProducts = localStorage.getItem('products') 
    ? JSON.parse(localStorage.getItem('products') || '') 
    : [
        { name: "Hara", quantity: 3, price: 10, result: 3 * 10 },
        { name: "Tomato", quantity: 8, price: 20,result:0 },
        { name: "cofe", quantity: 0, price: 90 ,result:0},
      ];

const [products, setProducts] = useState(initialProducts);

useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
}, [products]);