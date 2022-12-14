USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Organization_Search]    Script Date: 10/14/2022 2:05:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Anthony Lai>
-- Create date: <08/25/2022>
-- Description:	<Search Proc for specific record from Organizations table and accompanying tables on name, description and site.>
-- Code Reviewer: Michael Kiley


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

ALTER PROC [dbo].[Organization_Search]
					@PageIndex int 
					,@PageSize int
					,@Query nvarchar(225)

AS
/*
		DECLARE @PageIndex int = 0
				,@PageSize int = 10
DECLARE @Query nvarchar(225) = 'Food'

EXECUTE [dbo].[Organization_Search]
						@PageIndex
						,@PageSize
						,@Query


*/
BEGIN
			
			DECLARE @offset int = @PageIndex * @PageSize

			SELECT  	o.[Id]
					  ,o.[Name] as Company 
					  ,ot.[Id] as OrganizationTypeId
					  ,ot.[Name] as OrganizationType
					  ,o.[Description]
					  ,c.[Id] as CuisineId
					  ,c.[Name] as CuisineType
					  ,o.[Logo]
					  ,o.[BusinessPhone]
					  ,o.[SiteUrl]
					  ,o.[EmployeesNumber]
					  ,l.[Id]
					  ,l.LineOne as Street
					  ,l.LineTwo
					  ,l.city as City
					  ,l.Zip as Zipcode
					  ,lt.[Id] as LocationTypeId
					  ,lt.[Name] as LocationType
					  ,s.[Id]
					  ,s.Code
					  ,s.[Name] as [State]
					  ,l.Latitude
					  ,l.Longitude
					  ,o.[DateCreated]
					  ,o.[DateModified]
					  ,o.[CreatedBy]
					  ,o.[ModifiedBy]
					  , TotalCount = Count(1) Over()

			  FROM dbo.Organizations as o inner join dbo.OrgCuisines as oc
			  on	o.Id = oc.OrganizationId inner join dbo.Cuisines as c
			  on	c.Id = oc.CuisineId inner join	dbo.[OrganizationTypes] as ot
			  on	o.OrganizationTypeId = ot.Id inner join dbo.Locations as l
			  on	o.PrimaryLocationId = l.Id inner join dbo.LocationTypes as lt
			  on	l.LocationTypeId = lt.Id inner join dbo.States as s
			  on	l.StateId = s.Id

			  WHERE		(o.[Name] LIKE '%' + @Query + '%' OR
						 o.[Description] LIKE '%' + @Query + '%' OR
						 o.[SiteUrl] LIKE '%' + @Query + '%')
			ORDER BY o.Id
			
			OFFSET @offSet Rows
			Fetch Next @PageSize Rows ONLY

END
