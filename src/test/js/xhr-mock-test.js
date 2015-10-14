
const db = require(srcFolder + '/db')
const xhrMock = require(srcFolder + '/utils/xhr-mock')

describe('xhrMock:bg-images', () => {
    const bgImages = db['bg-images']

    pit('[GET] bg-images', () =>
        xhrMock.get('bg-images').then(data => {
            expect(data).toEqual(bgImages)
        })
    )

    pit('[GET] bg-images/{id}', () =>
        xhrMock.get('bg-images/1').then(data => {
            expect(data).toEqual(bgImages[0])
        })
    )

    pit('[POST] bg-images', () =>
        xhrMock.post('bg-images', {url:'new.jpg'}).then(data => {
            expect(data.id).toBeDefined()
            expect(data.url).toBe('new.jpg')
            expect(bgImages).toContain(data)
        })
    )

    pit('[PUT] bg-images/{id}', () =>
        xhrMock.put('bg-images/1', {url:'edited.jpg'}).then(data => {
            expect(data).toEqual({id: 1, url:'edited.jpg'})
            expect(bgImages).toContain(data)
        })
    )

    pit('[DELETE] bg-images/{id}', () =>
        xhrMock.delete('bg-images/1').then(data => {
            expect(data.id).toBe(1)
            expect(bgImages).not.toContain(data)
        })
    )
})

describe('xhrMock:filters', () => {
    const categories = db['categories']

    pit('[GET] /categories?name=Artesanato', () =>
        xhrMock.get('/categories?name=Artesanato').then(data => {
            expect(data.id).toBe(3)
            expect(data.name).toBe('Artesanato')
        })
    )

    pit('[GET] /categories?name=Pinturas&id=2', () =>
        xhrMock.get('/categories?name=Pinturas&id=2').then(data => {
            expect(data.id).toBe(2)
            expect(data.name).toBe('Pinturas')
        })
    )

    pit('[GET] /categories?main=true', () =>
        xhrMock.get('/categories?main=true').then(data => {
            expect(data.length).toBe(5)
        })
    )

    pit('[GET] /categories?main', () =>
        xhrMock.get('/categories?main').then(data => {
            expect(data.length).toBe(5)
        })
    )
})

describe('xhrMock:categories', () => {
    const categories = db['categories']

    pit('[GET] categories', () =>
        xhrMock.get('categories').then(data => {
            expect(data.length).toBe(13)
            expect(data).toEqual(categories)
        })
    )

    pit('[GET] categories/{id}', () =>
        xhrMock.get('categories/1').then(data => {
            expect(data).toEqual(categories[0])
        })
    )

    pit('[GET] categories/{id}/subCategories', () =>
        xhrMock.get('categories/1/subCategories').then(data => {
            expect(data.length).toBe(4)
            expect(data).toEqual(categories[0].subCategories)
        })
    )

    pit('[GET] categories/{id}/subCategories/{id}', () =>
        xhrMock.get('categories/1/subCategories/13').then(data => {
            expect(data).toEqual(categories[0].subCategories[2])
        })
    )

    pit('[POST] categories', () =>
        xhrMock.post('categories', {name:'Nova'}).then(data => {
            expect(data.id).toBeDefined()
            expect(data.name).toBe('Nova')
            expect(categories).toContain(data)
        })
    )

    pit('[POST] categories/{id}/subCategories', () =>
        xhrMock.post('categories/1/subCategories', {name:'Nova Sub'}).then(data => {
            expect(data.id).toBeDefined()
            expect(data.name).toBe('Nova Sub')
            expect(categories[0].subCategories).toContain(data)
        })
    )

    pit('[PUT] categories/{id}', () =>
        xhrMock.put('categories/1', {name:'Editada'}).then(data => {
            expect(data.id).toBe(1)
            expect(data.name).toBe('Editada')
            expect(categories).toContain(data)
        })
    )

    pit('[PUT] categories/{id}/subCategories/{id}', () =>
        xhrMock.put('categories/1/subCategories/11', {name:'Sub Editada'}).then(data => {
            expect(data.id).toBe(11)
            expect(data.name).toBe('Sub Editada')
            expect(categories[0].subCategories).toContain(data)
        })
    )

    pit('[DELETE] categories/{id}', () =>
        xhrMock.delete('categories/1').then(data => {
            expect(data.id).toBe(1)
            expect(categories).not.toContain(data)
        })
    )

    pit('[DELETE] categories/{id}/subCategories/{id}', () =>
        xhrMock.delete('categories/2/subCategories/21').then(data => {
            expect(data.id).toBe(21)
            expect(categories[1].subCategories).not.toContain(data)
        })
    )
})
