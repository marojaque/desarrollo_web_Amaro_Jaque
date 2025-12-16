package com.desarrolloweb.t4.controller;
import com.desarrolloweb.t4.dto.AvisoListDto;
import com.desarrolloweb.t4.dto.NotaCreateDto;
import com.desarrolloweb.t4.dto.NotaResultDto;
import com.desarrolloweb.t4.model.AvisoAdopcion;
import com.desarrolloweb.t4.repository.AvisoRepository;
import com.desarrolloweb.t4.repository.NotaRepository;
import com.desarrolloweb.t4.service.NotaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/avisos")
public class AvisoController{
    private final AvisoRepository avisoRepo;
    private final NotaRepository notaRepo;
    private final NotaService notaService;

    public AvisoController(AvisoRepository avisoRepo, NotaRepository notaRepo, NotaService notaService){
        this.avisoRepo = avisoRepo;
        this.notaRepo = notaRepo;
        this.notaService = notaService;
    }
    
    @GetMapping
    public List<AvisoListDto> list(){
        List<AvisoAdopcion> avisos = avisoRepo.findAllOrdered();
        return avisos.stream().map(a -> {
            Double avg = notaRepo.findAvgByAvisoId(a.getId());
            Long cnt = notaRepo.countByAvisoId(a.getId());
            Double prom = avg == null ? null : Math.round(avg * 100.0)/100.0;
            String unidadMedidaStr = a.getUnidadMedida() != null ? a.getUnidadMedida() : "";
            String cantidadTipoEdad = String.format("%d %s %d%s", 
                a.getCantidad() == null ? 0 : a.getCantidad(), 
                a.getTipo() == null ? "" : a.getTipo(), 
                a.getEdad() == null ? 0 : a.getEdad(),
                unidadMedidaStr);
            String comuna = a.getComuna() != null ? a.getComuna().getNombre() : null;
            return new AvisoListDto(a.getId(), a.getFechaIngreso(), a.getSector(), cantidadTipoEdad, comuna, prom, cnt == null ? 0L : cnt);
        }).collect(Collectors.toList());
    }

    @PostMapping("/{avisoId}/nota")
    public ResponseEntity<NotaResultDto> addNota(@PathVariable Integer avisoId, @Valid @RequestBody NotaCreateDto body){
        NotaResultDto result = notaService.addNota(avisoId, body.getNota());
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}