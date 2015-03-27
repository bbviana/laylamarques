package br.com.bbviana.laylamarques;

import br.com.bbviana.laylamarques.files.DigitalFile;
import com.mongodb.MongoClient;
import org.bson.types.ObjectId;
import org.junit.BeforeClass;
import org.junit.Test;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;

import java.util.List;

/**
 * @author bbviana
 */
public class MorphiaTest {

    private static Datastore ds;

    @BeforeClass
    public static void createDS() throws Exception {
        MongoClient mongo = new MongoClient("localhost", 27017);
        Morphia morphia = new Morphia();
        morphia.map(Book.class, DigitalFile.class);
        ds = morphia.createDatastore(mongo, "test");
    }

    @Test
    public void testSave() {
        Book book = new Book();
        book.setTitle("Book 1");

        DigitalFile digital = new DigitalFile();
        digital.setMimeType("image/jpeg");
        book.setCover(digital);
        book.getFiles().add(digital);


        ds.save(book);
    }

    @Test
    public void testFind() {
        Query<Book> query = ds.createQuery(Book.class).filter("title", "Book 1");

        List<Book> books = query.asList();
        System.out.println(books);

        Book book = ds.get(Book.class, new ObjectId("54f1d6c731da45ce672d3f9e"));
        System.out.println(book);
    }
}
