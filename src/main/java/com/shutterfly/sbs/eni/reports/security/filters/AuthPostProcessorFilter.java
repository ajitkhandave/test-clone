package com.shutterfly.sbs.eni.reports.security.filters;

import com.shutterfly.sbs.eni.reports.configuration.AuthConfiguration;
import com.shutterfly.sbs.eni.reports.security.utils.HttpServletResponseCopier;
import com.shutterfly.sbs.eni.reports.security.utils.TokenUtils;
import java.io.IOException;
import java.util.HashMap;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public class AuthPostProcessorFilter implements Filter {

    private final AuthConfiguration authConfig;
    private final Environment environment;

    @Override
    public void init(FilterConfig config) {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        if (response.getCharacterEncoding() == null) {
            response.setCharacterEncoding("UTF-8");
        }
        HttpServletResponseCopier responseCopier = new HttpServletResponseCopier((HttpServletResponse) response);
        try {
            chain.doFilter(request, responseCopier);
            responseCopier.flushBuffer();
        } finally {
            if (((HttpServletResponse) response).getStatus() == HttpStatus.OK.value() && !((HttpServletRequest) request).getMethod().equals("OPTIONS")) {
                byte[] copy = responseCopier.getCopy();
                String responseBody = new String(copy, response.getCharacterEncoding());
                HashMap<String, Object> responseMap = TokenUtils.getMapFromResponse(responseBody);
                HttpServletResponse httpServletResponse = (HttpServletResponse) response;
                String accessToken = (String) responseMap.get("access_token");
                String refreshToken = (String) responseMap.get("refresh_token");
                String expiresIn = String.valueOf(responseMap.get("expires_in"));
                TokenUtils.setTokenInCookie(request, httpServletResponse, "access_token", accessToken, authConfig.getCookieDomain(), Integer
                    .parseInt(expiresIn));
                TokenUtils.setTokenInCookie(request, httpServletResponse, "refresh_token", refreshToken, authConfig.getCookieDomain(), authConfig.getRefreshTokenCookieMaxAge());
                TokenUtils.setTokenInCookie(request, httpServletResponse, "expires_in", expiresIn, authConfig.getCookieDomain(), Integer
                    .parseInt(expiresIn));
                if (((HttpServletRequest) request).getRequestURL().toString().endsWith("saml/SSO"))
                    request.getRequestDispatcher("/api/auth/sso/success?redirect-url=" + environment.getProperty("app.ui.storefront.base-url")).forward(request, response);
            }
        }
    }

    @Override
    public void destroy() {
    }
}
