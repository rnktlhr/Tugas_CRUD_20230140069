package com.example.demo.controller;

import com.example.demo.dto.KtpRequestDto;
import com.example.demo.dto.KtpResponseDto;
import com.example.demo.service.KtpService;
import com.example.demo.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ktp")
@RequiredArgsConstructor
public class KtpController {

    private final KtpService ktpService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<KtpResponseDto>>> getAllKtp() {
        try {
            List<KtpResponseDto> result = ktpService.getAllKtp();
            return ResponseEntity.ok(ApiResponse.success("Berhasil mengambil data KTP", result));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<KtpResponseDto>> getKtpById(@PathVariable Integer id) {
        try {
            KtpResponseDto result = ktpService.getKtpById(id);
            return ResponseEntity.ok(ApiResponse.success("Berhasil mengambil data KTP", result));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<KtpResponseDto>> createKtp(@Valid @RequestBody KtpRequestDto requestDto) {
        try {
            KtpResponseDto result = ktpService.createKtp(requestDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Data KTP berhasil ditambahkan", result));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<KtpResponseDto>> updateKtp(@PathVariable Integer id,
            @Valid @RequestBody KtpRequestDto requestDto) {
        try {
            KtpResponseDto result = ktpService.updateKtp(id, requestDto);
            return ResponseEntity.ok(ApiResponse.success("Data KTP berhasil diperbarui", result));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteKtp(@PathVariable Integer id) {
        try {
            ktpService.deleteKtp(id);
            return ResponseEntity.ok(ApiResponse.success("Data KTP berhasil dihapus", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}
