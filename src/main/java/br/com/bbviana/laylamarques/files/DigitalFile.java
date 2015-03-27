package br.com.bbviana.laylamarques.files;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Transient;

import java.io.InputStream;
import java.util.Objects;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

/**
 * @author bbviana
 */
@Embedded
@JsonIgnoreProperties({"inputStream", "bytes"})
public class DigitalFile {

    private String id;

    private String name;

    private String hash;

    private String mimeType;

    @Transient
    private transient InputStream inputStream;

    @Transient
    private transient byte[] bytes;

    // <editor-fold desc="Object">
    @Override
    public String toString() {
        return reflectionToString(this, SHORT_PREFIX_STYLE);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, hash);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        final DigitalFile other = (DigitalFile) obj;
        return Objects.equals(this.id, other.id)
                && Objects.equals(this.hash, other.hash);
    }

    // </editor-fold>

    // <editor-fold desc="Getters e Setters">

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public byte[] getBytes() {
        return bytes;
    }

    public void setBytes(byte[] bytes) {
        this.bytes = bytes;
    }

    // </editor-fold>
}
