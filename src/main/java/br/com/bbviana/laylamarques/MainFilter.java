package br.com.bbviana.laylamarques;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Direciona qualquer request sem extensão para index.html.
 * Por simplicidade, assume-se que a request possui extensao se tiver "."
 * A ideia desse filtro é direcionar requests de negocio para index.html
 * e ignorar requests de resources (gif, png, css, js etc).
 *
 * Também ignora requests do tipo /ws/*, que representam web services JAX-RS
 */
@WebFilter(urlPatterns = "/*")
public class MainFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String uri = ((HttpServletRequest) request).getRequestURI();

        if (uri.contains(".") || uri.contains("/ws/")) {
            chain.doFilter(request, response);
        } else {
            request.getRequestDispatcher("/index.html").forward(request, response);
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // vazio
    }


    @Override
    public void destroy() {
        // vazio
    }
}
