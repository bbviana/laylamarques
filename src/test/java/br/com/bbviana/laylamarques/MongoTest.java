package br.com.bbviana.laylamarques;

import com.mongodb.*;
import org.bson.types.ObjectId;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Map;

/**
 * @author bbviana
 */
public class MongoTest {

    private static DB db;

    @BeforeClass
    public static void loadDB() throws Exception {
        MongoClient mongo = new MongoClient("localhost", 27017);
        db = mongo.getDB("test");
    }

    @Test
    public void testConnection() {
        DBCollection books = db.getCollection("books");

        // insert
        BasicDBObject book = new BasicDBObject();
        book.put("title", "Book 2");
        book.put("author", "Author 2");
        book.put("publisher", "Casa do COdigo");
        books.insert(book);

        ObjectId id = book.getObjectId("_id");
        System.out.println(id);
    }

    @Test
    public void testFindById() {
        DBCollection books = db.getCollection("books");

        DBObject one = books.findOne(new ObjectId("54e62a4d31da533d0cbc1861"));
        System.out.println(one);
    }

    @Test
    public void testToMap(){
        BasicDBObject parent = new BasicDBObject();
        parent.append("prop1", "value1");

        BasicDBObject child = new BasicDBObject("prop1", "value1");
        parent.append("child", child);

        Map map = parent.toMap();
        System.out.println(map);

    }

}
