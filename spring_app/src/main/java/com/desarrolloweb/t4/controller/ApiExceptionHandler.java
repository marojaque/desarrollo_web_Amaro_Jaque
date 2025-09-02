package com.desarrolloweb.t4.controller;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler{
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String,String>> onIllegalArg(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String,String>> onNotFound(EntityNotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<Map<String,String>> onBind(BindException ex) {
        String msg = ex.getAllErrors().stream().map(o -> o.getDefaultMessage()).findFirst().orElse("Validation error");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", msg));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String,String>> onAny(Exception ex){
    ex.printStackTrace();
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error interno"));
    }
}