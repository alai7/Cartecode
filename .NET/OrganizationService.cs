using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Organizations;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class OrganizationService : IOrganizationService
    {
        IDataProvider _data = null;
        public OrganizationService(IDataProvider data)
        {
            _data = data;
        }

        public int Add(OrganizationAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Organizations_Insert]";
            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {

                    AddCommonParams(model, col, userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);

                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);

                },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;


                int.TryParse(oId.ToString(), out id);

            });
            return id;
        }

        public void Update(OrganizationUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Organizations_Update]";
            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);
                    col.AddWithValue("@Id", model.Id);

                },
            returnParameters: null);

        }

        public Paged<Organization> OrgPagination(int pageIndex, int pageSize)
        {
            Paged<Organization> pagedResult = null;
            List<Organization> result = null;

            int totalCount = 0;

            string procName = "[dbo].[Organizations_SelectAll_Paginated]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Organization countOrgs = MapSingleOrganization(reader, ref startingIndex);


                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (result == null)
                    {
                        result = new List<Organization>();
                    }

                    result.Add(countOrgs);
                }

            );
            if (result != null)
            {
                pagedResult = new Paged<Organization>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Organization GetOrgById(int id)
        {
            string procName = "[dbo].[Organization_Select_ById]";

            Organization searchOrg = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@Id", id);
            }
            , delegate (IDataReader reader, short set)
            {

                int startingIndex = 0;
                searchOrg = MapSingleOrganization(reader, ref startingIndex);
            }
            );
            return searchOrg;

        }

        public OrganizationV1 GetOrgByUserId(int userId)
        {
            string procName = "dbo.UserOrg_SelectOrg_ByUserId";

            OrganizationV1 searchOrg = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@UserId", userId);
            }
            , delegate (IDataReader reader, short set)
            {

                int startingIndex = 0;
                searchOrg = MapSingleOrganizationV1(reader, ref startingIndex);
            }
            );
            return searchOrg;
        }

        public Paged<Organization> SearchOrgByQuery(int pageIndex, int pageSize, string query)
        {
            Paged<Organization> pagedResult = null;

            List<Organization> result = null;

            int totalCount = 0;

            string procName = "[dbo].[Organization_Search]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@Query", query);

                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Organization countOrgs = MapSingleOrganization(reader, ref startingIndex);


                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (result == null)
                    {
                        result = new List<Organization>();
                    }

                    result.Add(countOrgs);
                }

            );
            if (result != null)
            {
                pagedResult = new Paged<Organization>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public void DeleteOrg(int Id)
        {
            string procName = "[dbo].[Organization_Delete_ById]";
            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", Id);
                },

            returnParameters: null);
        }
        private static OrganizationV1 MapSingleOrganizationV1(IDataReader reader, ref int startingIndex)
        {
            OrganizationV1 mapOrg = new OrganizationV1();

            mapOrg.Id = reader.GetSafeInt32(startingIndex++);
            mapOrg.OrganizationTypeId = reader.GetInt32(startingIndex++);
            mapOrg.Name = reader.GetSafeString(startingIndex++);
            mapOrg.Description = reader.GetSafeString(startingIndex++);
            mapOrg.Logo = reader.GetSafeString(startingIndex++);
            mapOrg.BusinessPhone = reader.GetSafeString(startingIndex++);
            mapOrg.PrimaryLocationId = reader.GetSafeInt32(startingIndex++);
            mapOrg.SiteUrl = reader.GetSafeString(startingIndex++);
            mapOrg.EmployeesNumber = reader.GetSafeInt32(startingIndex++);
            mapOrg.DateCreated = reader.GetSafeDateTime(startingIndex++);
            mapOrg.DateModified = reader.GetSafeDateTime(startingIndex++);
            mapOrg.CreatedBy = reader.GetSafeInt32(startingIndex++);
            mapOrg.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            return mapOrg;
        }
        private static Organization MapSingleOrganization(IDataReader reader, ref int startingIndex)
        {
            Organization mapOrg = new Organization();

            mapOrg.OrganizationType = new LookUp();
            mapOrg.CuisineType = new LookUp();
            mapOrg.PrimaryLocation = new Location();
            mapOrg.PrimaryLocation.LocationType = new LookUp();
            mapOrg.PrimaryLocation.State = new State();

            mapOrg.Id = reader.GetSafeInt32(startingIndex++);
            mapOrg.Name = reader.GetSafeString(startingIndex++);
            mapOrg.OrganizationType.Id = reader.GetInt32(startingIndex++);
            mapOrg.OrganizationType.Name = reader.GetSafeString(startingIndex++);
            mapOrg.Description = reader.GetSafeString(startingIndex++);
            mapOrg.CuisineType.Id = reader.GetInt32(startingIndex++);
            mapOrg.CuisineType.Name = reader.GetSafeString(startingIndex++);
            mapOrg.Logo = reader.GetSafeString(startingIndex++);
            mapOrg.BusinessPhone = reader.GetSafeString(startingIndex++);
            mapOrg.SiteUrl = reader.GetSafeString(startingIndex++);
            mapOrg.EmployeesNumber = reader.GetSafeInt32(startingIndex++);

            mapOrg.PrimaryLocation.Id = reader.GetInt32(startingIndex++);
            mapOrg.PrimaryLocation.LineOne = reader.GetSafeString(startingIndex++);
            mapOrg.PrimaryLocation.LineTwo = reader.GetSafeString(startingIndex++);
            mapOrg.PrimaryLocation.City = reader.GetSafeString(startingIndex++);
            mapOrg.PrimaryLocation.Zip = reader.GetSafeString(startingIndex++);
            mapOrg.PrimaryLocation.LocationType.Id = reader.GetInt32(startingIndex++);
            mapOrg.PrimaryLocation.LocationType.Name = reader.GetSafeString(startingIndex++);
            mapOrg.PrimaryLocation.State.Id = reader.GetInt32(startingIndex++);
            mapOrg.PrimaryLocation.State.Code = reader.GetSafeString(startingIndex++);
            mapOrg.PrimaryLocation.State.Name = reader.GetSafeString(startingIndex++);
            mapOrg.PrimaryLocation.Latitude = reader.GetSafeDouble(startingIndex++);
            mapOrg.PrimaryLocation.Longitude = reader.GetSafeDouble(startingIndex++);

            mapOrg.DateCreated = reader.GetSafeDateTime(startingIndex++);
            mapOrg.DateModified = reader.GetSafeDateTime(startingIndex++);
            mapOrg.CreatedBy = reader.GetSafeInt32(startingIndex++);
            mapOrg.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            return mapOrg;
        }

        private static void AddCommonParams(OrganizationAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@CuisineId", model.CuisineId);
            col.AddWithValue("@OrganizationTypeId", model.OrganizationTypeId);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@Logo", model.Logo);
            col.AddWithValue("@BusinessPhone", model.BusinessPhone);
            col.AddWithValue("@PrimaryLocationId", model.PrimaryLocationId);
            col.AddWithValue("@SiteUrl", model.SiteUrl);
            col.AddWithValue("@EmployeesNumber", model.EmployeesNumber);
            col.AddWithValue("@UserId", userId);
        }
    }
}
