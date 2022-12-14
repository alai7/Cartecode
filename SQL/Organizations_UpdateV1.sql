USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_Update]    Script Date: 10/14/2022 2:07:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Anthony Lai>
-- Create date: <08/24/2022>
-- Description:	<Proc for updating a record in the Organizations table>
-- Code Reviewer: Michael Kiley


-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note: 
-- =============================================
ALTER proc [dbo].[Organizations_Update]
						@CuisineId int
						,@OrganizationTypeId int
						,@Name nvarchar(200)
						,@Description nvarchar(200)
						,@Logo nvarchar(255)
						,@BusinessPhone nvarchar(20)
						,@PrimaryLocationId int
						,@SiteUrl nvarchar(255)
						,@EmployeesNumber int
						,@UserId int
						,@Id int
AS
/*
			DECLARE		@Id int = 26
						,@CuisineId int = 6
						,@OrganizationTypeId int = 4
						,@Name nvarchar(200) = 'Freeze-Dried Everything'
						,@Description nvarchar(200) = 'nitro-infused fruit'
						,@Logo nvarchar(255) = 'Mr. Freezy'
						,@BusinessPhone nvarchar(20) = '420-420-9696'
						,@PrimaryLocationId int = 1
						,@SiteUrl nvarchar(255) = 'www.freezy.com'
						,@EmployeesNumber int = 2
						,@UserId int = 1
			
			SELECT *
			FROM [dbo].[Organizations]
			WHERE Id = @Id

			EXECUTE [dbo].[Organizations_Update]
						@CuisineId
						,@OrganizationTypeId
						,@Name 
						,@Description
						,@Logo
						,@BusinessPhone
						,@PrimaryLocationId
						,@SiteUrl
						,@EmployeesNumber
						,@UserId
						,@Id

			SELECT *
			FROM [dbo].[Organizations]
			WHERE Id = @Id

*/
BEGIN

			DECLARE    @DateModified datetime2(7) = getutcdate()

			UPDATE     [dbo].[Organizations]
			    SET    [OrganizationTypeId] = @OrganizationTypeId
					  ,[Name] = @Name
					  ,[Description] = @Description
					  ,[Logo] = @Logo
					  ,[BusinessPhone] = @BusinessPhone
					  ,[PrimaryLocationId] = @PrimaryLocationId
					  ,[SiteUrl] = @SiteUrl
					  ,[EmployeesNumber] = @EmployeesNumber
					  ,[DateModified] = @DateModified
					  ,[ModifiedBy] = @UserId

			  WHERE		Id = @Id

		DELETE FROM		dbo.OrgCuisines
		WHERE			@Id = [OrganizationId]

		INSERT INTO		dbo.OrgCuisines
						([OrganizationId]
						,[CuisineId])

			VALUES
						(@Id
						,@CuisineId)

END
