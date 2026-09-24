package com.example.library_app.mapper;

import com.example.library_app.dto.MessageRequestDto;
import com.example.library_app.model.Message;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    Message toEntity(MessageRequestDto message);
}
