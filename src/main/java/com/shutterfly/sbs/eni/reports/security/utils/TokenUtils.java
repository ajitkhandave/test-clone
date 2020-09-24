package com.shutterfly.sbs.eni.reports.security.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import javax.servlet.ServletRequest;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TokenUtils {

    public static HashMap<String, Object> getMapFromResponse(String json) {
        HashMap<String, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = (HashMap<String, Object>) mapper.readValue(json, new TypeReference<Map<String, Object>>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return map;
    }

    public static void setTokenInCookie(
        ServletRequest request, HttpServletResponse httpServletResponse, String key, String value, String domain, int maxAge) {
        Cookie authCookie = new Cookie(key, value);
        authCookie.setHttpOnly(true);
        if (request.isSecure()) {
            authCookie.setSecure(true);
        }

        authCookie.setMaxAge(maxAge);
        authCookie.setPath("/");
        authCookie.setDomain(domain);
        httpServletResponse.addCookie(authCookie);
    }

    public static void invalidateToken(String key, String domain, HttpServletRequest request, HttpServletResponse response) {
        Optional<Cookie> cookie = extractToken(request, key);
        if (cookie.isPresent()) {
            Cookie token = cookie.get();
            token.setMaxAge(0);
            token.setValue("");
            token.setPath("/");
            token.setDomain(domain);
            token.setHttpOnly(true);
            if (request.isSecure()) {
                token.setSecure(true);
            }
            response.addCookie(token);
        }

    }

    private static Optional<Cookie> extractToken(HttpServletRequest request, String key) {
        Optional<Cookie> cookieAccessToken = readCookie(request, key);
        if (cookieAccessToken.isPresent()) {
            return cookieAccessToken;
        } else {
            return cookieAccessToken;
        }
    }

    private static Optional<Cookie> readCookie(HttpServletRequest request, String key) {
        Cookie[] cookies = request.getCookies();
        return Objects.nonNull(cookies) && cookies.length > 0 ? Arrays.stream(request.getCookies()).filter((c) -> key.equals(c.getName())).findAny() : Optional
            .empty();
    }
}
