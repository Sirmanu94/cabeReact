using System.ComponentModel.DataAnnotations;

namespace CabeBackEnd.DTOs
{
    public class ContattoDto
    {
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Cognome { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string? Telefono { get; set; }
        [Required]
        public string Messaggio { get; set; }
    }
}