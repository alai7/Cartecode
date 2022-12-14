USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[UserOrg_SelectOrg_ByUserId]    Script Date: 10/14/2022 2:09:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Anthony Lai>
-- Create date: <09/14/2022>
-- Description:	<Stored procedure to Select an OrgInvite using the currentUserId>
-- Code Reviewer:


-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note: 
-- =============================================
ALTER proc [dbo].[UserOrg_SelectOrg_ByUserId]
								@UserId int


AS
/*

DECLARE @UserId int = 3;

EXECUTE dbo.UserOrg_SelectOrg_ByUserId
								@UserId
Select * 
FROM dbo.Organizations
Select * 
FROM dbo.UserOrgs
Select * 
FROM dbo.Users
*/
BEGIN

				SELECT	o.[Id]
						,o.OrganizationTypeId
						,o.[Name]
						,o.[Description]
						,o.[Logo]
						,o.[BusinessPhone]
						,o.[PrimaryLocationId]
						,o.[SiteUrl]
						,o.[EmployeesNumber]
						,o.[DateCreated]
						,o.[DateModified]
						,o.[CreatedBy]
						,o.[ModifiedBy]


				FROM dbo.Organizations as o join dbo.UserOrgs as uo
				on o.[Id] = uo.OrganizationId join dbo.Users as u
				on uo.[UserId] = u.Id

				WHERE u.Id = @UserId

END