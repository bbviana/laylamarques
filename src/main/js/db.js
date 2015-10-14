const db = {
    "bg-images": [{
        id: 1,
        url: 'img/bg/1425219857.jpg'
    }, {
        id: 2,
        url: 'img/bg/1425219892.jpg'
    }, {
        id: 3,
        url: 'img/bg/1425219976.jpg'
    }, {
        id: 4,
        url: 'img/bg/1425221182.jpg'
    }],

    "categories": [{
            id: 1,
            name: "Coleções",
            subCategories: [{
                id: 11,
                name: "Inverno 2015"
            }, {
                id: 12,
                name: "Verão 2015"
            }, {
                id: 13,
                name: "Inverno 2014"
            }, {
                id: 14,
                name: "Verão 2014"
            }]
        },

        {
            id: 2,
            name: "Pinturas",
            subCategories: [
                {
                    id: 21,
                    name: "Aquarela"
                }
            ]
        },


        {
            id: 3,
            name: "Artesanato",
            subCategories: []
        },

        {
            id: 4,
            name: "Customizações",
            subCategories: []
        },

        {
            id: 5,
            name: "Desenhos",
            subCategories: [{
                id: 51,
                name: "Grafite"
            }, {
                id: 52,
                name: "Aquarela"
            }, {
                id: 53,
                name: "Pastel"
            }]
        }
    ],

    "items/category/11": {
        items: [
            'img/cat1/1410522014_tb.jpg',
            'img/cat1/1410522050_tb.jpg',
            'img/cat1/1410522069_tb.jpg',
            'img/cat1/1410522089_tb.jpg',
            'img/cat1/1410522014_tb.jpg',
            'img/cat1/1410522050_tb.jpg',
            'img/cat1/1410522069_tb.jpg',
            'img/cat1/1410522089_tb.jpg',
            'img/cat1/1410522014_tb.jpg',
            'img/cat1/1410522050_tb.jpg',
            'img/cat1/1410522069_tb.jpg',
            'img/cat1/1410522089_tb.jpg'
        ]
    },

    "items/category/12": {
        items: [
            'img/cat2/1391627539_1_tb.jpg',
            'img/cat2/1391627539_2_tb.jpg',
            'img/cat2/1391627539_3_tb.jpg',
            'img/cat2/1391627539_tb.jpg'
        ]
    },

    "items/category/13": {
        items: [
            'img/cat3/1379531531_tb.jpg',
            'img/cat3/1379531550_tb.jpg',
            'img/cat3/1379531569_tb.jpg',
            'img/cat3/1398984145_tb.jpg'
        ]
    }

}

export default db
