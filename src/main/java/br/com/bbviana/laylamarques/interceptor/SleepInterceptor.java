package br.com.bbviana.laylamarques.interceptor;

import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import java.lang.reflect.Method;

import static com.google.common.base.Objects.*;

/**
 * @author bbviana
 */
@Sleep
@Interceptor
public class SleepInterceptor {

    @AroundInvoke
    public Object sleep(InvocationContext ctx) throws Exception {

        try {
            int time = readValue(ctx);
            System.out.println("Sleeping..." + time + "ms");
            Thread.sleep(time);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return ctx.proceed();
    }

    private static int readValue(InvocationContext ctx) {
        Method method = ctx.getMethod();
        Class<?> targetClass = ctx.getTarget().getClass();

        Sleep annotation = firstNonNull(method.getAnnotation(Sleep.class), targetClass.getAnnotation(Sleep.class));
        return annotation.value();
    }
}
