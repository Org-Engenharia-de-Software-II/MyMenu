package myMenu.backend.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "receita")
@Getter
@Setter
@NoArgsConstructor
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private int tempoPreparo;
    private String nivelDificuldade;
    private double custoEstimado;

    @Column(columnDefinition = "TEXT")
    private String instrucoes;

    @OneToMany(mappedBy = "receita", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemReceita> itens = new ArrayList<>();

    public boolean verificarCompatibilidade(Geladeira geladeira, List<String> restricoes) {
        if (geladeira == null || geladeira.getItens() == null) return false;

        for (ItemReceita item : this.itens) {
            boolean encontrado = geladeira.getItens().stream()
                .anyMatch(ig -> ig.getIngrediente().getNome()
                    .equalsIgnoreCase(item.getIngrediente().getNome()));
            if (!encontrado) return false;
        }
        return true;
    }

}