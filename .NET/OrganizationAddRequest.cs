using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Organizations
{
    public class OrganizationAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int CuisineId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int OrganizationTypeId { get; set; }
        [Required]
        [MinLength(2)]
        public string Name { get; set; }

        public string Description { get; set; }

        public string Logo { get; set; }

        public string BusinessPhone { get; set; }

        public int PrimaryLocationId { get; set; }

        public string SiteUrl { get; set; }

        public int EmployeesNumber { get; set; }


    }
}
