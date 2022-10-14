using Sabio.Models;
using Sabio.Models.Requests.OrgInvites;

namespace Sabio.Services.Interfaces
{
    public interface IOrgInviteService
    {
        int Add(OrgInviteAddRequest model, int userId, string token);

        void Update(OrgInviteUpdateRequest model, int userId);

        OrgInvite GetInviteByToken(string token);

        void DeleteInvite(string token);
    }
}