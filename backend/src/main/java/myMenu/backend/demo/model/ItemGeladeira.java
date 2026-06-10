package myMenu.backend.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "item_geladeira")
@Getter
@Setter
@NoArgsConstructor
public class ItemGeladeira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double quantidade;

    @Column(nullable = false)
    private String unidadeMedida;

    @Column(nullable = false)
    private String categoria;

    private LocalDate dataValidade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "geladeira_id", nullable = false)
    private Geladeira geladeira;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingrediente_id", nullable = false)
    private Ingrediente ingrediente;

    public ItemGeladeira(double quantidade, String unidadeMedida, Geladeira geladeira, Ingrediente ingrediente, String categoria) {
        this.quantidade = quantidade;
        this.unidadeMedida = unidadeMedida;
        this.geladeira = geladeira;
        this.ingrediente = ingrediente;
        this.categoria = categoria;
    }

}