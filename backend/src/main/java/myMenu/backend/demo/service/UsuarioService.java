package myMenu.backend.demo.service;

import lombok.RequiredArgsConstructor;
import myMenu.backend.demo.model.Usuario;
import myMenu.backend.demo.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Transactional
    public Usuario criarNovoUsuario(String nome, String email, String senha, String objetivo) {
        if (usuarioRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Este e-mail já está em uso.");
        }
        
        Usuario novoUsuario = new Usuario(nome, email);
        novoUsuario.setSenha(senha); 
        novoUsuario.setObjetivo(objetivo);
        
        return usuarioRepository.save(novoUsuario);
    }

    public Usuario autenticarUsuario(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("E-mail não encontrado."));

        if (!usuario.getSenha().equals(senha)) {
            throw new IllegalArgumentException("Senha incorreta.");
        }

        return usuario;
    }

    @Transactional
    public Usuario atualizarPreferencias(Long id, String dietaEspecifica, List<String> restricoes, List<String> ingredientesEvitados) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        usuario.setDietaEspecifica(dietaEspecifica);
        
        usuario.getRestricoes().clear();
        if (restricoes != null) {
            usuario.getRestricoes().addAll(restricoes);
        }

        usuario.getIngredientesEvitados().clear();
        if (ingredientesEvitados != null) {
            usuario.getIngredientesEvitados().addAll(ingredientesEvitados);
        }

        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
    }
    
}