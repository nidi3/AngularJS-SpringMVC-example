package example.angularspring.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

/**
 * Created by IntelliJ IDEA.
 * User: nidi
 * Date: 13.03.12
 * Time: 22:59
 * To change this template use File | Settings | File Templates.
 */
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    public final void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}
