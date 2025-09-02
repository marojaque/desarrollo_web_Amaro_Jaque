package com.desarrolloweb.t4.dto;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class NotaCreateDto {
    @NotNull
    @Min(1)
    @Max(7)
    private Integer nota;
    public Integer getNota() {return nota; }
    public void setNota(Integer nota) { this.nota = nota; }
}