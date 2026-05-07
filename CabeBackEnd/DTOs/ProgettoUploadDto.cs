using Microsoft.AspNetCore.Http;

namespace CabeBackEnd.DTOs
{
    public class ProgettoUploadDto
    {
        public int id_Progetto { get; set; }
        public string descrizione_Breve { get; set; }
        public string descrizione { get; set; }
        public IFormFile? fileUploadCopertina { get; set; }
        public List<IFormFile>? fotoProgetto { get; set; }
    }
}