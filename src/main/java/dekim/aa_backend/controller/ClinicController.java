package dekim.aa_backend.controller;

import dekim.aa_backend.dto.ClinicRecommendationDTO;
import dekim.aa_backend.dto.ClinicDTO;
import dekim.aa_backend.dto.ClinicSearchResponseDTO;
import dekim.aa_backend.dto.CommentDTO;
import dekim.aa_backend.entity.Clinic;
import dekim.aa_backend.entity.Comment;
import dekim.aa_backend.entity.User;
import dekim.aa_backend.service.ClinicService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/clinics")
public class ClinicController {

  private final ClinicService clinicService;

  /* DB에서 병원 리스트 가져오기 */
  @GetMapping("/list")
  public ResponseEntity<Page<ClinicDTO>> getClinicList(@RequestParam("page") int page,
                                                       @RequestParam("pageSize") int pageSize) {
    // 페이징 된 병원 데이터 가져오기
    Page<ClinicDTO> clinicPage = clinicService.fetchClinicList(page, pageSize);
    return ResponseEntity.ok(clinicPage);
  }


  /* 키워드로 병원 검색 */
  @GetMapping("/search")
  public ResponseEntity<?> searchClinicsByKeyword(
          @RequestParam String keyword,
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int pageSize
  ) {
    try {
      Page<ClinicDTO> clinics = clinicService.searchClinicsByKeyword(keyword, PageRequest.of(page, pageSize));

      ClinicSearchResponseDTO dto = new ClinicSearchResponseDTO();
      dto.setClinics(clinics.getContent());
      dto.setTotalResults(clinics.getTotalElements());
      log.info("👉🏻👉🏻👉🏻", clinics.getContent());
      log.info("👉🏻👉🏻👉🏻", dto);
      log.info("👉🏻👉🏻👉🏻", dto.getClinics());



      return ResponseEntity.ok(dto);
    } catch (Exception e) {
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }


/* 병원 디테일 정보 */
  @GetMapping("/{id}")
  public ResponseEntity<?> getClinicInfoById(@PathVariable Long id) {
    ClinicDTO clinicDTO = clinicService.getClinicInfoById(id);
    return ResponseEntity.ok(clinicDTO);
  }


  /* 주소로 병원 검색 */
  @GetMapping("/searchAddress")
  public ResponseEntity<?> searchClinicsByAddress(
          @RequestParam String address,
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int pageSize
  ) {
    Page<ClinicDTO> clinics = clinicService.searchClinicsByAddress(address, PageRequest.of(page, pageSize));
    ClinicSearchResponseDTO dto = new ClinicSearchResponseDTO();
    dto.setClinics(clinics.getContent());
    dto.setTotalResults(clinics.getTotalElements());

    return ResponseEntity.ok(dto);
  }

  /* 병원 추천 */
  @PostMapping("/recommendation/{clinicId}")
  public ResponseEntity<?> createDeleteARecommendation(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long clinicId) {
    try {
      if (userDetails == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
      }
      ClinicRecommendationDTO recommendation = clinicService.createDeleteRecommendation(Long.valueOf(userDetails.getUsername()), clinicId);
      if(recommendation.isRecommended()) {
        return new ResponseEntity<>(recommendation, HttpStatus.CREATED); // 추천 추가
      }
      return new ResponseEntity<>(recommendation, HttpStatus.OK); // 이미 추천을 한 경우 삭제
    } catch (Exception e) {
      return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
    }
  }

  /* 댓글 */
  // 댓글 생성
  @PostMapping("/{clinicId}/comment")
  public ResponseEntity<?> createComment(@AuthenticationPrincipal UserDetails userDetails, @RequestBody CommentDTO commentDTO, @PathVariable Long clinicId) throws IllegalAccessException {
    try {
      if (userDetails == null) {// 사용자 정보가 없는 경우 처리
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
      }
      Comment newComment = clinicService.createComment(Long.valueOf(userDetails.getUsername()), clinicId, commentDTO);
      CommentDTO response = CommentDTO.builder()
              .id(newComment.getId())
              .userId(newComment.getUser().getId())
              .content(newComment.getContent())
              .createdAt(newComment.getCreatedAt())
              .nickname(newComment.getUser().getNickname())
              .clinicId(clinicId)
              .build();
      return new ResponseEntity<>(response,HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>("failed to update the comment", HttpStatus.BAD_REQUEST);
    }
  }
  // 댓글 수정
  @PutMapping("/{commentId}/comment")
  public ResponseEntity<?> updateComment(@PathVariable Long commentId, @RequestBody CommentDTO commentDTO,
                                         @AuthenticationPrincipal UserDetails userDetails) {
    try {
      if (userDetails == null) { // 사용자 정보가 없는 경우 처리
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
      }
      CommentDTO updatedComment = clinicService.updateComment(commentId, commentDTO, Long.valueOf(userDetails.getUsername()));
      return new ResponseEntity<>(updatedComment, HttpStatus.OK);
    } catch (IllegalAccessException e) {
      return new ResponseEntity<>("failed to update the comment" + e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  // 댓글 삭제
  @DeleteMapping("/{commentId}/comment")
  public ResponseEntity<?> deleteComment(@PathVariable Long commentId,
                                         @AuthenticationPrincipal UserDetails userDetails) {
    if (userDetails == null) { // 사용자 정보가 없는 경우 처리
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
    }
    clinicService.deleteComment(commentId, Long.valueOf(userDetails.getUsername()));
    return new ResponseEntity<>("댓글 삭제 성공 ", HttpStatus.OK);
  }
}

