package br.com.bbviana.laylamarques.templates;

import br.com.bbviana.laylamarques.interceptor.Log;
import org.mongodb.morphia.Datastore;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

/**
 * @author bbviana
 */
@Log
@ApplicationScoped
public class DAOTemplate {

    @Inject
    private Datastore ds;

//    public Entity insert(Entity entity) {
//        ds.save(entity);
//        return entity;
//    }

//    public Entity update(Entity entity) {
//        ds.save(entity);
//        return entity;
//    }

//    public List<Entity> list() {
//        return ds.find(Entity.class).asList();
//    }

//    public Entity find(String id) {
//        return ds.get(Entity.class, new ObjectId(id));
//    }

//    public void remove(String id) {
//        Entity entityToRemove = ds.get(Entity.class, new ObjectId(id));
//        ds.delete(entityToRemove);
//    }
}
