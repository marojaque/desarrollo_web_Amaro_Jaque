package com.desarrolloweb.t4.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "aviso_adopcion")
public class AvisoAdopcion{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "fecha_ingreso")
    private LocalDateTime fechaIngreso;
    private String sector;
    private Integer cantidad;
    private String tipo;
    private Integer edad;
    @Column(name = "unidad_medida")
    private String unidadMedida;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comuna_id", nullable = false)
    private Comuna comuna;

    @OneToMany(mappedBy = "aviso", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Nota> notas = new ArrayList<>();

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public LocalDateTime getFechaIngreso() { return fechaIngreso; }
    public void setFechaIngreso(LocalDateTime fechaIngreso) { this.fechaIngreso = fechaIngreso; }

    public String getSector() { return sector; }
    public void setSector(String sector) {this.sector = sector; }
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public String getTipo() { return tipo; }
    public void setTipo (String tipo) { this.tipo = tipo; }
    public Integer getEdad()  { return edad; }
    public void setEdad(Integer edad) {this.edad = edad; }
    public String getUnidadMedida() { return unidadMedida; }
    public void setUnidadMedida(String unidadMedida) { this.unidadMedida = unidadMedida; }
    public Comuna getComuna() { return comuna; }
    public void setComuna(Comuna comuna) { this.comuna = comuna; }

    public List<Nota> getNotas() { return notas; }
    public void setNotas(List<Nota> notas) { this.notas = notas; }
}