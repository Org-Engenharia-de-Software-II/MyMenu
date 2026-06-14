package myMenu.backend.demo.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import lombok.*;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

@Entity
@Table(name = "geladeira")
@Getter
@Setter
@NoArgsConstructor
public class Geladeira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "geladeira", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemGeladeira> itens = new ArrayList<>();

    public void adicionarIngrediente(Ingrediente ingrediente, double quantidade, String unidade, String categoria, LocalDate dataValidade) {
        Optional<ItemGeladeira> itemExistente = this.itens.stream()
            .filter(i -> i.getIngrediente().getNome().equalsIgnoreCase(ingrediente.getNome()))
            .findFirst();

        if(itemExistente.isPresent()){
            ItemGeladeira item = itemExistente.get();
            if(item.getUnidadeMedida().equalsIgnoreCase(unidade)){
                item.setQuantidade(item.getQuantidade() + quantidade);
                item.setCategoria(categoria);
                item.setDataValidade(dataValidade);
            } else {
                throw new IllegalArgumentException("Unidade de medida incompatível. Unidade certa: " + item.getUnidadeMedida());
            }
        } else {
            ItemGeladeira novoItem = new ItemGeladeira(quantidade, unidade, this, ingrediente, categoria, dataValidade);
            this.itens.add(novoItem);
        }
    }

    public void removerIngrediente(Ingrediente ingrediente) {
        this.itens.removeIf(i -> i.getIngrediente().getNome().equalsIgnoreCase(ingrediente.getNome()));
    }

}