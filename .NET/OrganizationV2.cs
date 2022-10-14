using Sabio.Models.Domain.MenuItemSpecials;
using Sabio.Models.Menus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class OrganizationV2 : OrganizationV1
    {
        public LookUp OrganizationType { get; set; }
        public LookUp CuisineType { get; set; }
        public MenuItemSpecial MenuItemSpecials { get; set; }
        public MenuItem MenuItem { get; set; }
        public LookUp StatusTypes { get; set; }
        public Location Location { get; set; }
    }
}
