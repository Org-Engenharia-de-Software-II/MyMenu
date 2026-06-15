package myMenu.backend.demo.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.ArrayList;

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
    @JsonIgnore
    private CardapioSemanal cardapio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receita_id", nullable = false)
    @JsonIgnore
    private Receita receita;

    @Column(nullable = false)
    private String diaDaSemana;

    @Column(nullable = false)
    private String tipoRefeicao;

    @ElementCollection
    @CollectionTable(name = "item_cardapio_faltantes", joinColumns = @JoinColumn(name = "item_cardapio_id"))
    @Column(name = "ingrediente_faltante")
    private List<String> ingredientesFaltantes = new ArrayList<>();

    @Transient
    @JsonProperty("receita")
    private ReceitaDTO receitaDTO;

    public ItemCardapio(CardapioSemanal cardapio, Receita receita, String diaDaSemana, String tipoRefeicao) {
        this.cardapio = cardapio;
        this.receita = receita;
        this.diaDaSemana = diaDaSemana;
        this.tipoRefeicao = tipoRefeicao;
    }

    @PostLoad
    private void mapReceitaToDTO() {
        if (receita != null) {
            this.receitaDTO = new ReceitaDTO(receita.getId(), receita.getNome(), receita.getImagemUrl());
        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReceitaDTO {
        private Long id;
        private String nome;
        private String imagemUrl;
    }
}