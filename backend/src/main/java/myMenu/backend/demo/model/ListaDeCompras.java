package myMenu.backend.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "lista_de_compras")
@Getter
@Setter
@NoArgsConstructor
public class ListaDeCompras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate dataCriacao = LocalDate.now();

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "listaDeCompras", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemListaCompras> itens = new ArrayList<>();

    public void adicionarItem(Ingrediente ingrediente, double quantidade, String unidade, String categoria) {
        Optional<ItemListaCompras> itemExistente = this.itens.stream().filter(i -> i.getIngrediente().getNome().equalsIgnoreCase(ingrediente.getNome())).findFirst();

        if(itemExistente.isPresent()){
            ItemListaCompras item = itemExistente.get();
            if(item.getUnidadeMedida().equalsIgnoreCase(unidade)){
                item.setQuantidade(item.getQuantidade() + quantidade);
                item.setCategoria(categoria);
            }else{
                throw new IllegalArgumentException("Unidade de medida incompatível. Unidade certa: " + item.getUnidadeMedida());
            }
        }else{
            ItemListaCompras novoItem = new ItemListaCompras(ingrediente, quantidade, unidade, this, categoria);
            this.itens.add(novoItem);
        }
    }

    public void marcarComoComprado(ItemListaCompras item) {
        item.setComprado(!item.isComprado());
    }

}