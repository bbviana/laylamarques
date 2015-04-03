module.exports = function (url) {
    switch (url) {
        case 'http://localhost:8080/laylamarques/items/category/11':
            return {
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
            };

        case 'http://localhost:8080/laylamarques/items/category/12':
            return {
                items: [
                    'img/cat2/1391627539_1_tb.jpg',
                    'img/cat2/1391627539_2_tb.jpg',
                    'img/cat2/1391627539_3_tb.jpg',
                    'img/cat2/1391627539_tb.jpg'
                ]
            };

        default:
            return [];
    }
};