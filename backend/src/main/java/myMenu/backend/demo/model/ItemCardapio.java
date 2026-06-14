package myMenu.backend.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "item_cardapio")
@Getter
@Setter
@NoArgsConstructor
public class ItemCardapio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cardapio_id", nullable = false)
    private CardapioSemanal cardapio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receita_id", nullable = false)
    private Receita receita;

    @Column(nullable = false)
    private String diaDaSemana;

    @Column(nullable = false)
    private String tipoRefeicao;

    public ItemCardapio(CardapioSemanal cardapio, Receita receita, String diaDaSemana, String tipoRefeicao) {
        this.cardapio = cardapio;
        this.receita = receita;
        this.diaDaSemana = diaDaSemana;
        this.tipoRefeicao = tipoRefeicao;
    }
}