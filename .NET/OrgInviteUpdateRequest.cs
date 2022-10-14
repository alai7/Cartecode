using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.OrgInvites
{
    public class OrgInviteUpdateRequest : OrgInviteAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
