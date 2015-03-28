package br.com.bbviana.laylamarques;

import br.com.bbviana.laylamarques.interceptor.Log;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

/**
 * @author bbviana
 */
@Log
@ApplicationScoped
public class ItemDAO {

    @Inject
    private Datastore ds;

    public Item insert(Item entity) {
        ds.save(entity);
        return entity;
    }

    public Item update(Item entity) {
        ds.save(entity);
        return entity;
    }

    public List<Item> list() {
        return ds.find(Item.class).asList();
    }

    public Item find(String id) {
        return ds.get(Item.class, new ObjectId(id));
    }

    public void remove(String id) {
        Item entityToRemove = ds.get(Item.class, new ObjectId(id));
        ds.delete(entityToRemove);
    }
}
