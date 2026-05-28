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
    public Usuario criarNovoUsuario(String nome, String email) {
        if (usuarioRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Este e-mail já está em uso.");
        }
        
        Usuario novoUsuario = new Usuario(nome, email);
        
        return usuarioRepository.save(novoUsuario);
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
    }
    
}