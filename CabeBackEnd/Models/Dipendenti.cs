using System;
using System.Collections.Generic;

namespace CabeBackEnd.Models;

public partial class Dipendenti
{
    public int IdDipendente { get; set; }

    public string? Nome { get; set; }

    public string? Ruolo { get; set; }

    public string? PathFoto { get; set; }
}
