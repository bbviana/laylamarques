package br.com.bbviana.laylamarques

import br.com.bbviana.laylamarques.files.DigitalFile
import com.mongodb.MongoClient
import org.junit.AfterClass
import org.junit.Before
import org.junit.BeforeClass
import org.mongodb.morphia.Datastore
import org.mongodb.morphia.Morphia

import static org.junit.Assert.assertEquals

/**
 * @author bbviana
 */
abstract class BaseTest {

    private static final String DATABASE = "laylamarques-test"

    private static MongoClient mongo

    protected static Datastore ds

    @BeforeClass
    static void loadDataBaseAtStartup() throws Exception {
        enableMongoLogging()

        mongo = new MongoClient("localhost", 27017)
        Morphia morphia = new Morphia().map(Book, DigitalFile)
        ds = morphia.createDatastore(mongo, DATABASE)
    }

    private static void enableMongoLogging() {
        // Enable MongoDB logging in general
        System.setProperty("DEBUG.MONGO", "true")
        // Enable DB operation tracing
        System.setProperty("DB.TRACE", "true")
    }

    @Before
    void cleanDataBaseBeforeEachTest() {
        println "Limpando database..."
        mongo.getDB(DATABASE).dropDatabase()
    }

    @AfterClass
    static void cleanDataBaseAfterTests() {
        println "Limpando database..."
        mongo.getDB(DATABASE).dropDatabase()
    }

    static <T> List<T> populate(Class<T> entityClass, List templates) {
        def entities = templates.collect { entityClass.newInstance(it) }
        ds.save entities
        return entities
    }

    static <T> T populate(Class<T> entityClass, Map template) {
        return populate(entityClass, [template])[0]
    }


    static void compare(def bean, Map template) {
        template.forEach { name, value -> assertEquals(value, bean[name as String]) }
    }

    static void compare(List beans, List templates) {
        beans.eachWithIndex { bean, i -> compare(bean, templates[i] as Map) }
    }

    /**
     *  def map = [a: "A", b: "B"]
     *  def filtered = map.findAll(except("a"))
     *  assert filtered == [b: "B"]
     */
    static Closure except(String... keysToIgnore) {
        return { entry -> return !keysToIgnore.contains(entry.key) }
    }
}
