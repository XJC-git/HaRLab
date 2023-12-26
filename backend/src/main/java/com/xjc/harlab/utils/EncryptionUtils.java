package com.xjc.harlab.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.xjc.harlab.model.entity.Clinicians;
import lombok.Value;

import java.util.Date;

public class EncryptionUtils {
    public static String SECRET;

    private static final long EXPIRATION = 1000L * 60 * 60 * 24 * 30;
    public static String encryptPassword(String password){
        JWTCreator.Builder builder = JWT.create();
        builder.withClaim("password",password);
        return builder.sign(Algorithm.HMAC256(SECRET));
    }

    public static String generateToken(Clinicians clinician){
        JWTCreator.Builder builder = JWT.create();
        builder.withClaim("id",clinician.getId())
                .withClaim("username",clinician.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION));
        return builder.sign(Algorithm.HMAC256(SECRET));
    }

    public static boolean verifyToken(String token) {
        try {
            if (token != null) {
                JWT.require(Algorithm.HMAC256(SECRET)).build().verify(token);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    public static Integer getId(String token) {
        assert token != null;
        return JWT.decode(token).getClaim("id").asInt();
    }
}
