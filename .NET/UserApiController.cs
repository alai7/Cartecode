[HttpPost("orgs")]
        public ActionResult<SuccessResponse> Add(int userId, int orgId)
        {
            ObjectResult result = null;
            try
            {
                _service.AddUserOrgs(userId, orgId);
                ItemResponse<int> response = new ItemResponse<int>();
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.ToString());
                result = StatusCode(500, response);
            }

            return result;
        }
        
        [HttpGet("invite/{token}")]
        public ActionResult<SuccessResponse> Invite(string token)
        {
            int code = 200;

            BaseResponse response = null;
            try
            {
                //select by token
                _orgInviteService.GetInviteByToken(token);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        
