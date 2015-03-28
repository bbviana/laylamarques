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
public class CategoryDAO {

    @Inject
    private Datastore ds;

    public Category insert(Category entity) {
        ds.save(entity);
        return entity;
    }

    public Category update(Category entity) {
        ds.save(entity);
        return entity;
    }

    public List<Category> list() {
        return ds.find(Category.class).asList();
    }

    public Category find(String id) {
        return ds.get(Category.class, new ObjectId(id));
    }

    public void remove(String id) {
        Category entityToRemove = ds.get(Category.class, new ObjectId(id));
        ds.delete(entityToRemove);
    }
}
