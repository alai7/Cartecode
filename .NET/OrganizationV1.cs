using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models
{
    public class OrganizationV1
    {
        public int Id { get; set; }
        public int OrganizationTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
        public string BusinessPhone { get; set; }
        public int PrimaryLocationId { get; set; }
        public string SiteUrl { get; set; }
        public int EmployeesNumber { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
    }
}
