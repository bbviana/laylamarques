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
 * @see BookDAO
 */
class BookDAOTest extends BaseTest {

    private static BookDAO bookDAO

    private static GridFS filesGrid

    @BeforeClass
    static void prepare() {
        bookDAO = new BookDAO()
        bookDAO.ds = ds
        filesGrid = new GridFS(ds.getDB(), "files");

        FileDAO fileDAO = new FileDAO()
        fileDAO.ds = ds
        fileDAO.loadGridFS()
        bookDAO.fileDAO = fileDAO
    }

    @Test
    void testInsert() throws Exception {
        // CENARIO
        def template = [
                title        : "Book 1",
                author       : "Author 1",
                category     : "Category 1",
                publisher    : "Publisher 1",
                datePublished: new Date(),
                description  : "Description 1"
        ]

        def fileTemplate = [
                hash    : "AAA",
                name    : "file.jpg",
                mimeType: "image/jpeg",
                bytes   : [0, 1, 2, 3],
        ]

        Book book = new Book(template)
        book.cover = new DigitalFile(fileTemplate)
        book.files << new DigitalFile(fileTemplate)

        // TEST
        bookDAO.insert book

        // ASSERTS
        assertNotNull book.id

        book = ds.get Book.class, book.id
        compare book, template

        assertNotNull book.cover.id
        compare book.cover, fileTemplate.findAll(except("bytes"))

        assertNotNull book.files[0].id
        compare book.files[0], fileTemplate.findAll(except("bytes"))

        // Arquivos
        def gfsTemplate = [
                filename: "file.jpg",
                metadata: [hash: "AAA", mimeType: "image/jpeg"]
        ]

        compare filesGrid.findOne(new ObjectId(book.cover.id)), gfsTemplate
        compare filesGrid.findOne(new ObjectId(book.files[0].id)), gfsTemplate
    }


    @Test
    void testUpdate() throws Exception {
        // CENARIO
        def template = [title: "Book 1"]
        Book book = populate(Book, template)

        // TEST
        book.title = "Book 1 changed"
        bookDAO.update book

        // ASSERTS
        assertEquals "Book 1 changed", ds.get(Book, book.id).title
    }

    @Test
    void testUpdateRemoveFile() throws Exception {
        // CENARIO
        def gfsCover = insertOnGrid([0, 4] as byte[], [hash: "AAAC1"])
        def gfsFile1 = insertOnGrid([0, 1] as byte[], [hash: "AAAF1"])
        def gfsFile2 = insertOnGrid([0, 2] as byte[], [hash: "AAAF2"])

        def template = [
                title: "Book 1",
                cover: new DigitalFile(id: gfsCover.id.toString(), hash: "AAAC1"), // será removido
                files: [
                        new DigitalFile(id: gfsFile1.id.toString(), hash: "AAAF1"), // permanecerá
                        new DigitalFile(id: gfsFile2.id.toString(), hash: "AAAF2"), // será removido
                ]
        ]
        def book = populate(Book, template)

        // TEST
        book.cover = null
        book.files.removeIf { it.id == gfsFile2.id.toString() }
        bookDAO.update book

        book = ds.get book  // refresh

        // ASSERTS
        assertGridSize 1
        assertThatGFSWasRemoved gfsCover.id
        assertThatGFSWasRemoved gfsFile2.id
        assertThatGFSExists book.files[0].id, "AAAF1", [0, 1] as byte[]
    }

    @Test
    void testUpdateChangeFile() throws Exception {
        // CENARIO
        def gfsCover = insertOnGrid([0, 1] as byte[], [hash: "AAAC1"])
        def gfsFile1 = insertOnGrid([0, 1] as byte[], [hash: "AAAF1"])
        def gfsFile2 = insertOnGrid([0, 1] as byte[], [hash: "AAAF2"])

        def template = [
                title: "Book 1",
                cover: new DigitalFile(id: gfsCover.id.toString(), hash: "AAAC1"),
                files: [
                        new DigitalFile(id: gfsFile1.id.toString(), hash: "AAAF1"),
                        new DigitalFile(id: gfsFile2.id.toString(), hash: "AAAF2"),
                ]
        ]
        def book = populate(Book, template)

        // TEST
        book.cover = new DigitalFile(hash: "AAAC2", bytes: [0, 2] as byte[]) // ALTERAMOS
        book.files = [
                new DigitalFile(hash: "AAAF3", bytes: [0, 42]), // ALTERAMOS
                new DigitalFile(id: gfsFile2.id.toString(), hash: "AAAF2"), // mantivemos
        ]

        bookDAO.update book

        // ASSERTS
        assertGridSize 3

        assertThatGFSExists book.cover.id, "AAAC2", [0, 2] as byte[]
        assertThatGFSExists book.files[0].id, "AAAF3", [0, 42] as byte[]
        assertThatGFSExists book.files[1].id, "AAAF2", [0, 1] as byte[]

        assertThatGFSWasRemoved gfsCover.id
        assertThatGFSWasRemoved gfsFile1.id

    }

    @Test
    void testList() throws Exception {
        // CENARIO
        def templates = [
                [title: "Book 1", author: "Author 1"],
                [title: "Book 2", author: "Author 2"],
                [title: "Book 3", author: "Author 3"]
        ]
        populate(Book, templates)

        // TEST
        def books = bookDAO.list().sort { it.author }

        // ASSERTS
        compare(books, templates)
    }

    @Test
    void testFind() throws Exception {
        // CENARIO
        def templates = [
                [title: "Book 1", author: "Author 1"],
                [title: "Book 2", author: "Author 2"],
        ]
        def books = populate(Book, templates)

        // TEST, ASSERTS
        compare(bookDAO.find(books[0].id.toString()), templates[0])
        compare(bookDAO.find(books[1].id.toString()), templates[1])

    }

    @Test
    void testRemove() throws Exception {
        // CENARIO
        def gfsCover = insertOnGrid([0, 4] as byte[], [hash: "AAAC1"])
        def gfsFile1 = insertOnGrid([0, 1] as byte[], [hash: "AAAF1"])
        def gfsFile2 = insertOnGrid([0, 2] as byte[], [hash: "AAAF2"])

        def template = [
                title : "Book 1",
                author: "Author 1",
                cover : new DigitalFile(id: gfsCover.id.toString(), hash: "AAAC1"),
                files : [
                        new DigitalFile(id: gfsFile1.id.toString(), hash: "AAAF1"),
                        new DigitalFile(id: gfsFile2.id.toString(), hash: "AAAF2"),
                ]
        ]

        def book = populate(Book, template)

        // TEST
        bookDAO.remove book.id.toString()

        // ASSERTS
        assertNull ds.get(Book, book.id)
        assertGridSize 0
        assertThatGFSWasRemoved gfsCover.id
        assertThatGFSWasRemoved gfsFile1.id
        assertThatGFSWasRemoved gfsFile2.id
    }

    ////////////////////////////////////////////////////////////////////////////////
    // UTILS
    ////////////////////////////////////////////////////////////////////////////////

    static GridFSFile insertOnGrid(byte[] bytes, Map<String, Object> metadata) {
        GridFSInputFile gfsFile = filesGrid.createFile(bytes);

        BasicDBObject metadataObj = new BasicDBObject()
        metadata.forEach { key, value ->
            metadataObj.append(key, value)
        }
        gfsFile.metaData = metadataObj

        gfsFile.save()
        return gfsFile;
    }

    static void assertThatGFSExists(def id, String hash, byte[] bytes) {
        assertNotNull id

        ObjectId objectId = id instanceof ObjectId ? id : new ObjectId(id as String)

        GridFSDBFile gfsFile = filesGrid.find objectId

        assertNotNull "'gfsFile ${id}' não encontrada no BD", gfsFile
        assertTrue "bytes são diferentes", Arrays.equals(bytes, toByteArray(gfsFile.inputStream))
        assertEquals "hash é diferente", hash, gfsFile.metaData.hash
    }

    static void assertThatGFSWasRemoved(def id) {
        ObjectId objectId = id instanceof ObjectId ? id : new ObjectId(id as String)
        assertNull "'gfsFile ${id}' não foi removida do banco", filesGrid.find(objectId)
    }

    static void assertGridSize(int size) {
        assertEquals size, filesGrid.find(new BasicDBObject()).size()
    }

}