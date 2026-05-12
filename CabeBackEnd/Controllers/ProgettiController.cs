using CabeBackEnd.DTOs;
using CabeBackEnd.Models;
using CabeBackEnd.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CabeBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgettiController : ControllerBase
    {
        private readonly IProgettiRepository _repo;
        private readonly IWebHostEnvironment _env;

        // Aggiungiamo IWebHostEnvironment per gestire i percorsi fisici dei file
        public ProgettiController(IProgettiRepository repo, IWebHostEnvironment env)
        {
            _repo = repo;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetProgetti()
        {
            var progetti = await _repo.GetListProgettiAttiviAsync();
            return Ok(progetti);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SalvaProgetto([FromForm] ProgettoUploadDto dto)
        {
            try
            {
                // 1. Recupera o Crea il Progetto
                Progetti progetto = dto.id_Progetto == 0 ? new Progetti() : await _repo.GetProgettoByIdAsync(dto.id_Progetto);

                progetto.DescrizioneBreve = dto.descrizione_Breve;
                progetto.Descrizione = dto.descrizione;

                if (dto.id_Progetto == 0)
                {
                    progetto.DataInserimento = DateTime.Now;
                    progetto.Eliminato = false;
                }

                // Definizione della root pubblica (wwwroot)
                string webRootPath = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

                // 2. Gestione Copertina
                if (dto.fileUploadCopertina != null && dto.fileUploadCopertina.Length > 0)
                {
                    string folderPathCopertina = Path.Combine(webRootPath, "Content", "Uploads", "ImgCopertine");
                    if (!Directory.Exists(folderPathCopertina)) Directory.CreateDirectory(folderPathCopertina);

                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.fileUploadCopertina.FileName);
                    string filePath = Path.Combine(folderPathCopertina, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await dto.fileUploadCopertina.CopyToAsync(stream);
                    }

                    progetto.PathFotoCopertina = "/Content/Uploads/ImgCopertine/" + fileName;
                }

                // 3. SALVATAGGIO DEL PROGETTO (Cruciale: ci serve l'IdProgetto per legare le foto!)
                await _repo.AddOrUpdateProgettoAsync(progetto);

                // 4. GESTIONE FOTO GALLERIA MULTIPLE (Quella che mancava)
                if (dto.fotoProgetto != null && dto.fotoProgetto.Count > 0)
                {
                    string folderPathGalleria = Path.Combine(webRootPath, "Content", "Uploads", "FotoProgetto");
                    if (!Directory.Exists(folderPathGalleria)) Directory.CreateDirectory(folderPathGalleria);

                    foreach (var foto in dto.fotoProgetto)
                    {
                        if (foto.Length > 0)
                        {
                            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(foto.FileName);
                            string filePath = Path.Combine(folderPathGalleria, fileName);

                            // Salvataggio fisico del file
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await foto.CopyToAsync(stream);
                            }

                            // Creazione del record nel database tramite il Repository
                            var nuovaFoto = new FotoProgetto
                            {
                                IdProgetto = progetto.IdProgetto, // ID del progetto appena salvato
                                PathFoto = "/Content/Uploads/FotoProgetto/" + fileName,
                                Eliminato = false
                            };

                            await _repo.AddFotoProgettoAsync(nuovaFoto);
                        }
                    }
                }

                return Ok(progetto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDettaglio(int id)
        {
            var progetto = await _repo.GetProgettoByIdAsync(id);
            if (progetto == null) return NotFound();

            var foto = await _repo.GetListaFotoProgettoAsync(id);

            return Ok(new { progetto, listaFoto = foto });
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> EliminaProgetto(int id)
        {
            await _repo.EliminaProgettoAsync(id);
            return Ok(new { message = "Eliminato con successo" });
        }
    }
}