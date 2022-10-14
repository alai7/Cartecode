using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Organizations;

namespace Sabio.Services.Interfaces
{
    public interface IOrganizationService
    {
        int Add(OrganizationAddRequest model, int userId);
        void Update(OrganizationUpdateRequest model, int userId);

        Paged<Organization> OrgPagination(int pageIndex, int pageSize);

        Organization GetOrgById(int id);

        OrganizationV1 GetOrgByUserId(int userId);

        Paged<Organization> SearchOrgByQuery(int pageIndex, int pageSize, string query);

        void DeleteOrg(int Id);
    }
}