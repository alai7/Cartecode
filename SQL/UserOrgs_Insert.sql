USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[UserOrgs_Insert]    Script Date: 10/14/2022 2:09:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Anthony Lai>
-- Create date: <09/14/2022>
-- Description:	<Stored procedure to Insert a User associated with an Organization>
-- Code Reviewer:


-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note: 
-- =============================================
ALTER proc [dbo].[UserOrgs_Insert]
						@UserId int
						,@OrgId int

as
/*

	DECLARE @UserId int = 169,
			@OrgId int = 56


	EXECUTE dbo.UserOrgs_Insert
					@UserId
					,@OrgId

	SELECT *
	FROM dbo.UserOrgs

	SELECT *
	FROM dbo.Organizations


*/
BEGIN

			INSERT INTO [dbo].[UserOrgs]
					   ([UserId]
					   ,[OrganizationId])
				 VALUES
					   (@UserId
					   ,@OrgId)

 END


