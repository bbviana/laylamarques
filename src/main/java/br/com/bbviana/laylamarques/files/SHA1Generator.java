package br.com.bbviana.laylamarques.files;

import java.security.MessageDigest;
import java.util.Formatter;

/**
 * Gerador de checksum usando o algoritmo SHA-1
 *
 * @author bbviana
 */
class SHA1Generator {

    public static String generate(byte[] bytes) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            byte[] sha = digest.digest(bytes);
            return byteArray2Hex(sha);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    private static String byteArray2Hex(byte[] bytes) {
        Formatter formatter = new Formatter();
        for (byte b : bytes) {
            formatter.format("%02x", b);
        }
        return formatter.toString();
    }
}
