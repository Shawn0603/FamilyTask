package com.familytask.backend.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
protected void doFilterInternal(
        HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

    String path = request.getServletPath();
    System.out.println("🛡️ Filter intercepting path: " + path);  // 添加这一行

    // ✅ 放行无需认证的路径
    if (path.startsWith("/api/auth/")) {
        System.out.println("➡️ 放行路径：" + path);  // 添加日志
        filterChain.doFilter(request, response);
        return;
    }

    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String jwt;
    final String username;

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        System.out.println("❌ 无效 Authorization Header，放行");
        filterChain.doFilter(request, response);
        return;
    }

    jwt = authHeader.substring(7);
    username = jwtService.extractUsername(jwt);
    System.out.println("🔍 解析 JWT username: " + username);

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        var userDetails = userDetailsService.loadUserByUsername(username);
        if (jwtService.isTokenValid(jwt, userDetails)) {
            System.out.println("✅ JWT 验证成功，设置认证上下文");

            var authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        } else {
            System.out.println("❌ JWT 无效");
        }
    }

    filterChain.doFilter(request, response);
}

}
