using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Requests.OrgInvites;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Api.Controllers;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/organizations/invite")]
    [ApiController]
    public class OrgInviteApiController : BaseApiController
    {
        private IEmailService _emailService = null;
        private IOrganizationService _organizationService = null;
        private IOrgInviteService _service = null;
        private IAuthenticationService<int> _authService = null;
        public OrgInviteApiController(IOrgInviteService service,
            ILogger<OrganizationApiController> logger, IEmailService emailService, IOrganizationService orgService
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
            _emailService = emailService;
            _organizationService = orgService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<OrgInviteAddRequest>> Invite(OrgInviteAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                string token = Guid.NewGuid().ToString();
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model, userId, token);
                OrganizationV1 orgModel = _organizationService.GetOrgByUserId(userId);
                _emailService.Invite(model, token, orgModel);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);

            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);

            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(OrgInviteUpdateRequest model)
        {

            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);

        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<OrgInvite>> SelectByToken(string token)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                OrgInvite newInvite = _service.GetInviteByToken(token);

                if (newInvite == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Invitation not found.");
                }
                else
                {
                    response = new ItemResponse<OrgInvite> { Item = newInvite };
                }
            }

            catch (Exception ex)
            {
                iCode = 500;

                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: ${ex.Message}");

            }
            return StatusCode(iCode, response);
        }

        [HttpDelete]
        public ActionResult<SuccessResponse> Delete(string token)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteInvite(token);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

    }
}
