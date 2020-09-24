package com.shutterfly.sbs.eni.reports.models.dto;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.*;
import java.util.stream.Collectors;

@Getter
@Setter
public class User extends org.springframework.security.core.userdetails.User {

    public static final String APPCODE = "appcode", ISS = "iss", FIRST_NAME = "firstname", LAST_NAME = "lastname", JTI = "jti", IP = "ip", SUB = "sub", ROLES = "authorities", ID = "id";

    private String appcode;
    private String firstname;
    private String lastname;
    private String subject;
    private String issuer;
    private String ip;
    private String id;
    private String jti;
    private List<String> roles;

    public User(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    public static User from(Map<String, Claim> claims) throws JWTVerificationException {
        if (Objects.nonNull(claims) && !claims.isEmpty()) {
            if (verifyClaims(claims)) {
                List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
                if (!Objects.isNull(claims.get(ROLES))) {
                    final List<String> roles = claims.get(ROLES).asList(String.class);
                    grantedAuthorities = roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
                }
                User user = new User(claims.get(SUB).asString(), "*", grantedAuthorities);
                user.setAppcode(claims.get(APPCODE).asString());
                user.setIssuer(claims.get(ISS).asString());
                user.setFirstname(claims.get(FIRST_NAME).asString());
                user.setLastname(claims.get(LAST_NAME).asString());
                user.setId(claims.get(ID).asString());
                user.setJti(claims.get(JTI).asString());
                if (!Objects.isNull(claims.get(IP)))
                    user.setIp(claims.get(IP).asString());
                user.setSubject(claims.get(SUB).asString());

                return user;
            } else {
                throw new JWTVerificationException("One or all of the mandatory claims(iss, sub, id) is missing");
            }

        } else {
            throw new JWTVerificationException("claims is empty");
        }

    }

    private static boolean verifyClaims(Map<String, Claim> claims) {
        return (!Objects.isNull(claims.get(ISS)) && !claims.get(ISS).asString().isEmpty())
                && (!Objects.isNull(claims.get(ID)) && !claims.get(ID).asString().isEmpty());
    }
}
