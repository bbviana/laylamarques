package br.com.bbviana.laylamarques

import org.junit.BeforeClass
import org.junit.Test

import static org.junit.Assert.*

/**
 * @see ItemDAO
 */
class ItemDAOTest extends BaseTest {

    private static ItemDAO itemDAO

    @BeforeClass
    static void prepare() {
        itemDAO = new ItemDAO()
        itemDAO.ds = ds
    }

    @Test
    void testInsert() throws Exception {
        // CENARIO
        def template = [name: "Item 1"]
        def item = new Item(template)

        // TEST
        itemDAO.insert item

        // ASSERTS
        assertNotNull item.id

        item = ds.get Item.class, item.id
        compare item, template
    }

    @Test
    void testUpdate() throws Exception {
        // CENARIO
        def template = [name: "Item 1"]
        def item = populate(Item, template)

        // TEST
        item.name = "Item 1 changed"
        itemDAO.update item

        // ASSERTS
        assertEquals "Item 1 changed", ds.get(Item, item.id).name
    }

    @Test
    void testList() throws Exception {
        // CENARIO
        def templates = [
                [name: "Item 1"],
                [name: "Item 2"],
                [name: "Item 3"]
        ]
        populate(Item, templates)

        // TEST
        def categories = itemDAO.list().sort { it.name }

        // ASSERTS
        compare(categories, templates)
    }

    @Test
    void testFind() throws Exception {
        // CENARIO
        def templates = [
                [name: "Item 1"],
                [name: "Item 2"],
        ]
        def categories = populate(Item, templates)

        // TEST, ASSERTS
        compare(itemDAO.find(categories[0].id.toString()), templates[0])
        compare(itemDAO.find(categories[1].id.toString()), templates[1])

    }

    @Test
    void testRemove() throws Exception {
        // CENARIO
        def template = [name: "Item 1"]
        def item = populate(Item, template)

        // TEST
        itemDAO.remove item.id.toString()

        // ASSERTS
        assertNull ds.get(Item, item.id)
    }

    ////////////////////////////////////////////////////////////////////////////////
    // UTILS
    ////////////////////////////////////////////////////////////////////////////////


}