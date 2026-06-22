package myMenu.backend.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cardapio_semanal")
@Getter
@Setter
@NoArgsConstructor
public class CardapioSemanal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate dataInicio = LocalDate.now();

    @Column(nullable = false)
    private LocalDate dataFim = LocalDate.now().plusDays(7);

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "cardapio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemCardapio> itensCardapio = new ArrayList<>();

    public void adicionarReceita(Receita receita, String dia, String refeicao) {
        ItemCardapio item = new ItemCardapio(this, receita, dia, refeicao);
        this.itensCardapio.add(item);
    }

    public void removerReceitaTotalmente(Receita receita) {
        this.itensCardapio.removeIf(item -> 
            item.getReceita().getId().equals(receita.getId())
        );
    }

    public void removerReceitaEspecifica(Receita receita, String dia, String refeicao) {
        this.itensCardapio.removeIf(item -> 
            item.getReceita().getId().equals(receita.getId()) &&
            item.getDiaDaSemana().equalsIgnoreCase(dia) &&
            item.getTipoRefeicao().equalsIgnoreCase(refeicao)
        );
    }

    public void removerItemPorId(Long itemId) {
        this.itensCardapio.removeIf(item -> item.getId() != null && item.getId().equals(itemId));
    }

}