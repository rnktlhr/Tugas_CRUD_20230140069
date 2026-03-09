package com.example.demo.mapper;

import com.example.demo.dto.KtpRequestDto;
import com.example.demo.dto.KtpResponseDto;
import com.example.demo.entity.Ktp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface KtpMapper {

    Ktp toEntity(KtpRequestDto requestDto);

    KtpResponseDto toResponseDto(Ktp entity);

    List<KtpResponseDto> toResponseDtoList(List<Ktp> entities);

    void updateEntityFromDto(KtpRequestDto requestDto, @MappingTarget Ktp entity);
}
