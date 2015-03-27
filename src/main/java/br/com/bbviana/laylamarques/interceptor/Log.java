package br.com.bbviana.laylamarques.interceptor;

import javax.interceptor.InterceptorBinding;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * @author bbviana
 */
@Inherited // importante devido aos proxies CDI
@InterceptorBinding
@Target({METHOD, TYPE})
@Retention(RUNTIME)
public @interface Log {
}
