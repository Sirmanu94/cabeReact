namespace CabeBackEnd.DTOs
{
    public class DipendenteDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public string Ruolo { get; set; }

        public IFormFile? pathFoto { get; set; }
    }
}
