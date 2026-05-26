package myMenu.backend.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lista_de_compras")
public class ListaDeCompras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate dataCriacao;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "listaDeCompras", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemListaCompras> itens = new ArrayList<>();

    public ListaDeCompras() {
        this.dataCriacao = LocalDate.now();
    }

    public void adicionarItem(Ingrediente ingrediente, String quantidade) {
        ItemListaCompras item = new ItemListaCompras(ingrediente, quantidade, this);
        this.itens.add(item);
    }

    public void marcarComoComprado(ItemListaCompras item) {
        item.setComprado(true);
    }

    public Long getId() { 
        return id; 
    }

    public void setId(Long id) { 
        this.id = id; 
    }
    public LocalDate getDataCriacao() { 
        return dataCriacao; 
    }
    public void setDataCriacao(LocalDate dataCriacao) { 
        this.dataCriacao = dataCriacao; 
    }
    public Usuario getUsuario() { 
        return usuario; 
    }
    public void setUsuario(Usuario usuario) { 
        this.usuario = usuario; 
    }
    public List<ItemListaCompras> getItens() { 
        return itens; 
    }
    public void setItens(List<ItemListaCompras> itens) { 
        this.itens = itens; 
    }
}