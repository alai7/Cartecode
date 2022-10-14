using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Organization : OrganizationBase
    {
        public LookUp OrganizationType { get; set; }
        public LookUp CuisineType { get; set; }
        public List<Licenses> License { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
        public string BusinessPhone { get; set; }
        public Location PrimaryLocation { get; set; }
        public string SiteUrl { get; set; }
        public int EmployeesNumber { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
    }
}