using CabeBackEnd.DTOs;
using CabeBackEnd.Services;
using Microsoft.AspNetCore.Mvc;

namespace CabeBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IEmailService _emailService;

        // Iniezione del servizio
        public ContactController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("invia")]
        public async Task<IActionResult> InviaRichiesta([FromBody] ContattoDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Dati non validi.");
            }

            try
            {
                await _emailService.InviaEmailRichiestaAsync(dto);
                return Ok(new { message = "Email inviata con successo!" });
            }
            catch (Exception ex)
            {
                // In produzione potresti voler loggare l'errore interno
                return StatusCode(500, new { message = "Errore durante l'invio della mail.", error = ex.Message });
            }
        }
    }
}