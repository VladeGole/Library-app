package com.example.library_app.mapper;

import com.example.library_app.dto.CheckoutRequestDto;
import com.example.library_app.model.Checkout;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CheckoutMapper {

   // Checkout toEntity(CheckoutRequestDto checkoutRequestDto);
}
