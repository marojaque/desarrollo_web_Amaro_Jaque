package com.desarrolloweb.t4.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "nota")
public class Nota{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aviso_id", nullable = false)
    private AvisoAdopcion aviso;

    @Column(nullable = false)
    private Integer nota;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public AvisoAdopcion getAviso() { return aviso; }
    public void setAviso(AvisoAdopcion aviso) { this.aviso = aviso; }

    public Integer getNota() { return nota; }
    public void setNota(Integer nota) { this.nota = nota; }
    public LocalDateTime getCreatedAt() {return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}