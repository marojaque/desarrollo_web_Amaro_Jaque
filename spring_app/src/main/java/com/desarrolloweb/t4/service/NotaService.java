package com.desarrolloweb.t4.service;
import com.desarrolloweb.t4.dto.NotaResultDto;
import com.desarrolloweb.t4.model.AvisoAdopcion;
import com.desarrolloweb.t4.model.Nota;
import com.desarrolloweb.t4.repository.AvisoRepository;
import com.desarrolloweb.t4.repository.NotaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotaService {
    private final NotaRepository notaRepo;
    private final AvisoRepository avisoRepo;

    public NotaService(NotaRepository notaRepo, AvisoRepository avisoRepo){
        this.notaRepo = notaRepo;
        this.avisoRepo = avisoRepo;
    }

    @Transactional
    public NotaResultDto addNota(Integer avisoId, Integer notaValue) {
        if (notaValue == null || notaValue < 1 || notaValue > 7){
            throw new IllegalArgumentException("Nota inválida");
        }
        AvisoAdopcion aviso = avisoRepo.findById(avisoId).orElseThrow(() -> new EntityNotFoundException("Aviso no encontrado"));
        Nota nota = new Nota();
        nota.setAviso(aviso);
        nota.setNota(notaValue);
        notaRepo.save(nota);
        Double avg = notaRepo.findAvgByAvisoId(avisoId);
        Long cnt = notaRepo.countByAvisoId(avisoId);
        Double prom = avg == null ? null : Math.round(avg * 100.0) / 100.0;

        return new NotaResultDto(avisoId, prom, cnt); 
    }
}