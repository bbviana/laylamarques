package br.com.bbviana.laylamarques.categorias;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;
import org.mongodb.morphia.annotations.Transient;

import java.util.ArrayList;
import java.util.List;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.MULTI_LINE_STYLE;

/**
 * @author bbviana
 */
@Entity("categorias")
public class Categoria {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private String nome;

    @JsonIgnore
    @Reference
    private Categoria categoriaPai;

    @Transient
    private List<Categoria> subCategorias = new ArrayList<>();

    // <editor-fold desc="Object">
    @Override
    public String toString() {
        return reflectionToString(this, MULTI_LINE_STYLE);
    }

    // </editor-fold>

    // <editor-fold desc="Getters e Setters">

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Categoria getCategoriaPai() {
        return categoriaPai;
    }

    public void setCategoriaPai(Categoria categoriaPai) {
        this.categoriaPai = categoriaPai;
    }

    public List<Categoria> getSubCategorias() {
        return subCategorias;
    }

    public void setSubCategorias(List<Categoria> subCategorias) {
        this.subCategorias = subCategorias;
    }


    // </editor-fold>
}
