package br.com.bbviana.laylamarques.itens;

import br.com.bbviana.laylamarques.imagens.Imagem;
import br.com.bbviana.laylamarques.persistence.BaseController;
import org.bson.types.ObjectId;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.*;
import java.util.Objects;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * @author bbviana
 */
@Path("itens")
@RequestScoped
@Produces(APPLICATION_JSON)
public class ItensController extends BaseController<Item> {

    @Override
    public void preSave(Item entity) {
        Item current = this.find(entity.getId());
        ObjectId currentImagem = current == null ? null : current.getImagemID();
        ObjectId newImagem = entity.getImagemID();

        // nova imagem adicionada
        if (!Objects.equals(currentImagem, newImagem) && currentImagem != null) {
            // apagar  antiga
            ds.delete(Imagem.class, currentImagem);
        }

        // atualiza a imagem se ela nao existe ou foi alterada
        if (entity.getImagem() != null && entity.getImagem().getBytes() != null) {
            ds.save(entity.getImagem());
            entity.setImagemID(entity.getImagem().getId());
        }
    }

    @Override
    public void preRemove(Item entity) {
        this.ds.delete(Imagem.class, entity.getImagemID());
    }

}
