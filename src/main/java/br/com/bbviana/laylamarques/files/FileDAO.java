package br.com.bbviana.laylamarques.files;

import br.com.bbviana.laylamarques.interceptor.Log;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSInputFile;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Sets.newHashSet;
import static com.mongodb.BasicDBObjectBuilder.start;
import static java.util.stream.Collectors.toList;

/**
 * @author bbviana
 */
@Log
@ApplicationScoped
public class FileDAO {

    @Inject
    private Datastore ds;

    private GridFS gridFS;

    @PostConstruct
    void loadGridFS() {
        gridFS = new GridFS(ds.getDB(), "files");
    }


    public void insert(DigitalFile file) {
        if (file == null || file.getBytes() == null) {
            return;
        }

        GridFSInputFile gfsFile = gridFS.createFile(file.getBytes());
        gfsFile.setFilename(file.getName());

        DBObject metadata = start()
                .append("hash", file.getHash())
                .append("mimeType", file.getMimeType())
                .get();
        gfsFile.setMetaData(metadata);

        gfsFile.save();

        file.setId(gfsFile.getId().toString());
    }

    public void insert(Collection<DigitalFile> files) {
        if (files == null) {
            return;
        }

        files.forEach(this::insert);
    }


    public DigitalFile find(String id) {
        GridFSDBFile gfsFile = gridFS.findOne(new ObjectId(id));

        DigitalFile digital = new DigitalFile();
        digital.setId(gfsFile.getId().toString());
        digital.setName(gfsFile.getFilename());
        digital.setMimeType(metadata(gfsFile, "mimeType"));
        digital.setHash(metadata(gfsFile, "hash"));
        digital.setInputStream(gfsFile.getInputStream());

        return digital;
    }

    public void remove(DigitalFile file) {
        remove(newHashSet(file));
    }

    public void remove(Set<DigitalFile> files) {
        if (files == null || files.isEmpty()) {
            return;
        }

        List<ObjectId> objectIds = files.stream()
                .filter(Objects::nonNull)
                .map(DigitalFile::getId)
                .map(ObjectId::new)
                .collect(toList());

        DBObject query = new BasicDBObject("_id", new BasicDBObject("$in", objectIds));
        gridFS.remove(query);
    }

    private static <T> T metadata(GridFSDBFile gfsFile, String metadata) {
        return (T) gfsFile.getMetaData().get(metadata);
    }

}
