package br.com.bbviana.laylamarques.files;

import br.com.bbviana.laylamarques.interceptor.Log;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Response;
import java.io.InputStream;

import static com.google.common.io.ByteStreams.toByteArray;
import static javax.ws.rs.core.MediaType.APPLICATION_OCTET_STREAM;
import static javax.ws.rs.core.MediaType.MULTIPART_FORM_DATA;

/**
 * @author bbviana
 */
@Log
@Path("files")
@ApplicationScoped
public class FileController {

    private static final int ONE_MONTH_IN_MS = 30 * 24 * 60 * 60;

    @Inject
    private FileDAO fileDAO;

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
    @Path("/image/{id}")
    @Produces("image/jpg")
    public Response image(@PathParam("id") String id) {
        CacheControl cache = new CacheControl();
        cache.setMaxAge(ONE_MONTH_IN_MS);
        InputStream inputStream = fileDAO.find(id).getInputStream();

        return Response
                .ok(inputStream)
                .cacheControl(cache)
                .build();
    }

    @GET
    @Path("/digital/{id}")
    @Produces(APPLICATION_OCTET_STREAM)
    public Response digital(@PathParam("id") String id) {
        DigitalFile file = fileDAO.find(id);

        return Response
                .ok(file.getInputStream())
                .header("Content-Disposition", "attachment; filename=" + file.getName())
                .build();
    }
}
