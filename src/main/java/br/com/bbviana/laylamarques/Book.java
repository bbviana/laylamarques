package br.com.bbviana.laylamarques;

import br.com.bbviana.laylamarques.files.DigitalFile;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING;
import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

/**
 * @author bbviana
 */
@Entity("books")
public class Book {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private String title;

    private String category;

    private String author;

    private String publisher;

    @JsonFormat(shape = STRING, pattern = "yyyy-MM-dd")
    private Date datePublished;

    private String description;

    private DigitalFile cover;

    private Set<DigitalFile> files = new HashSet<>();

    // <editor-fold desc="Object">
    @Override
    public String toString() {
        return reflectionToString(this, SHORT_PREFIX_STYLE);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        final Book other = (Book) obj;
        return Objects.equals(this.id, other.id);
    }

    // </editor-fold>

    // <editor-fold desc="Getters e Setters">
    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Date getDatePublished() {
        return datePublished;
    }

    public void setDatePublished(Date datePublished) {
        this.datePublished = datePublished;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DigitalFile getCover() {
        return cover;
    }

    public void setCover(DigitalFile cover) {
        this.cover = cover;
    }

    public Set<DigitalFile> getFiles() {
        return files;
    }

    public void setFiles(Set<DigitalFile> files) {
        this.files = files;
    }

    // </editor-fold>
}
