package com.shutterfly.sbs.eni.reports.security.utils;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkException;
import com.auth0.jwk.UrlJwkProvider;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shutterfly.sbs.eni.reports.configuration.AuthConfiguration;
import com.shutterfly.sbs.eni.reports.repositories.model.User;
import java.security.interfaces.RSAPublicKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
@Slf4j
public class JWTUtils {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final AuthConfiguration authConfiguration;


    @Bean
    public JWTVerifier create() throws JsonProcessingException, JwkException {
        UrlJwkProvider urlJwkProvider = new UrlJwkProvider(authConfiguration.getIssuer());
        final String issuerKeys = restTemplate.getForObject(authConfiguration.getIssuer() + "/.well-known/jwks.json", String.class);
        JsonNode jsonNode = objectMapper.readTree(issuerKeys);
        String kid = jsonNode.get("keys").get(0).get("kid").asText();
        Jwk jwk = urlJwkProvider.get(kid);
        return JWT.require(Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(), null))
                .withIssuer(authConfiguration.getIssuer())
                .build();
    }

    public User parseJWT(DecodedJWT token) {
        return User.from(token.getClaims());
    }

}
