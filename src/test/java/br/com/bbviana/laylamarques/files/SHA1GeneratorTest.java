package br.com.bbviana.laylamarques.files;

import org.junit.Test;

import java.io.InputStream;

import static com.google.common.io.ByteStreams.toByteArray;
import static org.junit.Assert.assertEquals;

/**
 * @author bbviana
 */
public class SHA1GeneratorTest {

    @Test
    public void testSha1() throws Exception {
        InputStream is = this.getClass().getClassLoader().getResourceAsStream("book-for-sha-testing.pdf");
        byte[] bytes = toByteArray(is);
        String SHA = SHA1Generator.generate(bytes);

        // código SHA-1 gerado através do comando "sha1sum {fileName}" no Linux
        assertEquals("00816ad3f358247751ae7e18ee546fcea1ae31de", SHA);
    }


}
