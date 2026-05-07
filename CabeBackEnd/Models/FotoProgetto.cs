using System;
using System.Collections.Generic;

namespace CabeBackEnd.Models;

public partial class FotoProgetto
{
    public int IdPathFotoProgetto { get; set; }

    public string PathFoto { get; set; } = null!;

    public int IdProgetto { get; set; }

    public bool? Eliminato { get; set; }
}
