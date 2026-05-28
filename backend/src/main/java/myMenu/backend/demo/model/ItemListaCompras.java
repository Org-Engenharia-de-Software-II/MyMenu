package myMenu.backend.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "item_lista_compras")
@Getter
@Setter
@NoArgsConstructor
public class ItemListaCompras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double quantidade;

    @Column(nullable = false)
    private String unidadeMedida;

    @Column(nullable = false)
    private boolean comprado = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingrediente_id", nullable = false)
    private Ingrediente ingrediente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lista_id", nullable = false)
    private ListaDeCompras listaDeCompras;

    public ItemListaCompras(Ingrediente ingrediente, double quantidade, String unidadeMedida, ListaDeCompras lista) {
        this.ingrediente = ingrediente;
        this.quantidade = quantidade;
        this.unidadeMedida = unidadeMedida;
        this.listaDeCompras = lista;
    }

}