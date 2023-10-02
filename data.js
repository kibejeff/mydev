const data = [
    {
        id: 1,
        title: "Rice Cooker",
        description: "Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.",
        features: [ // There is a property you can set in ruby to allow an array data type
            "Cooks rice in less than 6 minutes",
            "Saves 80% of your total electricity consumption",
            "Environment safe with zero air pollution",
            "Tracks your daily electricity consumption"
        ],
        image: "https://cdn.shopify.com/s/files/1/2099/5125/products/42238-IMG1_700x.jpg?v=1666075821", //this should be stored to cloud services like aws or also allow links
        images: [
            "https://cdn.shopify.com/s/files/1/2099/5125/products/42238-IMG1_700x.jpg?v=1666075821",
            "https://cdn.shopify.com/s/files/1/2099/5125/products/42238-IMG1_700x.jpg?v=1666075821",
            "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1637716442-15368505.jpg",
            "https://m.media-amazon.com/images/I/61IoTwVDilL._AC_SY355_.jpg",
        ],
        status: "In Stock",
        price: 4000,
        is_sale: false,
        discount: 0,
        badge: '',
        quantity: 1,
        vendor: {                   //
            name: "GIVE Limited",   // This field is a foreign key to the products
            ratings: 4,             //
        },
        brand: {                                                                                    //
            name: "MICA",                                                                           // This field is also a foreign key
            logo: "https://mica-corp.com/wp-content/uploads/2021/07/mica-logo-blue-retina-02.png"   //
        },
        category: "Cookware", // This is a foreign key
        tags: [
            "rice", "rice cooker", "cooker"
        ],
        reviews : [ //The reviews are a separate model on their own and the user and products are foreign keys
            {
                user: "Abzed Mohammed", //this user is a foreign key
                review: "The products works fine for the first 3 months only",
                rating: 2 // The maximum value shpould be 5
            },
            {
                user: "Susan Odongo",
                review: "Really nice appliance",
                rating: 4
            },
            {
                user: "Stella Owuor",
                review: "It broke on the first day. Not good quality",
                rating: 1
            }
        ],
    },

    {
        id: 2,
        title: "SVK76789 Double Deck Fridge",
        description: "Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.",
        features: [
            "Best low budget fridge for business",
            "Consumes less electricity",
            "Environment safe with zero air pollution",
            "Tracks your daily electricity consumption",
            "Has amazing cooling techniques",
            "Keep cool for 24hours after electric power loss"
        ],
        image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1637716442-15368505.jpg",
        images: [
            "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1637716442-15368505.jpg",
            "https://cdn.shopify.com/s/files/1/2099/5125/products/42238-IMG1_700x.jpg?v=1666075821",
            "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1637716442-15368505.jpg",
            "https://m.media-amazon.com/images/I/61IoTwVDilL._AC_SY355_.jpg",
        ],
        status: "Out of Stock",
        price: 42999,
        is_sale: true,
        discount: 40,
        badge: 'Hot',
        quantity: 0,
        vendor: {
            name: "KPLC Limited",
            ratings: 3,
        },
        brand: {
            name: "RAMTONS",
            logo: "https://gadgetshome.co.ke/wp-content/uploads/2021/01/RAMTONS.png"
        },
        category: "Kitchen Appliances",
        tags: [
            "fridge", "refrigirator"
        ],
        reviews: [
            {
                user: "Abzed Mohammed",
                review: "The products works fine for the first 3 months only",
                rating: 2
            },
            {
                user: "Susan Odongo",
                review: "Really nice appliance",
                rating: 5
            },
            {
                user: "Stella Owuor",
                review: "It broke on the first day. Not good quality",
                rating: 3
            }
        ]

    },
    {
        id: 3,
        title: "Electric Banner",
        description: "Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.",
        features: [
            "Best low budget bunner for business",
            "Consumes less electricity",
            "Environment safe with zero air pollution",
            "Tracks your daily electricity consumption",
            "Has amazing heat insulators",
        ],
        image: "https://m.media-amazon.com/images/I/61IoTwVDilL._AC_SY355_.jpg",
        images: [
            "https://m.media-amazon.com/images/I/61IoTwVDilL._AC_SY355_.jpg",
            "https://cdn.shopify.com/s/files/1/2099/5125/products/42238-IMG1_700x.jpg?v=1666075821",
            "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1637716442-15368505.jpg",
            "https://m.media-amazon.com/images/I/61IoTwVDilL._AC_SY355_.jpg",
        ],
        status: "In Stock",
        price: 5999,
        is_sale: true,
        discount: 30,
        badge: '-30%',
        quantity: 0,
        vendor: {
            name: "Diana Limited",
            ratings: 5,
        },
        brand: {
            name: "RAMTONS",
            logo: "https://gadgetshome.co.ke/wp-content/uploads/2021/01/RAMTONS.png"
        },
        category: "Kitchen Appliances",
        tags: [
            "burner", "cooker"
        ],
        reviews: [
            {
                user: "Abzed Mohammed",
                review: "The products works fine for the first 3 months only",
                rating: 5
            },
            {
                user: "Susan Odongo",
                review: "Really nice appliance",
                rating: 1
            },
            {
                user: "Stella Owuor",
                review: "It broke on the first day. Not good quality",
                rating: 3
            }
        ]

    },
    {
        id: 4,
        title: "4K Ultra HD TV",
        description: "Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.",
        features: [
            "Comes with free wall mount",
            "Has wireless bluetooth speaker",
            "Base surround loud enough to wake your neighbours",
            "Tracks your daily electricity consumption",
            "Has amazing heat insulators",
        ],
        image: "https://www.superkingdom.co.ke/wp-content/uploads/2020/07/55un7340.jpg",
        images: [
            "https://www.superkingdom.co.ke/wp-content/uploads/2020/07/55un7340.jpg",
            "https://cdn.shopify.com/s/files/1/2099/5125/products/42238-IMG1_700x.jpg?v=1666075821",
            "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1637716442-15368505.jpg",
            "https://m.media-amazon.com/images/I/61IoTwVDilL._AC_SY355_.jpg",
        ],
        status: "Out of Stock",
        price: 54999,
        is_sale: true,
        discount: 15,
        badge: '-15%',
        quantity: 0,
        vendor: {
            name: "GIVE Limited",
            ratings: 5,
        },
        brand: {
            name: "RAMTONS",
            logo: "https://gadgetshome.co.ke/wp-content/uploads/2021/01/RAMTONS.png"
        },
        category: "Kitchen Appliances",
        tags: [
            "fridge", "refrigirator"
        ],
        reviews: [
            {
                user: "Abzed Mohammed",
                review: "The products works fine for the first 3 months only",
                rating: 1
            },
            {
                user: "Susan Odongo",
                review: "Really nice appliance",
                rating: 2
            },
            {
                user: "Stella Owuor",
                review: "It broke on the first day. Not good quality",
                rating: 1
            }
        ]

    },
    {
        id: 5,
        title: "Solar panel",
        description: "Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.",
        features: [
            "Comes with free roof mount",
            "Has long 10m socket adapter",
            "Chargers even with no sunlight",
            "Tracks your daily electricity consumption",
            "Has amazing heat insulators",
        ],
        image: "https://m.media-amazon.com/images/I/71Vt8oPSnwL.jpg",
        images: [
            "https://m.media-amazon.com/images/I/71Vt8oPSnwL.jpg",
            "https://cdn.shopify.com/s/files/1/2099/5125/products/42238-IMG1_700x.jpg?v=1666075821",
            "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1637716442-15368505.jpg",
            "https://m.media-amazon.com/images/I/61IoTwVDilL._AC_SY355_.jpg",
        ],
        status: "Out of Stock",
        price: 21999,
        is_sale: true,
        discount: 5,
        badge: '-5%',
        quantity: 0,
        vendor: {
            name: "Tetz Limited",
            ratings: 5,
        },
        brand: {
            name: "MICA",
            logo: "https://mica-corp.com/wp-content/uploads/2021/07/mica-logo-blue-retina-02.png"
        },
        category: "Kitchen Appliances",
        tags: [
            "fridge", "refrigirator"
        ],
        reviews: [
            {
                user: "Abzed Mohammed",
                review: "The products works fine for the first 3 months only",
                rating: 5
            },
            {
                user: "Susan Odongo",
                review: "Really nice appliance",
                rating: 4
            },
            {
                user: "Stella Owuor",
                review: "It broke on the first day. Not good quality",
                rating: 3
            }
        ]

    },

    {
        id: 6,
        title: "5 Burner cooker",
        description: "Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.",
        features: [
            "Comes with free roof mount",
            "Has long 10m socket adapter",
            "Chargers even with no sunlight",
            "Tracks your daily electricity consumption",
            "Has amazing heat insulators",
        ],
        image: "https://images-na.ssl-images-amazon.com/images/I/71IE55CRuzL.jpg",
        images: [
            "https://images-na.ssl-images-amazon.com/images/I/71IE55CRuzL.jpg",
            "https://cdn.shopify.com/s/files/1/2099/5125/products/42238-IMG1_700x.jpg?v=1666075821",
            "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1637716442-15368505.jpg",
            "https://m.media-amazon.com/images/I/61IoTwVDilL._AC_SY355_.jpg",
        ],
        status: "Out of Stock",
        price: 11199,
        is_sale: true,
        discount: 12,
        badge: '-12%',
        quantity: 0,
        vendor: {
            name: "Dee Electronics Co.",
            ratings: 4,
        },
        brand: {
            name: "Monginas Co. Limited",
            logo: "https://img.favpng.com/5/2/15/electronic-symbol-logo-electronics-company-png-favpng-NKaUGLa4ZqfHwMY8EDWsuDp82.jpg"
        },
        category: "Kitchen Appliances",
        tags: [
            "burner", "5 burner", "cooker"
        ],
        reviews: [
            {
                user: "Abzed Mohammed",
                review: "The products works fine for the first 3 months only",
                rating: 5
            },
            {
                user: "Susan Odongo",
                review: "Really nice appliance",
                rating: 4
            },
            {
                user: "Stella Owuor",
                review: "It broke on the first day. Not good quality",
                rating: 5
            }
        ]

    },
    
];


export default data;
