package br.com.bbviana.laylamarques;

import br.com.bbviana.laylamarques.files.DigitalFile;
import br.com.bbviana.laylamarques.files.UploadedFilesTemp;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.util.stream.Collectors.toSet;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * @author bbviana
 */
@Path("books")
@RequestScoped
@Produces(APPLICATION_JSON)
public class BookController {

    @Inject
    private BookDAO bookDAO;

    @Inject
    private UploadedFilesTemp filesTemp;

    @POST
    @Consumes(APPLICATION_JSON)
    public Book insert(Book book) {
        processCoverAndFiles(book);
        return bookDAO.insert(book);
    }

    @PUT
    @Consumes(APPLICATION_JSON)
    public Book update(Book book) {
        processCoverAndFiles(book);
        return bookDAO.update(book);
    }

    private void processCoverAndFiles(Book book) {
        DigitalFile cover = book.getCover();
        if (cover != null && isNullOrEmpty(cover.getId())) {
            book.setCover(filesTemp.remove(cover.getHash()));
        }

        Set<DigitalFile> files = book.getFiles().stream()
                .filter(Objects::nonNull)
                .map(file -> file.getId() == null ? filesTemp.remove(file.getHash()) : file)
                .collect(toSet());
        book.setFiles(files);

        // Limpamos arquivos que foram enviados ao servidor, mas que o usuário desistiu de salvar
        filesTemp.clear();
    }

    @GET
    @Path("{id}")
    public Book get(@PathParam("id") String id) {
        return bookDAO.find(id);
    }

    @GET
    public List<Book> list() {
        return bookDAO.list();
    }


    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") String bookId) {
        bookDAO.remove(bookId);
    }
}
