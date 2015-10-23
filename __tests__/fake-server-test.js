const db = require('../db')
const fakeServer = require('../services/fake-server')

describe('fakeServer:bg-images', () => {
    const bgImages = db['bg-images']

    pit('[GET] bg-images', () =>
        fakeServer.get('bg-images').then(data => {
            expect(data).toEqual(bgImages)
        })
    )

    pit('[GET] bg-images/{id}', () =>
        fakeServer.get('bg-images/1').then(data => {
            expect(data).toEqual(bgImages[0])
        })
    )

    pit('[POST] bg-images', () =>
        fakeServer.post('bg-images', {url:'new.jpg'}).then(data => {
            expect(data.id).toBeDefined()
            expect(data.url).toBe('new.jpg')
            expect(bgImages).toContain(data)
        })
    )

    pit('[PUT] bg-images/{id}', () =>
        fakeServer.put('bg-images/1', {url:'edited.jpg'}).then(data => {
            expect(data).toEqual({id: 1, url:'edited.jpg'})
            expect(bgImages).toContain(data)
        })
    )

    pit('[DELETE] bg-images/{id}', () =>
        fakeServer.delete('bg-images/1').then(data => {
            expect(data.id).toBe(1)
            expect(bgImages).not.toContain(data)
        })
    )
})

describe('fakeServer:filters', () => {
    const categories = db['categories']

    pit('[GET] /categories?name=Artesanato', () =>
        fakeServer.get('/categories?name=Artesanato').then(data => {
            expect(data.id).toBe(3)
            expect(data.name).toBe('Artesanato')
        })
    )

    pit('[GET] /categories?name=Pinturas&id=2', () =>
        fakeServer.get('/categories?name=Pinturas&id=2').then(data => {
            expect(data.id).toBe(2)
            expect(data.name).toBe('Pinturas')
        })
    )

    pit('[GET] /categories?main=true', () =>
        fakeServer.get('/categories?main=true').then(data => {
            expect(data.length).toBe(5)
        })
    )

    pit('[GET] /categories?main', () =>
        fakeServer.get('/categories?main').then(data => {
            expect(data.length).toBe(5)
        })
    )
})

describe('fakeServer:categories', () => {
    const categories = db['categories']

    pit('[GET] categories', () =>
        fakeServer.get('categories').then(data => {
            expect(data.length).toBe(13)
            expect(data).toEqual(categories)
        })
    )

    pit('[GET] categories/{id}', () =>
        fakeServer.get('categories/1').then(data => {
            expect(data).toEqual(categories[0])
        })
    )

    pit('[GET] categories/{id}/subCategories', () =>
        fakeServer.get('categories/1/subCategories').then(data => {
            expect(data.length).toBe(4)
            expect(data).toEqual(categories[0].subCategories)
        })
    )

    pit('[GET] categories/{id}/subCategories/{id}', () =>
        fakeServer.get('categories/1/subCategories/13').then(data => {
            expect(data).toEqual(categories[0].subCategories[2])
        })
    )

    pit('[POST] categories', () =>
        fakeServer.post('categories', {name:'Nova'}).then(data => {
            expect(data.id).toBeDefined()
            expect(data.name).toBe('Nova')
            expect(categories).toContain(data)
        })
    )

    pit('[POST] categories/{id}/subCategories', () =>
        fakeServer.post('categories/1/subCategories', {name:'Nova Sub'}).then(data => {
            expect(data.id).toBeDefined()
            expect(data.name).toBe('Nova Sub')
            expect(categories[0].subCategories).toContain(data)
        })
    )

    pit('[PUT] categories/{id}', () =>
        fakeServer.put('categories/1', {name:'Editada'}).then(data => {
            expect(data.id).toBe(1)
            expect(data.name).toBe('Editada')
            expect(categories).toContain(data)
        })
    )

    pit('[PUT] categories/{id}/subCategories/{id}', () =>
        fakeServer.put('categories/1/subCategories/11', {name:'Sub Editada'}).then(data => {
            expect(data.id).toBe(11)
            expect(data.name).toBe('Sub Editada')
            expect(categories[0].subCategories).toContain(data)
        })
    )

    pit('[DELETE] categories/{id}', () =>
        fakeServer.delete('categories/1').then(data => {
            expect(data.id).toBe(1)
            expect(categories).not.toContain(data)
        })
    )

    pit('[DELETE] categories/{id}/subCategories/{id}', () =>
        fakeServer.delete('categories/2/subCategories/21').then(data => {
            expect(data.id).toBe(21)
            expect(categories[1].subCategories).not.toContain(data)
        })
    )
})
