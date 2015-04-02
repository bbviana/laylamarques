package br.com.bbviana.laylamarques.delete;

import br.com.bbviana.laylamarques.files.DigitalFile;
import br.com.bbviana.laylamarques.files.FileDAO;
import br.com.bbviana.laylamarques.interceptor.Log;
import br.com.bbviana.laylamarques.interceptor.Sleep;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Sets.difference;
import static com.google.common.collect.Sets.newHashSet;

// TODO Ainda não encontraomos um jeto de transacionar as operações que manipulam Book e DigitalFile

/**
 * @author bbviana
 */
@Sleep(500)
@Log
@ApplicationScoped
public class BookDAO {

    @Inject
    private Datastore ds;

    @Inject
    private FileDAO fileDAO;

    public Book insert(Book book) {
        Collection<DigitalFile> files = newArrayList(book.getCover());
        files.addAll(book.getFiles());

        fileDAO.insert(files);
        ds.save(book);

        return book;
    }

    public Book update(Book book) {
        Book oldBook = ds.get(book);

        Set<DigitalFile> oldFiles = newHashSet(oldBook.getCover());
        oldFiles.addAll(oldBook.getFiles());

        Set<DigitalFile> newFiles = newHashSet(book.getCover());
        newFiles.addAll(book.getFiles());

        // oldFiles - newFiles => remove do BD
        fileDAO.remove(difference(oldFiles, newFiles));

        // newFiles - oldFiles => adiciona ao BD
        fileDAO.insert(difference(newFiles, oldFiles));

        ds.save(book);

        return book;
    }

    public List<Book> list() {
        return ds.find(Book.class).asList();
    }

    public Book find(String id) {
        return ds.get(Book.class, new ObjectId(id));
    }

    public void remove(String id) {
        Book bookToRemove = ds.get(Book.class, new ObjectId(id));

        Set<DigitalFile> filesToRemove = newHashSet(bookToRemove.getCover());
        filesToRemove.addAll(bookToRemove.getFiles());

        fileDAO.remove(filesToRemove);

        ds.delete(bookToRemove);
    }

}
