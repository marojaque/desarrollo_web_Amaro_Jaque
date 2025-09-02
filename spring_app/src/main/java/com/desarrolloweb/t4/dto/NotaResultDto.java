package com.desarrolloweb.t4.dto;

public class NotaResultDto {
    private Integer avisoId;
    private Double promedio;
    private Long cantidad;
    public NotaResultDto() {}

    public NotaResultDto(Integer avisoId, Double promedio, Long cantidad) {
        this.avisoId = avisoId;
        this.promedio = promedio;
        this.cantidad = cantidad;
    }

    public Integer getAvisoId() { return avisoId; }
    public Double getPromedio() { return promedio; }
    public Long getCantidad() {return cantidad; }

    public void setAvisoId(Integer avisoId) { this.avisoId = avisoId; }
    public void setPromedio(Double promedio) { this.promedio = promedio; }
    public void setCantidad(Long cantidad) { this.cantidad = cantidad; }
}
