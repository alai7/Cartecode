public async void Invite(OrgInviteAddRequest inviteModel, string token, OrganizationV1 orgModel)
        {
            string path =
                $"{_hostEnvironment.WebRootPath}/EmailTemplates/OrgInvite.html";
            string tokenLink =
                $"{_appKeys.DomainName}users/invite?token={token}";
            string organization = orgModel.Name;
            string role = "";
            if (inviteModel.InviteTypeId == 1)
            {
                role = "OrgAdmin";
            }
            else if (inviteModel.InviteTypeId == 2)
            {
                role = "MenuEditor";
            }
            else if (inviteModel.InviteTypeId == 3)
            {
                role = "Employee";
            };

            var from = new EmailAddress(_appKeys.DomainEmail, "Carte");
            var to = new EmailAddress(inviteModel.Email);
            var subject = "Please confirm your token";
            string plainTextContent = "Please confirm your token";
            var htmlContent =
                File
                    .ReadAllText(path)
                    .Replace("{{tokenLink}}", tokenLink)
                    .Replace("{{organization}}", organization)
                    .Replace("{{role}}", role);

            SendGridMessage msg =
                MailHelper
                    .CreateSingleEmail(from,
                    to,
                    subject,
                    plainTextContent,
                    htmlContent);
            await SendEmail(msg);
        }
