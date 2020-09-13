package com.kozik.MPGK.security;

public class SecurityConstraints {

    public static final String SIGN_UP_URLS = "/api/users/**";
    public static final String SECRET = "MPGKKrosno";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 1800000; // 30 minutes expiration time
}
