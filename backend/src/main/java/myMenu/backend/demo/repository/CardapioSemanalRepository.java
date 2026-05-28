package myMenu.backend.demo.repository;

import myMenu.backend.demo.model.CardapioSemanal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CardapioSemanalRepository extends JpaRepository<CardapioSemanal, Long> {
    List<CardapioSemanal> findByUsuarioId(Long usuarioId);
}