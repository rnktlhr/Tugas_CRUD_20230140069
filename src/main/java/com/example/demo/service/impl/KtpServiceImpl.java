package com.example.demo.service.impl;

import com.example.demo.dto.KtpRequestDto;
import com.example.demo.dto.KtpResponseDto;
import com.example.demo.entity.Ktp;
import com.example.demo.mapper.KtpMapper;
import com.example.demo.repository.KtpRepository;
import com.example.demo.service.KtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KtpServiceImpl implements KtpService {

    private final KtpRepository ktpRepository;
    private final KtpMapper ktpMapper;

    @Override
    public List<KtpResponseDto> getAllKtp() {
        List<Ktp> ktpList = ktpRepository.findAll();
        return ktpMapper.toResponseDtoList(ktpList);
    }

    @Override
    public KtpResponseDto getKtpById(Integer id) {
        Ktp ktp = ktpRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data KTP tidak ditemukan"));
        return ktpMapper.toResponseDto(ktp);
    }

    @Override
    public KtpResponseDto createKtp(KtpRequestDto requestDto) {
        if (ktpRepository.existsByNomorKtp(requestDto.getNomorKtp())) {
            throw new RuntimeException("Nomor KTP sudah terdaftar");
        }

        Ktp ktp = ktpMapper.toEntity(requestDto);
        ktp = ktpRepository.save(ktp);

        return ktpMapper.toResponseDto(ktp);
    }

    @Override
    public KtpResponseDto updateKtp(Integer id, KtpRequestDto requestDto) {
        Ktp ktp = ktpRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data KTP tidak ditemukan"));

        // Check uniqueness for Nomor KTP if it has changed
        if (!ktp.getNomorKtp().equals(requestDto.getNomorKtp()) &&
                ktpRepository.existsByNomorKtp(requestDto.getNomorKtp())) {
            throw new RuntimeException("Nomor KTP sudah terdaftar pada pengguna lain");
        }

        ktpMapper.updateEntityFromDto(requestDto, ktp);
        ktp = ktpRepository.save(ktp);

        return ktpMapper.toResponseDto(ktp);
    }

    @Override
    public void deleteKtp(Integer id) {
        if (!ktpRepository.existsById(id)) {
            throw new RuntimeException("Data KTP tidak ditemukan");
        }
        ktpRepository.deleteById(id);
    }
}
