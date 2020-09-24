package com.shutterfly.sbs.eni.reports.security.filters;

import com.shutterfly.sbs.eni.reports.configuration.AuthConfiguration;
import com.shutterfly.sbs.eni.reports.security.utils.HttpServletResponseCopier;
import com.shutterfly.sbs.eni.reports.security.utils.TokenUtils;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public class InvalidatePostProcessorFilter implements Filter {

    private final AuthConfiguration authConfig;

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
                TokenUtils.invalidateToken("access_token", authConfig.getCookieDomain(), (HttpServletRequest) request, (HttpServletResponse) response);
                TokenUtils.invalidateToken("refresh_token", authConfig.getCookieDomain(), (HttpServletRequest) request, (HttpServletResponse) response);
                TokenUtils.invalidateToken("expires_in", authConfig.getCookieDomain(), (HttpServletRequest) request, (HttpServletResponse) response);
            }
        }
    }

    @Override
    public void destroy() {
    }
}
