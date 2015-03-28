package br.com.bbviana.laylamarques;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * @author bbviana
 */
@Path("items")
@RequestScoped
@Produces(APPLICATION_JSON)
public class ItemsController {

    @Inject
    private ItemDAO itemDAO;

    @POST
    @Consumes(APPLICATION_JSON)
    public Item insert(Item entity) {
        return itemDAO.insert(entity);
    }

    @PUT
    @Consumes(APPLICATION_JSON)
    public Item update(Item entity) {
        return itemDAO.update(entity);
    }

    @GET
    @Path("{id}")
    public Item get(@PathParam("id") String id) {
        return itemDAO.find(id);
    }

    @GET
    public List<Item> list() {
        return itemDAO.list();
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") String id) {
        itemDAO.remove(id);
    }
}
