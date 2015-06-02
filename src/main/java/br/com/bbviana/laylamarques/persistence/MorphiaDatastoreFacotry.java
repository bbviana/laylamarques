package br.com.bbviana.laylamarques.persistence;

import br.com.bbviana.laylamarques.categorias.Categoria;
import br.com.bbviana.laylamarques.imagens.Imagem;
import br.com.bbviana.laylamarques.itens.Item;
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
        MongoClient mongo;
        try {
            mongo = new MongoClient(HOST, PORT);
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }

        String database = DATABASE;
        if ("test".equals(System.getProperty("enviroment"))) {
            database = DATABASE + "-test";
        }


        Morphia morphia = new Morphia();
        Datastore ds = morphia.createDatastore(mongo, database);
        ds.ensureIndexes();

        System.out.printf("Carregando '%s' database...\n", database);
        return ds;
    }
}

