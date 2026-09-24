package com.example.library_app.services;

import com.example.library_app.core.exception.NotFoundException;
import com.example.library_app.core.exception.SaveFailedException;
import com.example.library_app.dto.AdminMessageRequestDto;
import com.example.library_app.dto.MessageRequestDto;
import com.example.library_app.mapper.MessageMapper;
import com.example.library_app.model.Message;
import com.example.library_app.repository.MessageRepository;
import org.apache.poi.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private MessageMapper messageMapper;

    public void createMessage(MessageRequestDto messageRequestDto, String userEmail) throws SaveFailedException {
        Message message = messageMapper.toEntity(messageRequestDto);
        message.setUserEmail(userEmail);
        try {
            messageRepository.saveAndFlush(message);
        } catch(Exception ex) {
            throw new SaveFailedException(ex.getMessage());
        }
    }

    public Page<Message> getAllMessageByUserEmail(String userEmail, Pageable pageable) {
        if (pageable == null) {
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }
        return messageRepository.findByUserEmail(userEmail, pageable);
    }

    public Page<Message> getAllMessageWithClose(String userEmail, Pageable pageable) {
        if (Objects.isNull(pageable)) {
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }
        return messageRepository.findByCloseAndUserEmail(false, userEmail, pageable);
    }

    @Transactional(rollbackFor = {NotFoundException.class, SaveFailedException.class})
    public void createAdminMessage(AdminMessageRequestDto adminMessageRequestDto, String userEmail) throws NotFoundException, SaveFailedException {

        if (Objects.isNull(adminMessageRequestDto)) {
            throw new IllegalArgumentException("AdminRequestDto doesnt must be null");
        }

        if (StringUtil.isBlank(userEmail)) {
            throw new IllegalArgumentException("User email not be must empty ");
        }

        Message message = messageRepository.findById(adminMessageRequestDto.getId()).orElseThrow(() -> new NotFoundException("Message with" + adminMessageRequestDto.getId() + "doesnt exist"));
        message.setAdminEmail(userEmail);
        message.setResponse(adminMessageRequestDto.getResponse());
        message.setClose(true);
        try {
            messageRepository.saveAndFlush(message);
        } catch (Exception e) {
            throw new SaveFailedException(e.getMessage());
        }
    }
}
