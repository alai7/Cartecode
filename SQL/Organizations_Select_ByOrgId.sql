USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Organization_Select_ById]    Script Date: 10/14/2022 2:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Anthony Lai>
-- Create date: <08/24/2022>
-- Description:	<Select Proc for specific record from Organizations table and accompanying information>
-- Code Reviewer:Michael Kiley


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note: 
-- =============================================

ALTER PROC [dbo].[Organization_Select_ById]
					@Id int

AS
/*
DECLARE @Id int = 27;

EXECUTE dbo.Organization_Select_ById @Id

SELECT *
FROM	dbo.Organizations


*/
BEGIN

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

			  WHERE o.Id = @Id


END
