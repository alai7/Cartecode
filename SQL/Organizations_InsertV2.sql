USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_InsertV2]    Script Date: 10/14/2022 2:05:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Anthony Lai>
-- Create date: <08/24/2022>
-- Description:	<Proc for inserting record into the Organizations table AND Locations table>
-- Code Reviewer: Michael Kiley


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note:
-- =============================================

ALTER proc [dbo].[Organizations_InsertV2]
			@LocationTypeId int 
			,@LineOne nvarchar(255)
			,@LineTwo nvarchar(255)
			,@City nvarchar(255)
			,@Zip nvarchar(50)
			,@StateId int
			,@Latitude float
			,@Longitude float
			,@CuisineId int
			,@OrganizationTypeId int
			,@Name nvarchar(200)
			,@Description nvarchar(200)
			,@Logo nvarchar(255)
			,@BusinessPhone nvarchar(20)
			,@SiteUrl nvarchar(255)
			,@EmployeesNumber int
			,@UserId int
			,@Id int OUTPUT

AS
/* -----TEST------

			DECLARE @PrimaryLocationId int = 6
			DECLARE @Id int = 0;

			DECLARE @LocationTypeId int = 1
					,@LineOne nvarchar(255) = '732 Energy Dr'
					,@LineTwo nvarchar(255) = 'Suite C'
					,@City nvarchar(255) = 'Reign'
					,@Zip nvarchar(50) = '90210'
					,@StateId int = 12
					,@Latitude float = 25.25
					,@Longitude float = 4.5
					,@CuisineId int = '2'
					,@OrganizationTypeId int = '2'
					,@Name nvarchar(200) = 'ENERGY DRINKS'
					,@Description nvarchar(200) = 'energy galore'
					,@Logo nvarchar(255) = 'Monster Man'
					,@BusinessPhone nvarchar(20) = '412-323-4324'
					,@SiteUrl nvarchar(255) = 'www.baxter.com'
					,@EmployeesNumber int = 2
					,@UserId int = 1
			

			EXECUTE [dbo].[Organizations_InsertV2]
					@LocationTypeId
					,@LineOne
					,@LineTwo 
					,@City
					,@Zip
					,@StateId 
					,@Latitude 
					,@Longitude 
					,@CuisineId
					,@OrganizationTypeId
					,@Name
					,@Description
					,@Logo
					,@BusinessPhone
					,@SiteUrl
					,@EmployeesNumber
					,@UserId
					,@Id OUTPUT

			SELECT *
			FROM dbo.Organizations
			Where Id = @Id

			SELECT *
			FROM dbo.Locations


*/
BEGIN
	
			DECLARE @PrimaryLocationId int =0;

			INSERT INTO [dbo].[Locations]
					   ([LocationTypeId]
					   ,[LineOne]
					   ,[LineTwo]
					   ,[City]
					   ,[Zip]
					   ,[StateId]
					   ,[Latitude]
					   ,[Longitude]
					   ,[CreatedBy])

				 VALUES
					   (@LocationTypeId
						,@LineOne
						,@LineTwo 
						,@City
						,@Zip
						,@StateId 
						,@Latitude 
						,@Longitude 
						,@UserId)

				SET @PrimaryLocationId = SCOPE_IDENTITY()

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


