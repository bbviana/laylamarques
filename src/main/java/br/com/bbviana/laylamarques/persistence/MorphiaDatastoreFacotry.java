package br.com.bbviana.laylamarques.persistence;

import br.com.bbviana.laylamarques.delete.Book;
import br.com.bbviana.laylamarques.files.DigitalFile;
import com.mongodb.MongoClient;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import java.net.UnknownHostException;

/**
 * @author bbviana
 */
public class MorphiaDatastoreFacotry {

    private static final String HOST = "localhost";
    private static final int PORT = 27017;
    private static final String DATABASE = "laylamarques";

    @Produces
    @ApplicationScoped
    public Datastore createDataStore() {
        MongoClient mongo = null;
        try {
            mongo = new MongoClient(HOST, PORT);
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }

        Morphia morphia = new Morphia().map(Book.class, DigitalFile.class);
        Datastore ds = morphia.createDatastore(mongo, DATABASE);

        System.out.printf("Carregando '%s' database...\n", DATABASE);

        return ds;
    }
}
