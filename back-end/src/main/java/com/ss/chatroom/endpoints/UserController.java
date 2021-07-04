package com.ss.chatroom.endpoints;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss.chatroom.entities.UserEntity;
import com.ss.chatroom.exception.DataNotFoundException;
import com.ss.chatroom.exception.DuplicateRecordFoundException;
import com.ss.chatroom.model.ResponseModel;
import com.ss.chatroom.model.UserSignInModel;
import com.ss.chatroom.services.UserService;
import com.ss.chatroom.utils.ChatRoomConstants;
import com.ss.chatroom.utils.ResponseBuilderUtility;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
	
	private final UserService userService;
	
	@GetMapping(value = { "/", "/{userId}" })
	private ResponseEntity<ResponseModel> getUsers(@RequestParam(required = false) String userId){
		List<UserEntity> userEntities = userService.getUsers(userId);
		return ResponseBuilderUtility.buildEntityResponse(ChatRoomConstants.SUCCESS, userEntities, "Successfully retrived user's");
	}
	
	@PostMapping("/signUp")
	private ResponseEntity<ResponseModel> createUser(@RequestBody UserEntity userEntity) throws DuplicateRecordFoundException{
		List<UserEntity> userResponse = userService.createUser(userEntity);
		return ResponseBuilderUtility.buildEntityResponse(ChatRoomConstants.SUCCESS, userResponse, "Successfully user created");
	}

	@PostMapping("/signIn")
	private ResponseEntity<ResponseModel> signIn(@RequestBody UserSignInModel userSignInModel) throws DataNotFoundException{
		List<UserEntity> userResponse = userService.signIn(userSignInModel);
		return ResponseBuilderUtility.buildEntityResponse(ChatRoomConstants.SUCCESS, userResponse, "Successfully signIn");
	}
	
}
