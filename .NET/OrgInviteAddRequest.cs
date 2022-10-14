using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.OrgInvites
{
    public class OrgInviteAddRequest
    {

        [Required]
        [MinLength(2), MaxLength(50)]
        public string Firstname { get; set; }

        public string MiddleInitial { get; set; }
        [Required]
        [MinLength(2), MaxLength(50)]
        public string Lastname { get; set; }

        public string Email { get; set; }
        [Required]
        public Guid Token { get; set; }
        [Required]
        public int ExpirationSeconds { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int InviteTypeId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int OrgId { get; set; }

    }
}
