package com.desarrolloweb.t4.repository;
import com.desarrolloweb.t4.model.AvisoAdopcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface AvisoRepository extends JpaRepository<AvisoAdopcion, Integer> {
    @Query("SELECT a FROM AvisoAdopcion a LEFT JOIN FETCH a.comuna ORDER BY a.fechaIngreso DESC")
    List<AvisoAdopcion> findAllOrdered();
}