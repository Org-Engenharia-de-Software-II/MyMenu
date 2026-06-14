package myMenu.backend.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "item_receita")
@Getter
@Setter
@NoArgsConstructor
public class ItemReceita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double quantidade;

    @Column(nullable = false)
    private String unidadeMedida;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receita_id", nullable = false)
    private Receita receita;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingrediente_id", nullable = false)
    private Ingrediente ingrediente;

    public ItemReceita(double quantidade, String unidadeMedida, Receita receita, Ingrediente ingrediente) {
        this.quantidade = quantidade;
        this.unidadeMedida = unidadeMedida;
        this.receita = receita;
        this.ingrediente = ingrediente;
    }
    
}