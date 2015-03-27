package br.com.bbviana.laylamarques.interceptor;

import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import java.lang.reflect.Method;
import java.util.Arrays;

import static java.lang.System.out;

/**
 * @author bbviana
 */
@Log
@Interceptor
public class LoggerInterceptor {

    @AroundInvoke
    public Object logTime(InvocationContext ctx) throws Exception {
        Class<?> targetClass = ctx.getTarget().getClass();
        String targetName = targetName(targetClass);

        Method method = ctx.getMethod();

        out.printf("%s.%s(): %s\n", targetName, method.getName(), Arrays.toString(ctx.getParameters()));
        Object proceed = ctx.proceed();
        out.printf("%s.%s(): finalizado\n", targetName, method.getName());

        return proceed;
    }

    private static String targetName(Class<?> targetClass) {
        String targetName = targetClass.getName();
        targetName = targetName.substring(0, targetName.indexOf("$Proxy$"));
        return targetName;
    }

}
