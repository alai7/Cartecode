using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models
{
    public class OrgInvite
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string MiddleInitial { get; set; }

        public string Lastname { get; set; }

        public string Email { get; set; }

        public Guid Token { get; set; }

        public int ExpirationSeconds { get; set; }

        public int InviteTypeId { get; set; }

        public int OrgId { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime ModifiedDate { get; set; }

        public string ModifiedBy { get; set; }


    }
}
