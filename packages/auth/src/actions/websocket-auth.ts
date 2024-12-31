import jwksClient from 'jwks-rsa';
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';

export const jwks = jwksClient({
    jwksUri: 'http://localhost:8080/auth/jwt/jwks.json'
});

export function getKey(header: JwtHeader, callback: SigningKeyCallback) {
    jwks.getSigningKey(header.kid, function (err, key) {
        var signingKey = key!.getPublicKey();
        callback(err, signingKey);
    });
}
