using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Requests.Organizations;
using Sabio.Models.Requests.OrgInvites;
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
    public class OrgInviteService : IOrgInviteService
    {
        IDataProvider _data = null;
        public OrgInviteService(IDataProvider data)
        {
            _data = data;
        }

        public int Add(OrgInviteAddRequest model, int userId, string token)
        {
            int id = 0;
            string procName = "[dbo].[OrgInvite_Insert]";
            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {

                    AddCommonParams(model, col, userId);
                    col.AddWithValue("@Token", token);

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

        public void Update(OrgInviteUpdateRequest model, int userId)
        {
            string procName = "[dbo].[OrgInvite_Update]";
            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);
                    col.AddWithValue("@Id", model.Id);
                    col.AddWithValue("@Token", model.Token);

                },
            returnParameters: null);
        }

        public OrgInvite GetInviteByToken(string token)
        {
            string procName = "dbo.OrgInvite_Select_ByToken";

            OrgInvite findInvite = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@Token", token);
            }
            , delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                findInvite = MapOrgInvite(reader, ref startingIndex);
            }
            );
            return findInvite;
        }

        public void DeleteInvite(string token)
        {
            string procName = "dbo.OrgInvite_Delete_ByToken";
            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Token", token);
                },
            returnParameters: null);
        }
        private static void AddCommonParams(OrgInviteAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@FirstName", model.Firstname);
            col.AddWithValue("@MiddleInitial", model.MiddleInitial);
            col.AddWithValue("@LastName", model.Lastname);
            col.AddWithValue("@Email", model.Email);
            col.AddWithValue("@ExpirationSeconds", model.ExpirationSeconds);
            col.AddWithValue("@InviteTypeId", model.InviteTypeId);
            col.AddWithValue("@OrgId", model.OrgId);
            col.AddWithValue("@UserId", userId);

        }

        private static OrgInvite MapOrgInvite(IDataReader reader, ref int startingIndex)
        {
            OrgInvite mapInvite = new OrgInvite();

            mapInvite.Id = reader.GetInt32(startingIndex++);
            mapInvite.Firstname = reader.GetSafeString(startingIndex++);
            mapInvite.MiddleInitial = reader.GetSafeString(startingIndex++);
            mapInvite.Lastname = reader.GetSafeString(startingIndex++);
            mapInvite.Email = reader.GetSafeString(startingIndex++);
            mapInvite.Token = reader.GetSafeGuid(startingIndex++);
            mapInvite.ExpirationSeconds = reader.GetInt32(startingIndex++);
            mapInvite.InviteTypeId = reader.GetInt32(startingIndex++);
            mapInvite.OrgId = reader.GetInt32(startingIndex++);
            mapInvite.CreateDate = reader.GetSafeDateTime(startingIndex++);
            mapInvite.ModifiedDate = reader.GetSafeDateTime(startingIndex++);
            mapInvite.ModifiedBy = reader.GetSafeString(startingIndex++);
            return mapInvite;
        }
    }
}
