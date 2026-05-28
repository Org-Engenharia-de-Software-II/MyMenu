package myMenu.backend.demo.repository;

import myMenu.backend.demo.model.ListaDeCompras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListaDeComprasRepository extends JpaRepository<ListaDeCompras, Long> {}