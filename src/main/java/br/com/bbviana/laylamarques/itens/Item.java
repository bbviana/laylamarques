package br.com.bbviana.laylamarques.itens;

import br.com.bbviana.laylamarques.categorias.Categoria;
import br.com.bbviana.laylamarques.imagens.Imagem;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;
import org.mongodb.morphia.annotations.Transient;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

/**
 * @author bbviana
 */
@Entity("items")
public class Item {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private String titulo;

    // Usamos para guardar dados da tela (upload de imagem por ex)
    @JsonIgnore
    @Transient
    private Imagem imagem;

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId imagemID;

    @JsonIgnore
    @Reference
    private Categoria categoria;

    // <editor-fold desc="Object">
    @Override
    public String toString() {
        return reflectionToString(this, SHORT_PREFIX_STYLE);
    }

    // </editor-fold>

    // <editor-fold desc="Getters e Setters">

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Imagem getImagem() {
        return imagem;
    }

    public void setImagem(Imagem imagem) {
        this.imagem = imagem;
    }

    public ObjectId getImagemID() {
        return imagemID;
    }

    public void setImagemID(ObjectId imagemID) {
        this.imagemID = imagemID;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }


    // </editor-fold>
}
