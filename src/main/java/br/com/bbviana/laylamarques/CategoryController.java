package br.com.bbviana.laylamarques;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * @author bbviana
 */
@Path("categories")
@RequestScoped
@Produces(APPLICATION_JSON)
public class CategoryController {

    @Inject
    private CategoryDAO categoryDAO;

    @POST
    @Consumes(APPLICATION_JSON)
    public Category insert(Category entity) {
        return categoryDAO.insert(entity);
    }

    @PUT
    @Consumes(APPLICATION_JSON)
    public Category update(Category entity) {
        return categoryDAO.update(entity);
    }

    @GET
    @Path("{id}")
    public Category get(@PathParam("id") String id) {
        return categoryDAO.find(id);
    }

    @GET
    public List<Category> list() {
        return categoryDAO.list();
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") String id) {
        categoryDAO.remove(id);
    }
}
