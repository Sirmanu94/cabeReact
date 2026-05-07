using System;
using System.Collections.Generic;

namespace CabeBackEnd.Models;

public partial class Progetti
{
    public int IdProgetto { get; set; }

    public string? DescrizioneBreve { get; set; }

    public string? Descrizione { get; set; }

    public string? PathFotoCopertina { get; set; }

    public DateTime? DataInserimento { get; set; }

    public bool? Eliminato { get; set; }
}
