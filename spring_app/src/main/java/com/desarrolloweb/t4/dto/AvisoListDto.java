package com.desarrolloweb.t4.dto;
import java.time.LocalDateTime;

public class AvisoListDto {
    private Integer id;
    private LocalDateTime fecha;
    private String sector;
    private String cantidadTipoEdad;
    private String comuna;
    private Double promedio;
    private Long cantidadNotas;

    public AvisoListDto(Integer id, LocalDateTime fecha, String sector, String cantidadTipoEdad, String comuna, Double promedio, Long cantidadNotas) {
        this.id = id;
        this.fecha = fecha;
        this.sector = sector;
        this.cantidadTipoEdad = cantidadTipoEdad;
        this.comuna = comuna;
        this.promedio = promedio;
        this.cantidadNotas = cantidadNotas;
    }

    public Integer getId() { return id; }
    public LocalDateTime getFecha() { return fecha; }
    public String getSector() { return sector; }
    public String getCantidadTipoEdad() { return cantidadTipoEdad; }
    public String getComuna() { return comuna; }
    public Double getPromedio() { return promedio; }
    public Long getCantidadNotas() { return cantidadNotas; }
}