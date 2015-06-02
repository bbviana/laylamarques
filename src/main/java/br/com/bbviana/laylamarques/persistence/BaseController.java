package br.com.bbviana.laylamarques.persistence;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;

import javax.inject.Inject;
import javax.ws.rs.*;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * @author bbviana
 */
public class BaseController<T> {

    @Inject
    protected Datastore ds;

    @SuppressWarnings("unchecked")
    private Class<T> entityType() {
        Class<?> clazz = CDIUtils.removeProxy(this.getClass());
        Type entityType = ((ParameterizedType) clazz.getGenericSuperclass()).getActualTypeArguments()[0];
        return (Class<T>) entityType;
    }

    @GET
    public List<T> list() {
        return ds.find(entityType()).asList();
    }


    @GET
    @Path("{id}")
    public T find(@PathParam("id") ObjectId id) {
        return ds.get(entityType(), id);
    }

    @POST
    @Consumes(APPLICATION_JSON)
    public T save(T entity) {
        this.preSave(entity);

        ds.save(entity);
        return entity;
    }

    @DELETE
    @Path("{id}")
    public T remove(@PathParam("id") ObjectId id) {
        T entity = ds.get(entityType(), id);

        this.preRemove(entity);

        ds.delete(entity);
        return entity;
    }

    public Query<T> createQuery() {
        return this.ds.createQuery(entityType());
    }

    ////////////////////////////////////////////////////////////////////////////////
    // HOOKS
    ////////////////////////////////////////////////////////////////////////////////


    protected void preSave(T entity) {
        // hook
    }

    protected void preRemove(T entity) {
        // hook;
    }


}
