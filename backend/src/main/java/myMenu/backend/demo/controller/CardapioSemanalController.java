package myMenu.backend.demo.controller;

import lombok.RequiredArgsConstructor;
import myMenu.backend.demo.model.CardapioSemanal;
import myMenu.backend.demo.service.CardapioSemanalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios/{usuarioId}/cardapio")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CardapioSemanalController {

    private final CardapioSemanalService cardapioSemanalService;

    @PostMapping("/gerar")
    public ResponseEntity<?> gerarCardapio(@PathVariable Long usuarioId) {
        try {
            CardapioSemanal cardapio = cardapioSemanalService.gerarCardapio(usuarioId);
            return ResponseEntity.ok(cardapio);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}