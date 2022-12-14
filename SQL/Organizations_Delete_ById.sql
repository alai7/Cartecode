USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Organization_Delete_ById]    Script Date: 10/14/2022 2:05:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Anthony Lai>
-- Create date: <08/24/2022>
-- Description:	<Delete Proc for deleting record from Organizations table>
-- Code Reviewer: Michael Kiley


-- MODIFIED BY:
-- MODIFIED DATE:	
-- Code Reviewer:
-- Note: 
-- =============================================


ALTER PROC [dbo].[Organization_Delete_ById]
						@Id int

AS
/*

			DECLARE @Id int = 70

			SELECT *
			FROM dbo.Organizations
			WHERE Id = @Id

			SELECT *
			FROM dbo.OrgCuisines
			WHERE OrganizationId = @Id

			EXECUTE dbo.Organization_Delete_ById @Id

			SELECT *
			FROM dbo.Organizations
			WHERE Id = @Id

			SELECT *
			FROM dbo.OrgCuisines
			WHERE OrganizationId = @Id


*/
BEGIN
						
			DELETE FROM dbo.MenuItems
			WHERE OrganizationId = @Id

			DELETE FROM dbo.MenuItemTags
			WHERE MenuItemId = @Id


			DELETE FROM dbo.OrgCuisines
			WHERE OrganizationId = @Id

			DELETE FROM dbo.UserOrgs
			WHERE OrganizationId = @Id

			DELETE FROM [dbo].[Organizations]
				  WHERE Id = @Id;

END
