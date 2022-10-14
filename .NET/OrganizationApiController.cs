using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Organizations;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/organizations")]
    [ApiController]
    public class OrganizationApiController : BaseApiController
    {
        private IOrganizationService _service = null;
        private IAuthenticationService<int> _authService = null;
        private ILookUpService _lookup = null;
        private IUserService _userService = null;
        public OrganizationApiController(IOrganizationService service, ILookUpService lookup,
            ILogger<OrganizationApiController> logger, IUserService userService
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
            _lookup = lookup;
            _userService = userService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<OrganizationAddRequest>> Create(OrganizationAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int orgId = _service.Add(model, userId);
                _userService.AddUserOrgs(userId, orgId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = orgId };

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
        public ActionResult<SuccessResponse> Update(OrganizationUpdateRequest model)
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

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteOrg(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Organization>>> Pagination(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<Organization> paged = _service.OrgPagination(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records not found."));
                }

                else
                {
                    ItemResponse<Paged<Organization>> response = new ItemResponse<Paged<Organization>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;

        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Organization>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Organization newOrg = _service.GetOrgById(id);

                if (newOrg == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Organization not found.");
                }
                else
                {
                    response = new ItemResponse<Organization> { Item = newOrg };
                }
            }

            catch (Exception ex)
            {
                iCode = 500;
                // base implementation of the catch to grab everything that isn't covered
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: ${ex.Message}");

            }

            return StatusCode(iCode, response);

        }


        [HttpGet("user/{id:int}")]
        public ActionResult<ItemResponse<OrganizationV1>> GetOrgByUser()
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                OrganizationV1 newOrg = _service.GetOrgByUserId(userId);

                if (newOrg == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Organization not found.");
                }
                else
                {
                    response = new ItemResponse<OrganizationV1> { Item = newOrg };
                }
            }

            catch (Exception ex)
            {
                iCode = 500;
                // base implementation of the catch to grab everything that isn't covered
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: ${ex.Message}");

            }

            return StatusCode(iCode, response);

        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Organization>>> SearchV3(int pageIndex, int pageSize, string query)
        {
            ActionResult result = null;
            try
            {
                Paged<Organization> paged = _service.SearchOrgByQuery(pageIndex, pageSize, query);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records not found."));
                }

                else
                {
                    ItemResponse<Paged<Organization>> response = new ItemResponse<Paged<Organization>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;

        }


    }
}
