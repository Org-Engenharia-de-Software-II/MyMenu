package myMenu.backend.demo.repository;

import myMenu.backend.demo.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    List<Receita> findByNivelDificuldade(String nivelDificuldade);
    List<Receita> findByTempoPreparoLessThanEqual(int tempoMinutos);
}