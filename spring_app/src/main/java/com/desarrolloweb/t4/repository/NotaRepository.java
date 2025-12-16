package com.desarrolloweb.t4.repository;
import com.desarrolloweb.t4.model.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotaRepository extends JpaRepository<Nota, Integer> {
    @Query ("SELECT AVG(n.nota) FROM Nota n WHERE n.aviso.id = :avisoId")
    Double findAvgByAvisoId(@Param("avisoId") Integer avisoId);

    @Query("SELECT COUNT(n) FROM Nota n WHERE n.aviso.id = :avisoId")
    Long countByAvisoId(@Param("avisoId") Integer avisoId);
}
