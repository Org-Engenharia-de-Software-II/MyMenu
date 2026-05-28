package myMenu.backend.demo.repository;

import myMenu.backend.demo.model.CardapioSemanal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeladeiraRepository extends JpaRepository<CardapioSemanal, Long> {}