using CabeBackEnd.DTOs;
using CabeBackEnd.Models;
using CabeBackEnd.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CabeBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DipendentiController : ControllerBase
    {
        private readonly IDipendentiRepository _repo;
        private readonly IWebHostEnvironment _env;

        // Iniettiamo la repository e l'environment per gestire i file
        public DipendentiController(IDipendentiRepository repo, IWebHostEnvironment env)
        {
            _repo = repo;
            _env = env;
        }

        // GET: api/dipendenti
        [HttpGet]
        public async Task<IActionResult> GetDipendenti()
        {
            var dipendenti = await _repo.GetDipendentiAsync();
            return Ok(dipendenti);
        }

        // GET: api/dipendenti/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDipendenteById(int id)
        {
            var dipendente = await _repo.GetDipendenteByIdAsync(id);
            if (dipendente == null) return NotFound(new { message = "Dipendente non trovato" });

            return Ok(dipendente);
        }

        // POST: api/dipendenti
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SalvaDipendente([FromForm] DipendenteDto dto)
        {
            try
            {
                // 1. RECUPERO O CREAZIONE (Inizio della mappatura)
                // Se l'ID è 0, stiamo creando un nuovo dipendente. 
                // Altrimenti lo cerchiamo nel database per aggiornarlo.
                Dipendenti dipendente = dto.Id == 0
                    ? new Dipendenti()
                    : await _repo.GetDipendenteByIdAsync(dto.Id);

                if (dipendente == null) return NotFound(new { message = "Dipendente da aggiornare non trovato" });

                // 2. MAPPATURA MANUALE DEI CAMPI TESTUALI
                dipendente.Nome = dto.Nome;
                dipendente.Ruolo = dto.Ruolo;

                // Definizione della cartella root pubblica (wwwroot)
                string webRootPath = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

                // 3. GESTIONE UPLOAD FOTO PROFILO
                // Controlliamo se il frontend ci ha inviato un file fisico nel DTO
                if (dto.pathFoto != null && dto.pathFoto.Length > 0)
                {
                    // Creiamo il percorso fisico dove salvare le foto dei dipendenti
                    string folderPathFoto = Path.Combine(webRootPath, "Content", "Uploads", "FotoDipendenti");
                    if (!Directory.Exists(folderPathFoto)) Directory.CreateDirectory(folderPathFoto);

                    // Generiamo un nome univoco per non sovrascrivere file con lo stesso nome
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.pathFoto.FileName);
                    string filePath = Path.Combine(folderPathFoto, fileName);

                    // Salviamo fisicamente il file sul server
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await dto.pathFoto.CopyToAsync(stream);
                    }

                    // MAPPATURA DEL CAMPO FOTO: salviamo nel modello la stringa con il percorso
                    dipendente.PathFoto = "/Content/Uploads/FotoDipendenti/" + fileName;
                }

                // 4. SALVATAGGIO NEL DATABASE
                var risultato = await _repo.AddOrUpdateDipendenteAsync(dipendente);

                return Ok(risultato);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> EliminaDipendente(int id)
        {
            await _repo.EliminaDipendenteAsync(id);
            return Ok(new { message = "Dipendente eliminato con successo" });
        }
    }
}