package com.example.demo.service;

import com.example.demo.dto.KtpRequestDto;
import com.example.demo.dto.KtpResponseDto;

import java.util.List;

public interface KtpService {
    List<KtpResponseDto> getAllKtp();

    KtpResponseDto getKtpById(Integer id);

    KtpResponseDto createKtp(KtpRequestDto requestDto);

    KtpResponseDto updateKtp(Integer id, KtpRequestDto requestDto);

    void deleteKtp(Integer id);
}
