package com.desarrolloweb.t4.model;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comuna")
public class Comuna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nombre;

    @Column(name = "region_id", nullable = false)
    private Integer regionId;

    @OneToMany(mappedBy = "comuna", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AvisoAdopcion> avisos = new ArrayList<>();

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Integer getRegionId() { return regionId; }
    public void setRegionId(Integer regionId) { this.regionId = regionId; }
    public List<AvisoAdopcion> getAvisos() { return avisos; }
    public void setAvisos(List<AvisoAdopcion> avisos) { this.avisos = avisos; }
}

