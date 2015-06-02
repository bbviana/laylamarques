package br.com.bbviana.laylamarques.imagens;

import br.com.bbviana.laylamarques.files.DigitalFile;
import br.com.bbviana.laylamarques.files.UploadedFilesTemp;
import br.com.bbviana.laylamarques.interceptor.Log;
import org.bson.types.ObjectId;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.InputStream;
import java.util.Calendar;
import java.util.List;

import static br.com.bbviana.laylamarques.imagens.Tipo.FUNDO;
import static com.google.common.io.ByteStreams.toByteArray;
import static java.util.stream.Collectors.toList;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.MediaType.MULTIPART_FORM_DATA;

/**
 * @author bbviana
 */
@Log
@Path("imagens")
@RequestScoped
public class ImagensController {

    private static final int ONE_MONTH_IN_SEC = 60 * 60 * 24 * 30;

    @Inject
    private Datastore ds;

    @Inject
    private UploadedFilesTemp filesTemp;

    @POST
    @Path("/upload")
    @Consumes(MULTIPART_FORM_DATA)
    public Response uploadFile(
            @FormDataParam("file") FormDataBodyPart body,
            @FormDataParam("file") InputStream uploadedInputStream) {

        byte[] bytes;
        try {
            bytes = toByteArray(uploadedInputStream);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        DigitalFile digital = new DigitalFile();
        digital.setBytes(bytes);
        digital.setName(body.getContentDisposition().getFileName());
        digital.setMimeType(body.getMediaType().toString());

        String hash = filesTemp.put(digital);

        return Response.ok().entity(hash).build();
    }

    @GET
    @Path("{id}")
    @Produces("image/jpeg")
    public Response image(@PathParam("id") ObjectId id) throws Exception {
        CacheControl cache = new CacheControl();
        cache.setMaxAge(ONE_MONTH_IN_SEC);

        Imagem imagem = ds.get(Imagem.class, id);

        return Response
                .ok(imagem.getBytes())
                .cacheControl(cache)
                .build();
    }

    @GET
    @Path("backgrounds")
    @Produces(APPLICATION_JSON)
    public List<String> backgrounds() {
        Query<Imagem> query = ds.createQuery(Imagem.class).filter("tipo", FUNDO);
        List<Imagem> backgrounds = query.asList();
        return backgrounds.stream().map(img -> img.getId().toString()).collect(toList());
    }

}
