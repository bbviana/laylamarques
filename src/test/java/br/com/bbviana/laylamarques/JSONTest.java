package br.com.bbviana.laylamarques;

import br.com.bbviana.laylamarques.delete.Book;
import br.com.bbviana.laylamarques.files.DigitalFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.types.ObjectId;
import org.junit.Test;

/**
 * @author bbviana
 */
public class JSONTest {

    @Test
    public void testObjectToJSON() throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        Book book = new Book();
        book.setId(new ObjectId("012345678901234567890123"));
        book.setTitle("Book 1");

        DigitalFile file = new DigitalFile();
        file.setMimeType("application/pdf");
        file.setHash("123");
        book.setCover(file);
        book.getFiles().add(file);

        String json = mapper.writeValueAsString(book);
        System.out.println(json);
    }

    @Test
    public void testJSONToObject() throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        String json = "{" +
                "'id':'012345678901234567890123'," +
                "'title':'Book 1', " +
                "'cover':{'hash':'123','type':'JPG'}, " +
                "'files':[{'hash':'444','type':'PDF'}, {'hash':'777','type':'EPUB'}]" +
                "}";
        Book book = mapper.readValue(doubleQuoted(json), Book.class);
        System.out.println(book);
    }

    private static String doubleQuoted(String str) {
        return str.replaceAll("'", "\"");
    }
}
