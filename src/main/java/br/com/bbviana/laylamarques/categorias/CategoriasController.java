package br.com.bbviana.laylamarques.categorias;

import br.com.bbviana.laylamarques.interceptor.Log;
import br.com.bbviana.laylamarques.itens.Item;
import br.com.bbviana.laylamarques.persistence.BaseController;
import org.bson.types.ObjectId;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.*;
import java.util.List;
import java.util.Map;

import static java.lang.String.format;
import static java.util.stream.Collectors.toMap;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * @author bbviana
 */
@Log
@RequestScoped
@Path("categorias")
@Produces(APPLICATION_JSON)
public class CategoriasController extends BaseController<Categoria> {

    @GET
    @Path("tree")
    public Categoria tree() {
        Categoria root = new Categoria();
        List<Categoria> categorias = list();

        // id -> Categoria
        Map<ObjectId, Categoria> map = categorias.stream().collect(toMap(Categoria::getId, c -> c));

        categorias.forEach(categoria -> {
            Categoria categoriaPai = categoria.getCategoriaPai();
            if (categoriaPai == null) {
                root.getSubCategorias().add(categoria);
            } else {
                map.get(categoriaPai.getId()).getSubCategorias().add(categoria);
            }
        });

        return root;
    }

    @Override
    public void preRemove(Categoria entity) {
        ObjectId id = entity.getId();

        // disableValidation é importante, pois $id não existe e esta é a forma de buscar por References

        boolean hasItems = ds.find(Item.class).disableValidation().filter("categoria.$id", id).countAll() > 0;
        if (hasItems) {
            throw new IllegalArgumentException(format("Não é possível remover a categoria %s, pois ela possui itens", id));
        }

        boolean hasChildren = ds.find(Categoria.class).disableValidation().filter("categoriaPai.$id", id).countAll() > 0;
        if (hasChildren) {
            throw new IllegalArgumentException(format("Não é possível remover a categoria %s, pois ela possui sub-categorias", id));
        }
    }
}
