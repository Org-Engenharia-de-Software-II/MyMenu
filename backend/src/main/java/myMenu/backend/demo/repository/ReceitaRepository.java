package myMenu.backend.demo.repository;

import myMenu.backend.demo.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    List<Receita> findByNomeContainingIgnoreCase(String nome);
    List<Receita> findByNivelDificuldadeIgnoreCase(String nivelDificuldade);
    List<Receita> findByTempoPreparoLessThanEqual(int tempoMinutos);
    List<Receita> findByCustoEstimadoLessThanEqual(double custoMaximo);
    List<Receita> findByProteinaGreaterThanEqualOrderByProteinaDesc(double minimoProteina);
    List<Receita> findByKcalLessThanEqualOrderByKcalAsc(int maximoCalorias);
    List<Receita> findByCarboidratoLessThanEqualOrderByCarboidratoAsc(double maximoCarboidrato);
}