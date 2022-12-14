USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_UpdateV2]    Script Date: 10/14/2022 2:07:54 PM ******/
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
ALTER proc [dbo].[Organizations_UpdateV2]
						@Id int
						,@LocationTypeId int 
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
						,@PrimaryLocationId int
						,@SiteUrl nvarchar(255)
						,@EmployeesNumber int
						,@UserId int
						
AS
/*
			DECLARE		@Id int = 1
						,@LocationTypeId int = '3'
						,@LineOne nvarchar(255) = 'Changing for update'
						,@LineTwo nvarchar(255) = 'Office #2b'
						,@City nvarchar(255) = 'Fayetteville'
						,@Zip nvarchar(50) = '28310'
						,@StateId int = 12
						,@Latitude float = 1.2
						,@Longitude float = 300.1
						,@CuisineId int = 2
						,@OrganizationTypeId int = 5
						,@Name nvarchar(200) = 'Allens Street Tacos'
						,@Description nvarchar(200) = 'Everything has salsa roja'
						,@Logo nvarchar(255) = 'Birria man'
						,@BusinessPhone nvarchar(20) = '420-420-9696'
						,@PrimaryLocationId int = 6
						,@SiteUrl nvarchar(255) = 'www.allenstaco.com'
						,@EmployeesNumber int = 2
						,@UserId int = 1
						

			
			EXECUTE [dbo].[Organizations_UpdateV2]
						@Id
						,@LocationTypeId
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
						,@PrimaryLocationId
						,@SiteUrl
						,@EmployeesNumber
						,@UserId
	
			SELECT *
			FROM [dbo].[Organizations]
			WHERE Id = @Id

			SELECT *
			FROM dbo.Locations
			WHERE Id = @PrimaryLocationId

*/
BEGIN

			DECLARE @DateModified datetime2 = getutcdate()

			  UPDATE [dbo].[Locations]
				SET		[LocationTypeId] = @LocationTypeId
					   ,[LineOne] = @LineOne
					   ,[LineTwo] = @LineTwo
					   ,[City] = @City
					   ,[Zip] = @Zip
					   ,[StateId] = @StateId
					   ,[Latitude] = @Latitude
					   ,[Longitude] = @Longitude
					   ,[DateModified] = @DateModified
					   ,[ModifiedBy] = @UserId		
					   
			WHERE Id = @PrimaryLocationId

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
