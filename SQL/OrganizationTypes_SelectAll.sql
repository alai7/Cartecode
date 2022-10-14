USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[OrganizationTypes_SelectAll]    Script Date: 10/14/2022 2:08:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Anthony Lai>
-- Create date: <08/24/2022>
-- Description:	<SELECT ALL Proc (NO PAGINATION) for Selecting records from OrganizationTypes table>
-- Code Reviewer: Michael Kiley


-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note:
-- =============================================

ALTER PROC [dbo].[OrganizationTypes_SelectAll]


AS
/*

		EXECUTE dbo.OrganizationTypes_SelectAll

*/


BEGIN

			SELECT	[Id]
					,[Name]

			FROM [dbo].[OrganizationTypes]

END


