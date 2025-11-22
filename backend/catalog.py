# backend/catalog.py

PRODUCTS = [
    {
        "id": "p1",
        "title": "Red Running Shoes",
        "category": "shoes",
        "image_url": "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
        "offers": [
            {
                "platform": "Amazon",
                "price": 1999,
                "url": "https://amazon.in/dp/DEALSCOUT_P1?tag=aff_demo"
            },
            {
                "platform": "Flipkart",
                "price": 2099,
                "url": "https://flipkart.com/item/DEALSCOUT_P1?affid=demo"
            },
            {
                "platform": "Meesho",
                "price": 1899,
                "url": "https://meesho.com/item/DEALSCOUT_P1"
            },
        ],
    },

    {
        "id": "p2",
        "title": "Black Wireless Headphones",
        "category": "electronics",
        "image_url": "https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg",
        "offers": [
            {
                "platform": "Amazon",
                "price": 2999,
                "url": "https://amazon.in/dp/DEALSCOUT_P2?tag=aff_demo"
            },
            {
                "platform": "Myntra",
                "price": 3199,
                "url": "https://myntra.com/item/DEALSCOUT_P2"
            },
        ],
    },

    {
        "id": "p3",
        "title": "White Casual Sneakers",
        "category": "shoes",
        "image_url": "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg",
        "offers": [
            {
                "platform": "Flipkart",
                "price": 1499,
                "url": "https://flipkart.com/item/DEALSCOUT_P3?affid=demo"
            },
            {
                "platform": "Amazon",
                "price": 1599,
                "url": "https://amazon.in/dp/DEALSCOUT_P3?tag=aff_demo"
            },
        ],
    },

    {
        "id": "p4",
        "title": "Blue Denim Jacket",
        "category": "fashion",
        "image_url": "https://images.pexels.com/photos/769730/pexels-photo-769730.jpeg",
        "offers": [
            {
                "platform": "Amazon",
                "price": 1299,
                "url": "https://amazon.in/dp/DEALSCOUT_P4?tag=aff_demo"
            },
            {
                "platform": "Meesho",
                "price": 1199,
                "url": "https://meesho.com/item/DEALSCOUT_P4"
            },
        ],
    },
]
