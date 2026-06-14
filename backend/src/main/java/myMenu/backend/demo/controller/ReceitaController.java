package myMenu.backend.demo.controller;

import lombok.RequiredArgsConstructor;
import myMenu.backend.demo.model.Receita;
import myMenu.backend.demo.service.ReceitaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReceitaController
{

    private final ReceitaService receitaService;

    @GetMapping
    public ResponseEntity<?> buscarPorNome(@RequestParam String nome)
    {
        try
        {
            List<Receita> receitas = receitaService.buscarPorNome(nome);
            return ResponseEntity.ok(receitas);
        }
        catch (IllegalArgumentException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/geladeira/{usuarioId}")
    public ResponseEntity<?> buscarComIngredientesDaGeladeira(@PathVariable Long usuarioId)
    {
        try
        {
            List<Receita> receitas = receitaService.buscarReceitasComIngredientesDaGeladeira(usuarioId);
            return ResponseEntity.ok(receitas);
        }
        catch (IllegalArgumentException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/sugestoes/{usuarioId}")
    public ResponseEntity<?> buscarPriorizandoGeladeira(@PathVariable Long usuarioId)
    {
        try
        {
            List<Receita> receitas = receitaService.buscarPriorizandoGeladeira(usuarioId);
            return ResponseEntity.ok(receitas);
        }
        catch (IllegalArgumentException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/filtro/proteina")
    public ResponseEntity<?> buscarRicasEmProteina(@RequestParam double minimo)
    {
        List<Receita> receitas = receitaService.buscarReceitasRicasEmProteina(minimo);
        return ResponseEntity.ok(receitas);
    }

    @GetMapping("/filtro/calorias")
    public ResponseEntity<?> buscarBaixaCaloria(@RequestParam int maximo)
    {
        List<Receita> receitas = receitaService.buscarReceitasBaixaCaloria(maximo);
        return ResponseEntity.ok(receitas);
    }

    @GetMapping("/filtro/carbo")
    public ResponseEntity<?> buscarLowCarb(@RequestParam double maximo)
    {
        List<Receita> receitas = receitaService.buscarReceitasLowCarb(maximo);
        return ResponseEntity.ok(receitas);
    }
}