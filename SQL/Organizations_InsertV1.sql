USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_Insert]    Script Date: 10/14/2022 2:05:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Anthony Lai>
-- Create date: <08/24/2022>
-- Description:	<Proc for inserting record into the Organizations table>
-- Code Reviewer: Michael Kiley


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note:
-- =============================================

ALTER proc [dbo].[Organizations_Insert]
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
			,@Id int OUTPUT

AS
/* -----TEST------

			DECLARE @Id int = 0;

			DECLARE @CuisineId int = '3'
					,@OrganizationTypeId int = '3'
					,@Name nvarchar(200) = 'Baxters Food Truck'
					,@Description nvarchar(200) = 'Cucumbers galore'
					,@Logo nvarchar(255) = 'Cucumber Man'
					,@BusinessPhone nvarchar(20) = '412-323-4324'
					,@PrimaryLocationId int = 12
					,@SiteUrl nvarchar(255) = 'www.baxter.com'
					,@EmployeesNumber int = 2
					,@UserId int = 1
			

			EXECUTE [dbo].[Organizations_Insert]
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
					,@Id OUTPUT

			SELECT *
			FROM dbo.Organizations
			Where Id = @Id

*/
BEGIN

			INSERT INTO [dbo].[Organizations]
					   ([OrganizationTypeId]
					   ,[Name]
					   ,[Description]
					   ,[Logo]
					   ,[BusinessPhone]
					   ,[PrimaryLocationId]
					   ,[SiteUrl]
					   ,[EmployeesNumber]
					   ,[CreatedBy])
           
				 VALUES
					   (@OrganizationTypeId
					   ,@Name
					   ,@Description
					   ,@Logo
					   ,@BusinessPhone
					   ,@PrimaryLocationId
					   ,@SiteUrl
					   ,@EmployeesNumber
					   ,@UserId)

				SET @Id = SCOPE_IDENTITY()

			INSERT INTO dbo.OrgCuisines
						([OrganizationId]
						,[CuisineId])

				VALUES
						(@Id
						,@CuisineId)

END


