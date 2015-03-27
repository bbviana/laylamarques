package br.com.bbviana.laylamarques;

import com.google.gson.Gson;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

import static javax.servlet.http.HttpServletResponse.SC_OK;

/**
 * @author bbviana
 */
@WebServlet(name = "hello", urlPatterns = "/hello")
public class HelloServlet extends HttpServlet {

    @Inject
    private BookController bookController;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String body = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
        System.out.println(body);

        Gson gson = new Gson();
        Map<String, Object> map = gson.fromJson(body, Map.class);
        Book book = gson.fromJson(gson.toJson(map.get("book")), Book.class);

        response.setStatus(SC_OK);
        response.getWriter().write("{\"name\": \"foo\"}");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/index.html").forward(request, response);
    }


}
