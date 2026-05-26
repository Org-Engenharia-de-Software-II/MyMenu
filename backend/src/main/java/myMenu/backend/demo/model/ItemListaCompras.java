package myMenu.backend.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "item_lista_compras")
public class ItemListaCompras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String quantidade;

    @Column(nullable = false)
    private boolean comprado = false;

    @ManyToOne
    @JoinColumn(name = "ingrediente_id", nullable = false)
    private Ingrediente ingrediente;

    @ManyToOne
    @JoinColumn(name = "lista_id", nullable = false)
    private ListaDeCompras listaDeCompras;

    public ItemListaCompras() {}

    public ItemListaCompras(Ingrediente ingrediente, String quantidade, ListaDeCompras lista) {
        this.ingrediente = ingrediente;
        this.quantidade = quantidade;
        this.listaDeCompras = lista;
    }

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }
    public String getQuantidade() { 
        return quantidade; 
    }

    public void setQuantidade(String quantidade) { 
        this.quantidade = quantidade; 
    }
    public boolean isComprado() { 
        return comprado; 
    }
    public void setComprado(boolean comprado) { 
        this.comprado = comprado; 
    }
    public Ingrediente getIngrediente() { 
        return ingrediente; 
    }
    public void setIngrediente(Ingrediente ingrediente) { 
        this.ingrediente = ingrediente; 
    }
    public ListaDeCompras getListaDeCompras() { 
        return listaDeCompras; 
    }
    public void setListaDeCompras(ListaDeCompras listaDeCompras) { 
        this.listaDeCompras = listaDeCompras; 
    }
}