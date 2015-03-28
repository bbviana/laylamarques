package br.com.bbviana.laylamarques

import br.com.bbviana.laylamarques.files.DigitalFile
import br.com.bbviana.laylamarques.files.FileDAO
import com.mongodb.BasicDBObject
import com.mongodb.gridfs.GridFS
import com.mongodb.gridfs.GridFSDBFile
import com.mongodb.gridfs.GridFSFile
import com.mongodb.gridfs.GridFSInputFile
import org.bson.types.ObjectId
import org.junit.BeforeClass
import org.junit.Test

import static com.google.common.io.ByteStreams.toByteArray
import static org.junit.Assert.*

/**
 * @see CategoryDAO
 */
class CategoryDAOTest extends BaseTest {

    private static CategoryDAO categoryDAO

    @BeforeClass
    static void prepare() {
        categoryDAO = new CategoryDAO()
        categoryDAO.ds = ds
    }

    @Test
    void testInsert() throws Exception {
        // CENARIO
        def template = [name: "Category 1"]
        def category = new Category(template)

        // TEST
        categoryDAO.insert category

        // ASSERTS
        assertNotNull category.id

        category = ds.get Category.class, category.id
        compare category, template
    }

    @Test
    void testUpdate() throws Exception {
        // CENARIO
        def template = [name: "Category 1"]
        def category = populate(Category, template)

        // TEST
        category.name = "Category 1 changed"
        categoryDAO.update category

        // ASSERTS
        assertEquals "Category 1 changed", ds.get(Category, category.id).name
    }

    @Test
    void testList() throws Exception {
        // CENARIO
        def templates = [
                [name: "Category 1"],
                [name: "Category 2"],
                [name: "Category 3"]
        ]
        populate(Category, templates)

        // TEST
        def categories = categoryDAO.list().sort { it.name }

        // ASSERTS
        compare(categories, templates)
    }

    @Test
    void testFind() throws Exception {
        // CENARIO
        def templates = [
                [name: "Category 1"],
                [name: "Category 2"],
        ]
        def categories = populate(Category, templates)

        // TEST, ASSERTS
        compare(categoryDAO.find(categories[0].id.toString()), templates[0])
        compare(categoryDAO.find(categories[1].id.toString()), templates[1])

    }

    @Test
    void testRemove() throws Exception {
        // CENARIO
        def template = [name: "Category 1"]
        def category = populate(Category, template)

        // TEST
        categoryDAO.remove category.id.toString()

        // ASSERTS
        assertNull ds.get(Category, category.id)
    }

    ////////////////////////////////////////////////////////////////////////////////
    // UTILS
    ////////////////////////////////////////////////////////////////////////////////


}