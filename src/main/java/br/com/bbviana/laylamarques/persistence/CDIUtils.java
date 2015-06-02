package br.com.bbviana.laylamarques.persistence;

/**
 * @author bbviana
 */
public class CDIUtils {

    public static boolean isProxy(Class<?> clazz) {
        return clazz.getName().contains("$Proxy$");
    }

    public static Class<?> removeProxy(Class<?> clazz) {
        Class<?> pureClass = clazz;
        while (isProxy(pureClass)) pureClass = pureClass.getSuperclass();
        return pureClass;
    }
}
