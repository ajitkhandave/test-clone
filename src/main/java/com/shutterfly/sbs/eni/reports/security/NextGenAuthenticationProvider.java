package com.shutterfly.sbs.eni.reports.security;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.shutterfly.sbs.eni.reports.security.utils.JWTUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class NextGenAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {
    private final JWTVerifier jwtVerifier;
    private final JWTUtils utils;

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException {
    }

    @Override
    protected UserDetails retrieveUser(
        String userName, UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException {
        try {
            final String token = usernamePasswordAuthenticationToken.getCredentials().toString();
            final DecodedJWT decodedJWT = jwtVerifier.verify(token);
            return utils.parseJWT(decodedJWT);
        } catch (Exception e) {
            log.error("Invalid token", e);
            throw new UsernameNotFoundException("Invalid token");
        }
    }
}
