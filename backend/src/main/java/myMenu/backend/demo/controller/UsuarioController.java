package myMenu.backend.demo.controller;

import lombok.RequiredArgsConstructor;
import myMenu.backend.demo.dto.LoginDTO;
import myMenu.backend.demo.dto.PreferenciasDTO;
import myMenu.backend.demo.dto.UsuarioCadastroDTO;
import myMenu.backend.demo.model.Usuario;
import myMenu.backend.demo.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") 
public class UsuarioController 
{

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> cadastrarUsuario(@RequestBody UsuarioCadastroDTO dto) 
    {
        try 
        {
            Usuario novoUsuario = usuarioService.criarNovoUsuario(
                dto.nome(), 
                dto.email(), 
                dto.senha(), 
                dto.objetivo()
            );
            
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        } 
        catch (IllegalArgumentException e) 
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) 
    {
        try 
        {
            Usuario usuarioAutenticado = usuarioService.autenticarUsuario(
                dto.email(), 
                dto.senha()
            );
            
            return ResponseEntity.ok(usuarioAutenticado);
        } 
        catch (IllegalArgumentException e) 
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) 
    {
        try 
        {
            Usuario usuario = usuarioService.buscarPorId(id);
            
            return ResponseEntity.ok(usuario);
        } 
        catch (IllegalArgumentException e) 
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}/preferencias")
    public ResponseEntity<?> atualizarPreferencias(
        @PathVariable Long id, 
        @RequestBody PreferenciasDTO dto
    ) {
        try 
        {
            Usuario usuarioAtualizado = usuarioService.atualizarPreferencias(
                id, 
                dto.dietaEspecifica(), 
                dto.restricoes(), 
                dto.ingredientesEvitados()
            );
            
            return ResponseEntity.ok(usuarioAtualizado);
        } 
        catch (IllegalArgumentException e) 
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}