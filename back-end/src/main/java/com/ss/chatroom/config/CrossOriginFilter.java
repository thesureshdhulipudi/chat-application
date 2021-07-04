//package com.ss.chatroom.config;
//
//import java.io.IOException;
//
//import javax.servlet.Filter;
//import javax.servlet.FilterChain;
//import javax.servlet.FilterConfig;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.stereotype.Component;
//
///**
// * This class is used to filter all the requests and cross origin
// */
//
//@Component
//public class CrossOriginFilter implements Filter {
//
//	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
//			throws IOException, ServletException {
//		HttpServletResponse response = (HttpServletResponse) res;
//		HttpServletRequest request = (HttpServletRequest) req;
//		response.setHeader("Access-Control-Allow-Origin", "*");
//		response.setHeader("Access-Control-Allow-Methods", "POST,PUT,GET,OPTIONS,DELETE");
//		response.setHeader("Access-Control-Allow-Headers", "*");
//		if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
//			response.setStatus(HttpServletResponse.SC_NO_CONTENT);
//		} else {
//			chain.doFilter(req, res);
//		}
//	}
//
//	@Override
//	public void destroy() {
//
//	}
//
//	@Override
//	public void init(FilterConfig arg0) throws ServletException {
//	}
//
//}
