package br.com.bbviana.laylamarques.files;

import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import static java.util.Objects.requireNonNull;

/**
 * @author bbviana
 * @see SHA1Generator
 */
@SessionScoped
public class UploadedFilesTemp implements Serializable {

    private static final long serialVersionUID = 1L;

    private Map<String, DigitalFile> files = new HashMap<>();

    /**
     * @param hash hashCode do arquivo: SHA-1
     * @return DigitalFile ou null; o arquivo permanece no repositório após a invocação o método.
     */
    public DigitalFile get(String hash) {
        return files.get(hash);
    }

    /**
     * @param hash hashCode do arquivo: SHA-1
     * @return DigitalFile, removendo-o do repositório;
     * @throws java.lang.IllegalArgumentException se não existir um file com o hash correspondente
     */
    public DigitalFile remove(String hash) {
        if (hash == null) {
            return null;
        }
        DigitalFile digitalFile = files.remove(hash);
        if (digitalFile == null) {
            throw new IllegalArgumentException("Nenhum arquivo de upload encontrado com o hash " + hash);
        }
        return digitalFile;
    }

    public void clear() {
        files.clear();
    }

    /**
     * @param file Arquivo a ser adicionado
     * @return hashcode (SHA-1) gerado a partir dos bytes do arquivo
     */
    public String put(DigitalFile file) {
        requireNonNull(file);
        requireNonNull(file.getBytes());

        String sha1hash = SHA1Generator.generate(file.getBytes());
        file.setHash(sha1hash);

        files.put(sha1hash, file);

        System.out.println("DigitalFile adicionado. Hash: " + sha1hash);
        System.out.println("Total de arquvos: " + files.size());

        return sha1hash;
    }
}
