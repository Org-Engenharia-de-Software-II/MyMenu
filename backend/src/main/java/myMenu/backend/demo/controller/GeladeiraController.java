package myMenu.backend.demo.controller;

import lombok.RequiredArgsConstructor;
import myMenu.backend.demo.dto.AdicionarItemGeladeiraDTO;
import myMenu.backend.demo.model.Geladeira;
import myMenu.backend.demo.service.GeladeiraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios/{usuarioId}/geladeira")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GeladeiraController
{

    private final GeladeiraService geladeiraService;

    @PostMapping("/itens")
    public ResponseEntity<?> adicionarItem(
        @PathVariable Long usuarioId,
        @RequestBody AdicionarItemGeladeiraDTO dto
    ){
        try
        {
            Geladeira geladeira = geladeiraService.adicionarItem(
                usuarioId,
                dto.nomeIngrediente(),
                dto.quantidade(),
                dto.unidade(),
                dto.categoria(),
                dto.dataValidade()
            );

            return ResponseEntity.ok(geladeira);
        }
        catch (IllegalArgumentException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/itens/{nomeIngrediente}")
    public ResponseEntity<?> removerItem(
        @PathVariable Long usuarioId,
        @PathVariable String nomeIngrediente
    ){
        try
        {
            Geladeira geladeira = geladeiraService.removerItem(usuarioId, nomeIngrediente);
            return ResponseEntity.ok(geladeira);
        }
        catch (IllegalArgumentException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}