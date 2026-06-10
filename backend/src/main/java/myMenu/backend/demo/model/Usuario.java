package myMenu.backend.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    private String objetivo;

    private String dietaEspecifica;

    @ElementCollection
    @CollectionTable(
        name = "preferencia_alimentar", 
        joinColumns = @JoinColumn(name = "usuario_id")
    )
    @Column(name = "preferencia")
    private List<String> preferenciasAlimentares = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
        name = "restricao_alimentar", 
        joinColumns = @JoinColumn(name = "usuario_id")
    )
    @Column(name = "restricao")
    private List<String> restricoes = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
        name = "ingredientes_evitados", 
        joinColumns = @JoinColumn(name = "usuario_id")
    )
    @Column(name = "ingrediente")
    private List<String> ingredientesEvitados = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "usuario_receita_favorita",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "receita_id")
    )
    private List<Receita> favoritas = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "geladeira_id")
    private Geladeira geladeira;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<CardapioSemanal> cardapios = new ArrayList<>();

    public Usuario(String nome, String email, String senha, String objetivo, String dietaEspecifica) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.objetivo = objetivo;
        this.dietaEspecifica = dietaEspecifica;
        this.geladeira = new Geladeira();
    }

    public void editarPerfil(String novoNome, String novoEmail) {
        if (novoNome != null && !novoNome.isBlank()) {
            this.nome = novoNome;
        }
        
        if (novoEmail != null && !novoEmail.isBlank()) {
            this.email = novoEmail;
        }
    }
    
}